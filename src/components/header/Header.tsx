import Search from "~/components/header/Search";
import UserCenter from "~/components/header/UserCenter";

export default function Header() {
    return (
        <header
            className="flex w-full not-odd:justify-between fixed p-4 pl-52 border-b backdrop-blur-sm"    
        >
            <Search />
            <UserCenter />
        </header>
    )
}