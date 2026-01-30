// import { caller } from "@/trpc/server";

import { ProductList, ProductListSkeleton } from "@/features/products/components/product-list";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";

interface Props {
    params: Promise<{ category: string }>
}
export default async function CategoryPage({params}: Props) {
    const { category } = await params;

    // server side
    // const products = await caller.products.getMany();
    const queryClient = getQueryClient();
    void queryClient.prefetchQuery(trpc.products.getMany.queryOptions({ category }));

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <Suspense fallback={<ProductListSkeleton />}>
                <ProductList category={category} />
            </Suspense>
        </HydrationBoundary>
    );
}
