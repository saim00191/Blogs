"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
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
import { FcGoogle } from "react-icons/fc";

import { auth } from "@/firebase/firebase";
import {
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { setUserInfo } from "@/redux/slice";
import { RootState } from "@/redux/store";

export default function SignUpForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
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

  const signInWithGoogle = async (): Promise<void> => {
    setLoading(true);
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      setLoading(false);
      console.log("User signed in with Google:", user);

      const userName = user.displayName || name;

      dispatch(
        setUserInfo({
          id: user.uid,
          email: user.email,
          displayName: userName,
          photoURL: user.photoURL || "",
        })
      );

      router.push("/");
    } catch (error: any) {
      setLoading(false);
      setError("Error signing in with Google");
    }
  };

  const handleRegistration = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let hasError = false;

    if (!hasError) {
      setLoading(true);
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;

          if (auth.currentUser) {
            updateProfile(auth.currentUser, {
              displayName: name,
            })
              .then(() => {
                console.log("Profile updated successfully");
              })
              .catch((error) => {
                console.error("Error updating profile: ", error);
                setLoading(false);
              });
          }

          console.log(user);

          setEmail("");
          setPassword("");
          setConfirmPassword("");

          setTimeout(() => {
            router.push("/signin");
          }, 3000);
        })
        .catch((error) => {
          const errorCode = error.code;
          setLoading(false);
          if (errorCode.includes("auth/email-already-in-use")) {
            setError("Email already in use. Try another one");
          }
        });
    }
  };

  return (
    <div className="flex h-screen items-center mt-16 ssm:mt-2 justify-center px-2 ssm:px-5 md:px-12">
      <Card className="w-full max-w-screen-sm mx-auto shadow-xl md:p-8">
        <CardHeader className="space-y-2">
          <CardTitle className="text-3xl font-bold">Sign Up</CardTitle>
          <CardDescription className="text-lg">
            Create an account by entering your name, email, and password or
            continue with Google.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleRegistration} className="space-y-6">
            <div className="space-y-3">
              <Label htmlFor="name" className="text-lg">
                Name
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="text-lg py-3 px-4"
              />
            </div>
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
                onChange={(e) => setPassword(e.target.value)}
                required
                className="text-lg py-3 px-4"
              />
            </div>
            <div className="space-y-3">
              <Label htmlFor="confirmPassword" className="text-lg">
                Confirm Password
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="text-lg py-3 px-4"
              />
            </div>
            <Button
              type="submit"
              className="w-full py-3 text-lg"
              disabled={loading}
            >
              {loading ? "Signing up..." : "Sign Up"}
            </Button>
          </form>
          {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-4 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6">
            <Button
              variant="outline"
              onClick={signInWithGoogle}
              className="py-3 text-[18px] flex items-center justify-center gap-3"
              disabled={loading}
            >
              <FcGoogle size={40} />
              Google
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
