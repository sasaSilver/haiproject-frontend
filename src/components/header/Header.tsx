import Search from "~/components/header/Search";
import UserCenter from "~/components/header/UserCenter";
import { SIDEBAR_WIDTH } from "~/components/ui/sidebar"

export default function Header() {
    return (
        <header
            className="flex w-full justify-between fixed p-4 border-b backdrop-blur-sm"
            style={{ marginLeft: SIDEBAR_WIDTH }}
        >
            <Search />
            <UserCenter />
        </header>
    )
}