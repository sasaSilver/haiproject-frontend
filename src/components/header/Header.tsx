import Search from "~/components/header/Search";
import UserCenter from "~/components/header/UserCenter";
import { cn } from "~/lib/utils";

export default function Header(props: {className?: string}) {
    return (
        <header
            className={cn(
                "flex fixed left-40 right-0 justify-between p-4 z-1 border-b backdrop-blur-sm",
                props.className
            )}
        >
            <Search />
            <UserCenter />
        </header>
    )
}