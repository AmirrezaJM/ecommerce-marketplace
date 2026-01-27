import { Navbar } from "../../../features/header/Navbar";
import { SearchFilters, SearchFiltersSkeleton } from "../../../features/search-filters";
import React, { Suspense } from "react";
import { Footer } from "../../../features/footer/footer";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

interface Props {
    children: React.ReactNode;
}

const Layout = async ({ children }: Props) => {
    const queryClient = getQueryClient();
    void queryClient.prefetchQuery(
        trpc.categories.getMany.queryOptions()
    );
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <HydrationBoundary state={dehydrate(queryClient)}>
                <Suspense fallback={<SearchFiltersSkeleton />}>
                    <SearchFilters />
                </Suspense>
            </HydrationBoundary>
            <div className="flex-1 bg-[#F4F4F0]">
                {children}
            </div>
            <Footer />
        </div>
    );
};

export default Layout;
