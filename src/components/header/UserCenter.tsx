import { Button } from "~/components/ui/button";
import { Bell } from "lucide-react";
import ThemeToggle from "~/components/theme-toggle";

export default function() {
    return (
      <div className="flex gap-4">
        <ThemeToggle/>
        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
          <Bell className="h-5 w-5" />
        </Button>
        <Button variant="secondary" className="text-muted-foreground hover:text-foreground">
          Sign In
        </Button>
      </div>
    );
}