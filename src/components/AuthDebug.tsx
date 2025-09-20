import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export function AuthDebug() {
  const { user, session, loading } = useAuth();
  const [debugInfo, setDebugInfo] = useState<any>({});
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const checkAuthState = async () => {
      try {
        // Check current session
        const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
        
        // Check user data
        const { data: userData, error: userError } = await supabase.auth.getUser();
        
        // Check localStorage
        const localStorageKeys = Object.keys(localStorage).filter(key => 
          key.includes('supabase') || key.includes('auth')
        );
        
        const localStorageData: any = {};
        localStorageKeys.forEach(key => {
          try {
            localStorageData[key] = JSON.parse(localStorage.getItem(key) || '');
          } catch {
            localStorageData[key] = localStorage.getItem(key);
          }
        });

        // Check if user profile exists
        let profileExists = false;
        let userRecord = null;
        if (user?.id) {
          const { data: profile } = await supabase
            .from('user_profiles')
            .select('*')
            .eq('user_id', user.id)
            .maybeSingle();
          
          const { data: userRec } = await supabase
            .from('users')
            .select('*')
            .eq('id', user.id)
            .maybeSingle();
          
          profileExists = !!profile;
          userRecord = userRec;
        }

        setDebugInfo({
          hookState: {
            user: user ? { id: user.id, email: user.email, created_at: user.created_at } : null,
            session: session ? { 
              access_token: session.access_token ? 'present' : 'missing',
              refresh_token: session.refresh_token ? 'present' : 'missing',
              expires_at: session.expires_at,
              user_id: session.user?.id
            } : null,
            loading
          },
          supabaseSession: {
            data: sessionData.session ? {
              access_token: sessionData.session.access_token ? 'present' : 'missing',
              refresh_token: sessionData.session.refresh_token ? 'present' : 'missing',
              expires_at: sessionData.session.expires_at,
              user_id: sessionData.session.user?.id
            } : null,
            error: sessionError?.message
          },
          supabaseUser: {
            data: userData.user ? { 
              id: userData.user.id, 
              email: userData.user.email,
              created_at: userData.user.created_at,
              confirmed_at: userData.user.confirmed_at
            } : null,
            error: userError?.message
          },
          localStorage: localStorageData,
          database: {
            profileExists,
            userRecord
          }
        });
      } catch (error) {
        console.error('Error checking auth state:', error);
        setDebugInfo({ error: error.message });
      }
    };

    if (isVisible) {
      checkAuthState();
    }
  }, [user, session, loading, isVisible]);

  // Only show in development or when explicitly enabled
  if (process.env.NODE_ENV === 'production' && !localStorage.getItem('debug_auth')) {
    return null;
  }

  if (!isVisible) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Button 
          onClick={() => setIsVisible(true)}
          variant="outline"
          size="sm"
        >
          Debug Auth
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed inset-4 z-50 bg-black/50 flex items-center justify-center">
      <Card className="w-full max-w-4xl max-h-[80vh] overflow-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Authentication Debug Info</CardTitle>
            <Button 
              onClick={() => setIsVisible(false)}
              variant="outline"
              size="sm"
            >
              Close
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Hook State */}
            <div>
              <h3 className="font-semibold mb-2">useAuth Hook State</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span>User:</span>
                  <Badge variant={debugInfo.hookState?.user ? 'default' : 'destructive'}>
                    {debugInfo.hookState?.user ? 'Present' : 'Null'}
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <span>Session:</span>
                  <Badge variant={debugInfo.hookState?.session ? 'default' : 'destructive'}>
                    {debugInfo.hookState?.session ? 'Present' : 'Null'}
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <span>Loading:</span>
                  <Badge variant={debugInfo.hookState?.loading ? 'secondary' : 'default'}>
                    {debugInfo.hookState?.loading ? 'True' : 'False'}
                  </Badge>
                </div>
              </div>
              {debugInfo.hookState?.user && (
                <pre className="text-xs bg-muted p-2 rounded mt-2 overflow-auto">
                  {JSON.stringify(debugInfo.hookState.user, null, 2)}
                </pre>
              )}
            </div>

            {/* Supabase Session */}
            <div>
              <h3 className="font-semibold mb-2">Supabase Session</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span>Session:</span>
                  <Badge variant={debugInfo.supabaseSession?.data ? 'default' : 'destructive'}>
                    {debugInfo.supabaseSession?.data ? 'Present' : 'Null'}
                  </Badge>
                </div>
                {debugInfo.supabaseSession?.error && (
                  <div className="text-red-500 text-sm">
                    Error: {debugInfo.supabaseSession.error}
                  </div>
                )}
              </div>
              {debugInfo.supabaseSession?.data && (
                <pre className="text-xs bg-muted p-2 rounded mt-2 overflow-auto">
                  {JSON.stringify(debugInfo.supabaseSession.data, null, 2)}
                </pre>
              )}
            </div>

            {/* Database Records */}
            <div>
              <h3 className="font-semibold mb-2">Database Records</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span>Profile Exists:</span>
                  <Badge variant={debugInfo.database?.profileExists ? 'default' : 'destructive'}>
                    {debugInfo.database?.profileExists ? 'Yes' : 'No'}
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <span>User Record:</span>
                  <Badge variant={debugInfo.database?.userRecord ? 'default' : 'destructive'}>
                    {debugInfo.database?.userRecord ? 'Present' : 'Missing'}
                  </Badge>
                </div>
              </div>
              {debugInfo.database?.userRecord && (
                <pre className="text-xs bg-muted p-2 rounded mt-2 overflow-auto">
                  {JSON.stringify(debugInfo.database.userRecord, null, 2)}
                </pre>
              )}
            </div>

            {/* LocalStorage */}
            <div>
              <h3 className="font-semibold mb-2">LocalStorage Auth Data</h3>
              <pre className="text-xs bg-muted p-2 rounded overflow-auto max-h-40">
                {JSON.stringify(debugInfo.localStorage, null, 2)}
              </pre>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-4 border-t">
            <Button 
              onClick={() => {
                localStorage.clear();
                window.location.reload();
              }}
              variant="destructive"
              size="sm"
            >
              Clear Storage & Reload
            </Button>
            <Button 
              onClick={async () => {
                await supabase.auth.signOut();
                window.location.reload();
              }}
              variant="outline"
              size="sm"
            >
              Sign Out & Reload
            </Button>
            <Button 
              onClick={() => {
                console.log('Auth Debug Info:', debugInfo);
              }}
              variant="outline"
              size="sm"
            >
              Log to Console
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
