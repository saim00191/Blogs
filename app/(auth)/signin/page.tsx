"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux"; 
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import { auth } from "@/firebase/firebase"; 
import { signInWithEmailAndPassword } from "firebase/auth";
import { setUserInfo } from "@/redux/slice";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const dispatch = useDispatch(); 

  const userInfo = useSelector(
    (state: RootState) => state.commentsSlice?.userInfo
  );

  if (userInfo) {
    return (
      <div className="flex h-screen items-center justify-center px-2 ssm:px-5 md:px-12">
        <Card className="w-full max-w-screen-sm mx-auto shadow-xl md:p-8">
          <CardHeader className="space-y-2">
            <CardTitle className="text-3xl font-bold">
              You're already logged in
            </CardTitle>
            <CardDescription className="text-lg">
              You are already signed in. Go to the home page to start
              interacting with the app.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Button
              onClick={() => router.push("/")}
              className="w-full py-3 text-lg"
            >
              Go to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }
 
  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    setLoading(true);
    setError(""); 

   
   
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const user = result.user; 
      setLoading(false);
      console.log("User signed in with email/password:", user);
      dispatch(setUserInfo({
        id: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL
      }));

      router.push("/"); 
    } catch (error:any) {
      setLoading(false);
      setError("Failed to sign in with email/password. Please check your credentials.");
      console.error("Error signing in with email/password:", error.message);
    }
  };


  return (
    <div className="flex h-screen items-center justify-center px-2 ssm:px-5 md:px-12">
      <Card className="w-full max-w-screen-sm mx-auto shadow-xl md:p-8">
        <CardHeader className="space-y-2">
          <CardTitle className="text-3xl font-bold">Sign in</CardTitle>
          <CardDescription className="text-lg">
            Enter your email and password to sign in to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-3">
              <Label htmlFor="email" className="text-lg">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="text-lg py-3 px-4"
              />
            </div>
            <div className="space-y-3">
              <Label htmlFor="password" className="text-lg">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                placeholder="********"
                onChange={(e) => setPassword(e.target.value)}
                required
                className="text-lg py-3 px-4"
              />
            </div>
            <Button type="submit" className="w-full py-3 text-lg" disabled={loading}>
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
          {error && (
            <div className="text-red-500 text-sm mt-2">{error}</div>
          )}
          
       
        </CardContent>
      </Card>
    </div>
  );
}
