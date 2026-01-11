import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  // Mock admin credentials - single admin login
  const adminCredentials = {
    email: "admin@gov.in",
    password: "admin123",
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Check admin credentials
    if (formData.email === adminCredentials.email && formData.password === adminCredentials.password) {
      const adminUser = {
        email: formData.email,
        role: "admin",
        name: "System Administrator",
        department: null,
      };
      localStorage.setItem("adminUser", JSON.stringify(adminUser));
      toast({
        title: "Login Successful",
        description: "Welcome, Administrator!",
      });
      navigate("/admin");
      return;
    }

    setError("Invalid credentials");
  };

  return (
    <div className="min-h-screen bg-background-secondary flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header with Indian Flag Colors */}
        <div className="text-center mb-8">
          <div className="bg-gradient-patriot rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center shadow-saffron">
            <Shield className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Naagrik Sampark Admin Portal
          </h1>
          <p className="text-muted-foreground">
            Administrative Access Portal
          </p>
        </div>

        <Card className="shadow-saffron border-card-border">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl text-center text-foreground">
              Administrator Login
            </CardTitle>
            <CardDescription className="text-center">
              Enter your administrative credentials
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              {/* Email Input */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Administrator Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="admin@gov.in"
                  className="w-full"
                />
              </div>

              {/* Password Input */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="Enter your password"
                  className="w-full"
                />
              </div>

              {error && (
                <div className="text-sm text-danger bg-danger/10 p-2 rounded">
                  {error}
                </div>
              )}

              {/* Login Button */}
              <Button
                type="submit"
                className="w-full bg-gradient-saffron hover:bg-saffron-dark text-white font-medium py-2.5 transition-smooth"
              >
                Sign In to Dashboard
              </Button>
            </form>

            {/* Demo Credentials */}
            <div className="mt-4 p-3 bg-forest-green/10 border border-forest-green/20 rounded-lg">
              <p className="text-sm text-forest-green">
                <strong>Demo Credentials:</strong><br />
                Email: admin@gov.in<br />
                Password: admin123
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-6 text-sm text-muted-foreground">
          <p>Secure Government Portal • Made in India 🇮🇳</p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;