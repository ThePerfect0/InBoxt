// Deno global is available at runtime; this declaration silences IDE TypeScript lint in the monorepo.
declare const Deno: any;

interface OpenRouterConfig {
  model: string;
  system: string;
  prompt: string;
  input?: any;
  response_format?: 'json';
}

interface OpenRouterResponse {
  success: boolean;
  data?: any;
  error?: string;
  retryCount?: number;
}

export async function callLLM(config: OpenRouterConfig): Promise<OpenRouterResponse> {
  const apiKey = Deno.env.get('OPENROUTER_API_KEY');
  
  if (!apiKey) {
    console.error('OPENROUTER_API_KEY not found in environment');
    return { success: false, error: 'OpenRouter API key not configured' };
  }

  const { model, system, prompt, input, response_format } = config;
  
  // Build the user message
  let userMessage = prompt;
  if (input) {
    userMessage += `\n\nInput: ${typeof input === 'string' ? input : JSON.stringify(input)}`;
  }

  const payload = {
    model: model || 'openai/gpt-4o-mini',
    messages: [
      { role: 'system', content: system },
      { role: 'user', content: userMessage }
    ],
    temperature: 0.1,
    max_tokens: 2000,
  };

  let retryCount = 0;
  const maxRetries = 1;

  while (retryCount <= maxRetries) {
    try {
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'https://ivasmxvigcojbefxbzfk.supabase.co',
          'X-Title': 'InBoxt Email Digest'
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`OpenRouter API error (${response.status}):`, errorText);
        
        if (response.status === 429 && retryCount < maxRetries) {
          const delay = Math.pow(2, retryCount) * 1000; // Exponential backoff
          console.log(`Rate limited, retrying in ${delay}ms`);
          await new Promise(resolve => setTimeout(resolve, delay));
          retryCount++;
          continue;
        }
        
        return { 
          success: false, 
          error: `OpenRouter API error: ${response.status} ${errorText}`,
          retryCount 
        };
      }

      const result = await response.json();
      
      if (!result.choices || !result.choices[0] || !result.choices[0].message) {
        return { 
          success: false, 
          error: 'Invalid response format from OpenRouter',
          retryCount 
        };
      }

      const content = result.choices[0].message.content;

      // If JSON response is expected, parse and validate
      if (response_format === 'json') {
        try {
          const parsed = JSON.parse(content);
          return { success: true, data: parsed, retryCount };
        } catch (parseError) {
          console.error('JSON parsing failed:', parseError, 'Content:', content);
          
          if (retryCount < maxRetries) {
            console.log('Retrying due to invalid JSON...');
            retryCount++;
            continue;
          }
          
          return { 
            success: false, 
            error: `Invalid JSON response: ${parseError.message}`,
            retryCount 
          };
        }
      }

      return { success: true, data: content, retryCount };

    } catch (error) {
      console.error('OpenRouter call failed:', error);
      
      if (retryCount < maxRetries) {
        const delay = Math.pow(2, retryCount) * 1000;
        console.log(`Request failed, retrying in ${delay}ms`);
        await new Promise(resolve => setTimeout(resolve, delay));
        retryCount++;
        continue;
      }
      
      return { 
        success: false, 
        error: `Network error: ${error.message}`,
        retryCount 
      };
    }
  }

  return { 
    success: false, 
    error: 'Max retries exceeded',
    retryCount 
  };
}

// AI Processing Functions with strict JSON contracts

export async function extractGist(emailText: string): Promise<{ gist: string } | null> {
  const result = await callLLM({
    model: 'openai/gpt-4o-mini',
    system: 'You are an expert email summarizer. Create a concise, actionable summary that captures the main purpose and key information of the email. The summary should be 1-2 sentences maximum and help the user understand what the email is about at a glance. Focus on: what the sender wants, any actions needed, important dates/deadlines, or key decisions. Avoid copying the email opening verbatim. Output strictly a JSON object: { "gist": string }. Do not include sensitive data like passwords, OTPs, or account numbers.',
    prompt: 'Read the entire email and create a meaningful summary that explains what this email is about. Do NOT just copy the first sentence. Return ONLY JSON: { "gist": string }',
    input: emailText.slice(0, 3000), // Increased context
    response_format: 'json'
  });

  if (!result.success || !result.data?.gist) {
    console.error('Gist extraction failed:', result.error);
    return null;
  }

  return { gist: result.data.gist };
}

export async function calculateImportance(emailText: string, sender: string, subject: string): Promise<{ importance: number } | null> {
  const result = await callLLM({
    model: 'openai/gpt-4o-mini',
    system: 'You are an expert at analyzing email importance. Output strictly JSON with this exact schema: { "importance": number }. Score from 0 to 1 using: sender authority, urgency, explicit deadlines, actionable requests, meeting invites, follow-ups. 0=newsletters/spam, 0.3=general info, 0.5=normal business, 0.7=important, 1.0=urgent/critical. Only return the JSON object, no extra text.',
    prompt: 'Analyze the email and return ONLY JSON { "importance": number } with a value between 0 and 1.',
    input: JSON.stringify({ sender, subject, content: emailText.slice(0, 1500) }),
    response_format: 'json'
  });

  if (!result.success || typeof result.data?.importance !== 'number') {
    console.error('Importance calculation failed:', result.error);
    return null;
  }

  const importance = Math.max(0, Math.min(1, result.data.importance));
  return { importance };
}

export async function extractDeadline(emailText: string, subject: string): Promise<{ deadline: string | null } | null> {
  const result = await callLLM({
    model: 'openai/gpt-4o-mini',
    system: 'You are an expert at extracting dates from emails. Output strictly JSON with this exact schema: { "deadline": string | null }. Only include a date if explicitly present or strongly implied with a specific date; otherwise return null. When present, format date as YYYY-MM-DD. Return ONLY the JSON object, no extra text.',
    prompt: 'Extract a deadline / due date / meeting date if present, otherwise null. Return ONLY JSON { "deadline": string | null } with format YYYY-MM-DD when present.',
    input: JSON.stringify({ subject, content: emailText.slice(0, 1500) }),
    response_format: 'json'
  });

  if (!result.success) {
    console.error('Deadline extraction failed:', result.error);
    return null;
  }

  // Validate ISO date format if deadline is provided
  if (result.data?.deadline) {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(result.data.deadline)) {
      console.warn('Invalid date format from AI:', result.data.deadline);
      return { deadline: null };
    }
  }

  return { deadline: result.data?.deadline || null };
}

export async function performSemanticSearch(query: string, items: any[]): Promise<{ id: string; score: number; reason: string }[]> {
  const result = await callLLM({
    model: 'openai/gpt-4o-mini',
    system: 'You are an expert at semantic search. Rank the provided items by relevance to the query. Return an array of objects with {id, score, reason} where score is 0-1 and reason explains the relevance. Only include items with score > 0.3.',
    prompt: `Rank these items by relevance to the query: "${query}"`,
    input: { query, items: items.slice(0, 50) }, // Limit for performance
    response_format: 'json'
  });

  if (!result.success || !Array.isArray(result.data)) {
    console.error('Semantic search failed:', result.error);
    return [];
  }

  // Validate and filter results
  return result.data
    .filter(item => item.id && typeof item.score === 'number' && item.score > 0.3)
    .sort((a, b) => b.score - a.score)
    .slice(0, 20); // Limit results
}