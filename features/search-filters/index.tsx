"use client";
import { useTRPC } from "@/trpc/client";
import { Categories } from "../categories/categories";
import { SearchInput } from "./search-input";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { DEFAULT_CATEGORY_COLOR } from "@/lib/constants";
import BreadcrumbNavigation from "../header/Breadcrumbs-navigation";

export const SearchFilters = () => {
    const trpc = useTRPC();
    const { data } = useSuspenseQuery(trpc.categories.getMany.queryOptions());

    const params = useParams();
    const categoryParam = params.category as string | undefined;
    const activeCategory = categoryParam || 'all';

    const activeCategoryData = data.find((category: any) => category.slug === activeCategory);

    const activeCategoryColor = activeCategoryData?.color || DEFAULT_CATEGORY_COLOR;
    const activityCategoryName = activeCategoryData?.name || null;
    const activeSubCategory = params.subcategory as string | undefined;
    const activeSubCategoryName = activeCategoryData?.subCategories?.find((subCategory: any) => subCategory.slug === activeSubCategory)?.name || null;
    return (
        <div className="px-4 lg:px-12 py-8 border-b flex flex-col gap-4 w-full" style={{ backgroundColor: activeCategoryColor }}>
            <SearchInput />
            <div className="hidden lg:block items-center justify-between">
                <Categories data={data} />
            </div>
            <BreadcrumbNavigation
                activeCategory={activeCategory}
                activeCategoryName={activityCategoryName}
                activeSubcategoryName={activeSubCategoryName}
            />
        </div>
    );
}

export const SearchFiltersSkeleton = () => {
    return (
        <div className="px-4 lg:px-12 py-8 border-b flex flex-col gap-4 w-full" style={{ backgroundColor: "#F5F5F5" }}>
            <SearchInput disabled />
            <div className="hidden lg:block items-center justify-between">
                <div className="h-10" />
            </div>
        </div>
    );
}