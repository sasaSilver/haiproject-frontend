import { Button } from "~/components/ui/button";
import { Bell } from "lucide-react";
import ThemeToggle from "~/components/theme-toggle";
import Link from "next/link";

export default function() {
    return (
      <div className="flex gap-4">
        <ThemeToggle/>
        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
          <Bell className="h-5 w-5" />
        </Button>
        <Button asChild variant="secondary" className="text-muted-foreground hover:text-foreground">
          <Link href="/auth/login">Sign In</Link>
        </Button>
      </div>
    );
}