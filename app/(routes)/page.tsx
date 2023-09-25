import getBillboard from "@/actions/get-billboard";
import getProducts from "@/actions/get-products";
import Billboard from "@/components/billboard";
import ProductList from "@/components/ui/product-list";
import Container from "@/components/ui/container";

// Opt out of caching for all data requests in the route segment
export const dynamic = 'force-dynamic'

export default async function HomePage() {
    const products = await getProducts({ isFeatured: true });
    const billboard = await getBillboard("cllzlwq1n00032nkg9kz5wvsg");

    return (
        <Container>
            <div className="space-y-10 pb-10">
                <Billboard data={billboard}/>
                <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
                    <ProductList title="Produtos em destaque" items={products}/>
                </div>
            </div>
        </Container>
    )
}