import getCategory from "@/actions/get-category";
import getColors from "@/actions/get-colors";
import getProducts from "@/actions/get-products";
import getSizes from "@/actions/get-sizes";
import Billboard from "@/components/billboard";
import Filter from "@/app/(routes)/category/[categoryId]/components/filter";
import Container from "@/components/ui/container";
import NoResults from "@/components/ui/no-results";
import ProductCard from "@/components/ui/product-card";
import MobileFilters from "./components/mobile-filters";

export const revalidate = 0;

type CategoryPageProps = {
    params: {
        categoryId: string;
    },
    searchParams: {
        colorId: string;
        sizeId: string;
    }
};

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
    const products = await getProducts({
        categoryId: params.categoryId,
        colorId: searchParams.colorId,
        sizeId: searchParams.sizeId
    });

    const sizes = await getSizes();
    const colors = await getColors();
    const category = await getCategory(params.categoryId);

    return (
        <div>
            <Container>
                <Billboard
                    data={category.billboard}
                />
                <div className="px-4 sm:px-6 lg:px-8 pb-24">
                    <div className="lg:grid lg:grid-cols-5 lg:gap-x-8">
                        <MobileFilters sizes={sizes} colors={colors}/>
                        <div className="hidden lg:block">
                            <Filter
                                valueKey="sizeId"
                                name="Tamanhos"
                                data={sizes}
                            />
                            <Filter
                                valueKey="colorId"
                                name="Cores"
                                data={colors}
                            />
                        </div>
                        <div className="mt-6 lg:col-span-4 lg:mt-0">
                            {!products.length && <NoResults />}
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                {products.map((item) => (
                                    <ProductCard 
                                        key={item.id}
                                        data={item} 
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    )
}