"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Category } from "@/payload-types";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface Props {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    data: Category[];
}

const categoriesSidebar = ({ isOpen, onOpenChange, data }: Props) => {
    const router = useRouter()
    const [parentCategories, setparentCategories] = useState<Category | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

    const currentCategory = parentCategories ?? data ?? [];
    const handleOpenChange = (open: boolean) => {
        if (!open) {
            setparentCategories(null);
            setSelectedCategory(null);
            onOpenChange(open);
        }
    }

    const handleBackClick = () => {
        setparentCategories(null);
        setSelectedCategory(null);
    }

    const handleCategoryClick = (category: any) => {
        if (category.subCategories && category.subCategories.length > 0) {
            setparentCategories(category.subCategories);
            setSelectedCategory(category);
        } else {
            if (parentCategories && selectedCategory) {
                // This is a subCategory - navigate to category
                router.push(`/${selectedCategory.slug}/${category.slug}`)
            } else {
                if (category.slug === 'all') {
                    router.push(`/`)
                } else {
                    router.push(`/${category.slug}`)
                }
            }
            handleOpenChange(false);
        }
    }

    const backgroundColor = selectedCategory?.color || "white";

    return (
        <Sheet open={isOpen} onOpenChange={handleOpenChange}>
            <SheetContent side="left" className="p-0 transition-none w-full sm:max-w-md" style={{ backgroundColor }}>
                <SheetHeader className="p-4 border-b">
                    <SheetTitle>Categories</SheetTitle>
                </SheetHeader>
                <ScrollArea className="flex flex-col overflow-y-auto h-full pb-2">
                    {parentCategories &&
                        (
                            <button
                                onClick={handleBackClick}
                                className="w-full text-left p-4 hover:bg-black hover:text-white flex items-center
                    text-base font-medium">
                                <ChevronLeftIcon className="size-4 mr-2" />
                                Back
                            </button>
                        )}
                    {currentCategory.map((category: any) => (
                        <button key={category.slug} onClick={() => handleCategoryClick(category)} className="w-full text-left p-4 hover:bg-black hover:text-white flex justify-between items-center text-base font-medium cursor-pointer">
                            {category.name}
                            {category.subCategories && category.subCategories.length > 0 && (
                                <ChevronRightIcon className="size-4" />
                            )}
                        </button>
                    ))}
                </ScrollArea>
            </SheetContent>
        </Sheet >
    );
}

export default categoriesSidebar;