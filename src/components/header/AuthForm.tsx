"use client";

import Cookies from "js-cookie";
import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { Eye, EyeOff } from "lucide-react"

import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import { AuthService } from "~/lib/api/authService";

export default function AuthForm() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [usernameInput, setUsernameInput] = useState("")
  const [passwordInput, setPasswordInput] = useState("")

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const response = await AuthService.login({username: usernameInput, password: passwordInput});
      Cookies.set("token", response.access_token, { expires: 1 })
      router.push("/profile")
    } catch (error) {
      console.error("Login failed", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const response = await AuthService.register({name: usernameInput, password: passwordInput });
      Cookies.set("token", response.access_token || usernameInput, { expires: 1 })
      router.push("/profile")
    } catch (error) {
      console.error("Registration failed", error)
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
            onChange={(e) => setUsernameInput(e.target.value)}
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
              onChange={(e) => setPasswordInput(e.target.value)}
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-0 top-0 h-full px-3"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
            </Button>
          </div>
        </div>
        <div className="flex space-x-4 pb-2">
          <Button
            variant="default"
            onClick={handleLoginSubmit}
            className="px-3 py-1 rounded-md font-medium flex-1"
            disabled={isLoading}
          >
            Log In
          </Button>
          <Button
            variant="default"
            onClick={handleRegisterSubmit}
            className="px-3 py-1 rounded-md font-medium flex-1"
            disabled={isLoading}
          >
            Sign Up
          </Button>
        </div>
      </form>
    </div>
  )
}
