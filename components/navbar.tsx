import Container from "@/components/ui/container";
import Link from "next/link";
import MainNav from "./main-nav";
import getCategories from "@/actions/get-categories";
import NavbarActions from "./navbar-actions";

export default async function Navbar() {
    const categories = await getCategories();

    return (
        <nav className="border-b">
            <Container>
                <div className="relative px-4 sm:px-6 lg:px-8 flex h-16 items-center">
                    <Link href="/" className="ml-4 flex lg:ml-0 gap-x-2">
                        <p className="font-bold text-xl">Sua Loja</p>
                    </Link>
                    <MainNav data={categories} />
                    <NavbarActions />
                </div>
            </Container>
        </nav>
    )
}