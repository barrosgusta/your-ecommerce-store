"use client"

import Button from "@/components/ui/store-button"
import useCart from "@/hooks/use-cart"
import { ShoppingBag } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { ThemeToggle } from "./theme-toogle"

export default function NavbarActions() {
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    const router = useRouter();
    const cart = useCart();

    if (!isMounted) return null

    return (
        <div className="ml-auto flex items-center gap-x-4">
            <ThemeToggle />
            <Button className="flex items-center rounded-full bg-black dark:bg-neutral-100 px-4 py-2" onClick={() => router.push("/cart")}>
                <ShoppingBag 
                    size={20}
                    className="text-white dark:text-black"
                />
                <span className="ml-2 text-sm font-medium text-white dark:text-black">
                    {cart.items.length}
                </span>
            </Button>
        </div>
    )
}