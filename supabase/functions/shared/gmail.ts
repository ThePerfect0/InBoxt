/// <reference path="../deno-env.d.ts" />

interface GmailMessage {
  id: string;
  sender: string;
  subject: string;
  snippet: string;
  text: string;
  timestamp: string;
}

export async function fetchGmailEmails(accessToken: string, maxResults = 50): Promise<GmailMessage[]> {
  try {
    console.log('Fetching Gmail messages...');
    
    // Get message list from last 24 hours
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const query = `newer_than:1d -in:spam -in:trash`;
    
    const listResponse = await fetch(
      `https://gmail.googleapis.com/gmail/v1/users/me/messages?q=${encodeURIComponent(query)}&maxResults=${maxResults}`,
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!listResponse.ok) {
      throw new Error(`Gmail API list error: ${listResponse.status} ${await listResponse.text()}`);
    }

    const listData = await listResponse.json();
    const messages = listData.messages || [];
    
    console.log(`Found ${messages.length} Gmail messages`);
    
    if (messages.length === 0) {
      return [];
    }

    // Fetch details for each message
    const emailPromises = messages.map(async (msg: { id: string }) => {
      try {
        const detailResponse = await fetch(
          `https://gmail.googleapis.com/gmail/v1/users/me/messages/${msg.id}?format=full`,
          {
            headers: {
              'Authorization': `Bearer ${accessToken}`,
              'Content-Type': 'application/json',
            },
          }
        );

        if (!detailResponse.ok) {
          console.error(`Failed to fetch message ${msg.id}: ${detailResponse.status}`);
          return null;
        }

        const messageData = await detailResponse.json();
        return parseGmailMessage(messageData);
      } catch (error) {
        console.error(`Error fetching message ${msg.id}:`, error);
        return null;
      }
    });

    const emails = await Promise.all(emailPromises);
    const validEmails = emails.filter(email => email !== null) as GmailMessage[];
    
    console.log(`Successfully parsed ${validEmails.length} Gmail messages`);
    return validEmails;

  } catch (error) {
    console.error('Gmail fetch error:', error);
    throw error;
  }
}

function parseGmailMessage(messageData: any): GmailMessage | null {
  try {
    const headers = messageData.payload?.headers || [];
    const sender = headers.find((h: any) => h.name === 'From')?.value || 'Unknown';
    const subject = headers.find((h: any) => h.name === 'Subject')?.value || 'No Subject';
    const date = headers.find((h: any) => h.name === 'Date')?.value;
    
    // Parse timestamp
    let timestamp = new Date().toISOString();
    if (date) {
      try {
        timestamp = new Date(date).toISOString();
      } catch (e) {
        console.warn('Failed to parse date:', date);
      }
    }

    // Extract text content
    const textContent = extractTextFromPayload(messageData.payload);
    
    return {
      id: messageData.id,
      sender: cleanEmailAddress(sender),
      subject: subject.trim(),
      snippet: messageData.snippet || textContent.slice(0, 200),
      text: textContent,
      timestamp
    };
  } catch (error) {
    console.error('Error parsing Gmail message:', error);
    return null;
  }
}

function extractTextFromPayload(payload: any): string {
  let text = '';
  
  if (payload.body?.data) {
    // Single part message
    text = decodeBase64Url(payload.body.data);
  } else if (payload.parts) {
    // Multi-part message
    for (const part of payload.parts) {
      if (part.mimeType === 'text/plain' && part.body?.data) {
        text += decodeBase64Url(part.body.data);
      } else if (part.parts) {
        // Nested parts
        text += extractTextFromPayload(part);
      }
    }
  }
  
  // Clean up the text
  return text
    .replace(/=\r?\n/g, '') // Remove soft line breaks
    .replace(/\r?\n/g, ' ') // Replace line breaks with spaces
    .replace(/\s+/g, ' ')   // Collapse multiple spaces
    .trim()
    .slice(0, 5000); // Limit length for AI processing
}

function decodeBase64Url(data: string): string {
  try {
    // Convert base64url to base64
    const base64 = data.replace(/-/g, '+').replace(/_/g, '/');
    // Pad if necessary
    const padded = base64 + '=='.slice(0, (4 - base64.length % 4) % 4);
    // Decode
    return atob(padded);
  } catch (error) {
    console.error('Base64 decode error:', error);
    return '';
  }
}

function cleanEmailAddress(email: string): string {
  // Extract email from "Name <email@domain.com>" format
  const match = email.match(/<([^>]+)>/);
  if (match) {
    return match[1];
  }
  return email.trim();
}

export async function refreshGmailToken(refreshToken: string): Promise<string | null> {
  try {
    const response = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
        client_id: Deno.env.get('GOOGLE_CLIENT_ID') || '',
        client_secret: Deno.env.get('GOOGLE_CLIENT_SECRET') || '',
      }),
    });

    if (!response.ok) {
      console.error('Token refresh failed:', await response.text());
      return null;
    }

    const data = await response.json();
    return data.access_token;
  } catch (error) {
    console.error('Token refresh error:', error);
    return null;
  }
}