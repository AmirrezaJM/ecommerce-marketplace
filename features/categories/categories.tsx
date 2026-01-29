"use client";
import { Category } from "@/payload-types";
import CategoryDropdown from "./category-dropdown";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ListFilterIcon } from "lucide-react";
import CategoriesSidebar from "./categories-sidebar";
import { useParams } from "next/navigation";

interface CategoriesProps {
    data: any;
}

export const Categories = ({
    data,
}: CategoriesProps) => {
    const params = useParams();
    const containerRef = useRef<HTMLDivElement>(null);
    const measurementRef = useRef<HTMLDivElement>(null);
    const ViewAllRef = useRef<HTMLDivElement>(null);

    const [visibleCount, setVisibleCount] = useState(data.length);
    const [isAnyHovered, setIsAnyHovered] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);


    const categoryParam = params.category as string | undefined;
    const activeCategory = categoryParam || 'all';


    const activeCategoryIndex = data.findIndex((category: Category) => category.slug === activeCategory);
    const isActiveCategoryHidden = activeCategoryIndex > visibleCount && activeCategoryIndex !== -1;

    useEffect(() => {
        const calculateVisible = () => {
            if (!containerRef.current || !measurementRef.current || !ViewAllRef.current) return;
            const containerWidth = containerRef.current.offsetWidth;
            const viewAllWidth = ViewAllRef.current?.offsetWidth || 0;
            const availableWidth = containerWidth - viewAllWidth;
            const items = Array.from(measurementRef.current.children);
            let totalWidth = 0
            let visible = 0
            for (const item of items) {
                const width = item.getBoundingClientRect().width;
                if (totalWidth + width > availableWidth) {
                    break
                }
                totalWidth += width;
                visible++;
            }
            setVisibleCount(visible);
        };
        const resizeObserver = new ResizeObserver(calculateVisible);
        resizeObserver.observe(containerRef.current!);

        return () => resizeObserver.disconnect();
    }, [data.length]);

    return (
        <div ref={containerRef} className="relative w-full">
            {/* TODO: Create it as a seperate loading component by usung TRPC */}
            <CategoriesSidebar isOpen={isSidebarOpen} onOpenChange={setIsSidebarOpen} data={data} />
            {/* HIDDEN CATEGORIES */}
            <div
                ref={measurementRef}
                className="absolute opacity-0 pointer-events-none flex"
                style={{ position: "fixed", top: -9999, left: -9999 }}
            >
                {data.map((category: Category) =>
                    <div key={category.id}>
                        <CategoryDropdown category={category} isActive={activeCategory === category.slug} isNavigationHovered={false} />
                    </div>
                )}
            </div>
            {/* VISIBLE CATEGORIES */}
            <div onMouseEnter={() => setIsAnyHovered(true)} onMouseLeave={() => setIsAnyHovered(false)} className="flex flex-nowrap items-center">
                {data.slice(0, visibleCount).map((category: Category) => (
                    <div key={category.id}>
                        <CategoryDropdown category={category} isActive={activeCategory === category.slug} isNavigationHovered={isAnyHovered} />
                    </div>
                ))}
                <div ref={ViewAllRef} className="shrink-0">
                    <Button variant="elavated" className={cn("h-11 px-4 bg-transparent border-transparent rounded-full hover:bg-white hover:border-primary text-black",
                        isActiveCategoryHidden && !isAnyHovered && "bg-white border-primary shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -translate-x-[4px] -translate-y-[4px]")}
                        onClick={() => setIsSidebarOpen(true)}>
                        View All
                        <ListFilterIcon className="ml-2" />
                    </Button>
                </div>
            </div>
        </div >
    );
}