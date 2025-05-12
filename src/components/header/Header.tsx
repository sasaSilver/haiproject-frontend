import Search from "~/components/header/Search";
import UserCenter from "~/components/header/UserCenter";

export default function Header() {
    return (
        <header
            className="flex fixed left-40 right-0 justify-between p-4 z-1 border-b bg-background backgroun"
        >
            <Search />
            <UserCenter />
        </header>
    )
}