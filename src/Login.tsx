import React, { useState } from 'react';
import { Moon, Brain, HeartPulse, Heart, Sparkles, Mail, User, LockKeyhole, ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";

function Login() {
  const [isHovered, setIsHovered] = useState(false);
  const [activeTab, setActiveTab] = useState("login");

  const menuItems = [
    { icon: Moon, title: 'SLEEP', description: 'Improve your sleep quality' },
    { icon: Brain, title: 'MEDITATION', description: 'Find inner peace' },
    { icon: HeartPulse, title: 'STRESS & ANXIETY', description: 'Manage daily stress' },
    { icon: Heart, title: 'GRATITUDE', description: 'Practice thankfulness' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md border-b border-neutral-200 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <Sparkles className="h-8 w-8 text-neutral-900" />
              <span className="text-lg font-medium text-neutral-900">Mindful</span>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <div className="relative">
                <button
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  className="px-3 py-2 text-neutral-600 hover:text-neutral-900 transition-colors"
                >
                  Articles
                </button>

                {/* Hover Menu */}
                <div
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  className={`absolute right-0 w-[600px] mt-2 bg-white rounded-xl shadow-lg transform transition-all duration-300 ease-in-out ${
                    isHovered
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-2 pointer-events-none'
                  }`}
                  style={{ zIndex: 999 }} // Ensures the hover menu stays on top of other elements
                >
                  <div className="p-6 grid grid-cols-2 gap-6">
                    {menuItems.map((item, index) => (
                      <div
                        key={index}
                        className="group p-4 rounded-lg border border-gray-100 hover:border-gray-200 hover:shadow-md transition-all duration-200 cursor-pointer"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="p-2 rounded-full bg-gray-50 group-hover:bg-gray-100 transition-colors">
                            <item.icon className="w-6 h-6 text-gray-600" />
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-900">{item.title}</h3>
                            <p className="text-sm text-gray-500">{item.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <Button
                variant={activeTab === "login" ? "default" : "ghost"}
                onClick={() => setActiveTab("login")}
              >
                Login
              </Button>
              <Button
                variant={activeTab === "signup" ? "default" : "ghost"}
                onClick={() => setActiveTab("signup")}
              >
                Sign up
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Auth Container */}
      <main className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center min-h-screen">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-semibold text-neutral-900 mb-2">Begin Your Mindful Journey</h1>
          <p className="text-neutral-600">Find peace in every moment</p>
        </div>
        <Card className="w-full max-w-md backdrop-blur-sm bg-white/90 z-10"> {/* Added z-10 to ensure it stays beneath hover menu */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign up</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <CardHeader>
                <CardTitle>Welcome back</CardTitle>
                <CardDescription>Continue your mindfulness practice</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-2.5 h-5 w-5 text-neutral-400" />
                      <Input id="email" type="email" placeholder="you@example.com" className="pl-10" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <LockKeyhole className="absolute left-3 top-2.5 h-5 w-5 text-neutral-400" />
                      <Input id="password" type="password" className="pl-10" />
                    </div>
                  </div>
                  <Button className="w-full group">
                    Sign in
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </form>
              </CardContent>
            </TabsContent>

            <TabsContent value="signup">
              <CardHeader>
                <CardTitle>Start your journey</CardTitle>
                <CardDescription>Create your mindfulness account today</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First name</Label>
                      <Input id="firstName" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last name</Label>
                      <Input id="lastName" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signupEmail">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-2.5 h-5 w-5 text-neutral-400" />
                      <Input id="signupEmail" type="email" placeholder="you@example.com" className="pl-10" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-2.5 h-5 w-5 text-neutral-400" />
                      <Input id="username" className="pl-10" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signupPassword">Password</Label>
                    <div className="relative">
                      <LockKeyhole className="absolute left-3 top-2.5 h-5 w-5 text-neutral-400" />
                      <Input id="signupPassword" type="password" className="pl-10" />
                    </div>
                  </div>
                  <Button className="w-full group">
                    Begin your journey
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </form>
              </CardContent>
            </TabsContent>
          </Tabs>
        </Card>
      </main>
    </div>
  );
}

export default Login;
