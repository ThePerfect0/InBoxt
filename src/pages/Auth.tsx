import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Mail, Loader2, ArrowLeft, Eye, EyeOff, Shield, Check } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { ConnectEmailDialog } from "@/components/ConnectEmailDialog";
import { Link } from "react-router-dom";

export function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [showConnectDialog, setShowConnectDialog] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const { signUp, signIn, signInWithGoogle } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Clear previous errors
    setEmailError("");
    setPasswordError("");

    // Validate inputs
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);

    if (!isEmailValid || !isPasswordValid) {
      setIsLoading(false);
      return;
    }

    try {
      const { error } = isLogin 
        ? await signIn(email, password)
        : await signUp(email, password);

      if (error) {
        
        if (error.message.includes('Email not confirmed')) {
          toast({
            title: "Please check your email",
            description: "We've sent you a confirmation link. Click it to activate your account.",
          });
        } else if (error.message.includes('Invalid login credentials') || error.message.includes('Invalid email or password')) {
          toast({
            title: "Invalid credentials",
            description: "Please check your email and password and try again.",
            variant: "destructive",
          });
        } else if (error.message.includes('User already registered')) {
          toast({
            title: "Account exists",
            description: "An account with this email already exists. Please sign in instead.",
            variant: "destructive",
          });
          setIsLogin(true);
        } else if (error.message.includes('Password should be at least 6 characters')) {
          setPasswordError("Password must be at least 6 characters");
        } else if (error.message.includes('Unable to validate email address')) {
          setEmailError("Please enter a valid email address");
        } else {
          toast({
            title: "Authentication failed",
            description: error.message,
            variant: "destructive",
          });
        }
      } else {
        if (!isLogin) {
          // For new signups, show connect email dialog
          setShowConnectDialog(true);
        }
        
        toast({
          title: isLogin ? "Welcome back!" : "Account created!",
          description: isLogin ? "You've been signed in successfully." : "Please check your email to confirm your account.",
        });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    setIsLoading(true);
    try {
      const { error } = await signInWithGoogle();
      if (error) {
        toast({
          title: "Google authentication failed",
          description: error.message,
          variant: "destructive",
        });
      }
      // OAuth will redirect automatically on success
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to authenticate with Google",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setEmailError("Email is required");
      return false;
    }
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address");
      return false;
    }
    setEmailError("");
    return true;
  };

  const validatePassword = (password: string) => {
    if (!password) {
      setPasswordError("Password is required");
      return false;
    }
    if (!isLogin && password.length < 8) {
      setPasswordError("Password must be at least 8 characters");
      return false;
    }
    setPasswordError("");
    return true;
  };

  return (
    <div className="min-h-screen bg-gradient-subtle flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 text-foreground-muted hover:text-foreground mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </Link>
          
          {/* InBoxt Logo */}
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Mail className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">InBoxt</span>
          </div>
          
          <h1 className="text-heading-xl font-bold text-foreground mb-2">
            {isLogin ? "Welcome back" : "Create account"}
          </h1>
          <p className="text-body text-foreground-muted">
            {isLogin 
              ? "Sign in to your InBoxt account" 
              : "Get started with intelligent email digests"
            }
          </p>
        </div>

        <Card className="shadow-lg">
          <CardHeader className="pb-4">
            <CardTitle className="text-center text-heading-sm">
              {isLogin ? "Sign in" : "Sign up"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Google OAuth */}
            <Button
              onClick={handleGoogleAuth}
              disabled={isLoading}
              className="w-full h-12 gap-3 bg-primary hover:bg-primary-hover text-primary-foreground font-semibold shadow-md hover:shadow-lg transition-all"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Mail className="w-5 h-5" />
              )}
              Continue with Google
            </Button>
            
            {/* Trust indicator */}
            <div className="flex items-center justify-center gap-2 text-xs text-foreground-muted">
              <Shield className="w-4 h-4 text-success" />
              <span>Secure Gmail read-only access</span>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-foreground-muted">Or continue with email</span>
              </div>
            </div>

            {/* Email/Password Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (emailError) validateEmail(e.target.value);
                  }}
                  onBlur={() => validateEmail(email)}
                  placeholder="Enter your email"
                  className={`min-h-11 ${emailError ? 'border-danger' : ''}`}
                  required
                />
                {emailError && (
                  <p className="text-xs text-danger">{emailError}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (passwordError) validatePassword(e.target.value);
                    }}
                    onBlur={() => validatePassword(password)}
                    placeholder="Enter your password"
                    className={`min-h-11 pr-10 ${passwordError ? 'border-danger' : ''}`}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-foreground-muted hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {passwordError && (
                  <p className="text-xs text-danger">{passwordError}</p>
                )}
              </div>

              {/* Remember me for login */}
              {isLogin && (
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember-me"
                    checked={rememberMe}
                    onCheckedChange={(checked) => setRememberMe(checked === true)}
                  />
                  <Label htmlFor="remember-me" className="text-sm">Remember me</Label>
                </div>
              )}

              <Button
                type="submit"
                disabled={isLoading || emailError !== "" || passwordError !== ""}
                className="w-full min-h-11 shadow-md hover:shadow-lg transition-all"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    {isLogin ? "Signing in..." : "Creating account..."}
                  </>
                ) : (
                  isLogin ? "Sign in" : "Create account"
                )}
              </Button>
            </form>

            <div className="text-center text-body-sm">
              <span className="text-foreground-muted">
                {isLogin ? "Don't have an account? " : "Already have an account? "}
              </span>
              <button
                onClick={() => {
                  setIsLogin(!isLogin);
                  setEmailError("");
                  setPasswordError("");
                }}
                className="text-primary hover:underline font-medium transition-colors"
              >
                {isLogin ? "Sign up" : "Sign in"}
              </button>
            </div>
            
            {/* Privacy and Terms links */}
            <div className="text-center space-y-2">
              <a href="#privacy" className="text-xs text-foreground-muted hover:text-foreground underline-offset-4 hover:underline transition-colors block">
                How we protect your data
              </a>
              <Link to="/terms" className="text-xs text-foreground-muted hover:text-foreground underline-offset-4 hover:underline transition-colors block">
                Terms of Service
              </Link>
            </div>
          </CardContent>
        </Card>

        <ConnectEmailDialog
          open={showConnectDialog}
          onClose={() => setShowConnectDialog(false)}
          onConnected={() => {
            setShowConnectDialog(false);
            // User will be redirected to dashboard where initial fetch happens
          }}
        />
      </div>
    </div>
  );
}