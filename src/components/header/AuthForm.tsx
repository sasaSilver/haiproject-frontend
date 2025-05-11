"use client";

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { Eye, EyeOff } from "lucide-react"

import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import { AuthService } from "~/lib/api/authService";
import { useLoginState } from "~/store/login";
export default function AuthForm() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [usernameInput, setUsernameInput] = useState("")
  const [passwordInput, setPasswordInput] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [errorType, setErrorType] = useState<"login" | "signup" | "">("")
  const { setUserName, setLoggedIn } = useLoginState();
  
  async function LoginSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsLoading(true)
    try {
      await AuthService.login({name: usernameInput, password: passwordInput});
      setLoggedIn(true);
      setUserName(usernameInput);
      router.push("/profile")
    } catch (error) {
      console.error("Login failed", error)
      setErrorMessage("Login failed")
      setErrorType("login")
    } finally {
      setIsLoading(false)
    }
  }

  async function RegisterSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsLoading(true)
    try {
      await AuthService.register({name: usernameInput, password: passwordInput });
      setLoggedIn(true);
      setUserName(usernameInput);
      router.push("/profile")
    } catch (error) {
      console.error("Registration failed", error)
      setErrorMessage("Signing up failed")
      setErrorType("signup")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div>
      <form onSubmit={(e) => e.preventDefault()} className="space-y-4 ">
        <div className="space-y-2">
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            type="text"
            placeholder="johndoe"
            required
            value={usernameInput}
            onChange={(e) => {
              setUsernameInput(e.target.value)
              setErrorMessage("")
            }}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              required
              value={passwordInput}
              onChange={(e) => {
                setPasswordInput(e.target.value)
                setErrorMessage("")
              }}
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-0 top-0 h-full px-3"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
          </div>
        </div>
        <div className="flex space-x-4 pb-2">
          {["Log In", "Sign Up"].map((text) => (
            <Button
              key={text}
              variant="default"
              onClick={text === "Log In" ? LoginSubmit : RegisterSubmit}
              className={`px-3 py-1 rounded-md font-medium flex-1 ${
                errorMessage && ((text === "Log In" && errorType === "login") || (text === "Sign Up" && errorType === "signup"))
                  ? "border border-red-500"
                  : ""
              }`}
              disabled={isLoading}
            >
              {text}
            </Button>
          ))}
        </div>
        {errorMessage && (
          <p className="text-red-500 text-center text-sm">{errorMessage}</p>
        )}
      </form>
    </div>
  )
}
