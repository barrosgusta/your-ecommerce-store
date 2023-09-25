"use client"

import Container from "@/components/ui/container"
import useCart from "@/hooks/use-cart"
import { useState, useEffect } from "react"
import CartItem from "./components/cart-item"
import Summary from "./components/summary"

export default function CartPage() {
    const [isMounted, setIsMounted] = useState(false)
    const cart = useCart()

    useEffect(() => {
        setIsMounted(true)
    }, [])

    if (!isMounted) return null
    
    return (
        <div>
            <Container>
                <div className="px-4 py-16 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold text-black">Carrinho de Compras</h1>
                    <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start gap-x-12">
                        <div className="lg:col-span-7">
                            {!cart.items.length && <p className="text-neutral-500">Nenhum item adicionado no carrinho</p>}
                            <ul>
                                {cart.items.map((item) => (
                                    <CartItem
                                        key={item.id}
                                        data={item}
                                    />
                                ))}
                            </ul>
                        </div>
                        <Summary />
                    </div>
                </div>
            </Container>
        </div>
    )
}