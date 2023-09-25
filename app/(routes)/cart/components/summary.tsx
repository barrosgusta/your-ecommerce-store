"use client"

import Button from "@/components/ui/store-button"
import Currency from "@/components/ui/currency"
import useCart from "@/hooks/use-cart"
import axios from "axios"
import { useSearchParams } from "next/navigation"
import { useEffect } from "react"
import toast from "react-hot-toast"

export default function Summary() {
    const searchParams = useSearchParams();
    const items = useCart((state) => state.items);
    const clearCart = useCart((state) => state.clearCart);

    useEffect(() => {
        if (searchParams.get("success")) {
            toast.success("Pedido realizado com sucesso!");
            clearCart();
        };

        if (searchParams.get("canceled")) {
            toast.error("Pedido cancelado!");
        };
    }, [searchParams, clearCart]);

    const total = items.reduce((acc, item) => {
        return acc + Number(item.price);
    }, 0);

    const onCheckout = async () => {
        const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/checkout`, {
            productIds: items.map((item) => item.id),
        });

        window.location.href = res.data.url;
    };

    return (
        <div className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
            <h2 className="text-lg font-medium text-gray-900">
                Resumo do Pedido
            </h2>
            <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                    <div className="text-base font-medium text-gray-900">
                        Total do Pedido
                    </div>
                    <Currency value={total} />
                </div>
            </div>
            <Button disabled={!items.length} onClick={onCheckout} className="w-full mt-6">
                Finalizar Pedido
            </Button>
        </div>
    )
}