"use client";

import { Button } from "~/components/ui/button"
import ThemeToggle from "~/components/theme-toggle"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "~/components/ui/dropdown-menu"
import AuthForm from "./AuthForm"

import { useLoginState } from "~/store/login";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";

export default function UserCenter() {
  const { isLoggedIn, username } = useLoginState();
  const router = useRouter();
  const { theme } = useTheme();
  return (
    <div className="flex gap-4 items-center">
      <ThemeToggle />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="secondary"
            onClick={()=>{
                isLoggedIn && router.push("/profile");
            }}
          >
            {isLoggedIn ? username : "Sign In"}
          </Button>
        </DropdownMenuTrigger>
        {!isLoggedIn && (
          <DropdownMenuContent
            className={`w-[320px] p-4 backdrop-blur-sm ${
              theme === "dark" ? "bg-black/10" : "bg-white/10"
            }`}
          >
            <AuthForm />
          </DropdownMenuContent>
        )}
      </DropdownMenu>
    </div>
  )
}
