"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Category } from "@/payload-types";
import { useRef, useState } from "react";
import { useDropdownPosition } from "@/hooks/use-dropdown-position";
import SubcategoryMenu from "./subcategory-menu";
import Link from "next/link";

interface Props {
    category: Category;
    isActive: boolean;
    isNavigationHovered: boolean;
}

const CategoryDropdown = ({ category, isActive, isNavigationHovered }: Props) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const { getDropdownPosition } = useDropdownPosition(dropdownRef);

    const onMouseEnter = () => {
        if (category.subCategories) {
            setIsOpen(true);
        }
    };

    const dropdownPosition = getDropdownPosition();

    const onMouseLeave = () => {
        setIsOpen(false);
    };

    return (
        <div className="relative" ref={dropdownRef} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
            <div className="relative ">
                <Button asChild variant="elavated" className={cn("h-11 px-4 bg-transparent border-transparent rounded-full hover:bg-white hover:border-primary text-black",
                    isActive && !isNavigationHovered && "bg-white border-primary shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -translate-x-[4px] -translate-y-[4px]",
                    isOpen && "bg-white border-primary")}>
                    <Link href={`/${category.slug}`}>
                        {category.name}
                    </Link>
                </Button>
                {category.subCategories && category.subCategories.length > 0 && (
                    <div
                        className={cn(
                            "opacity-0 absolute -bottom-3 w-0 h-0 border-l-10 border-r-10 border-b-10 border-l-transparent border-r-transparent border-b-black left-1/2 -translate-x-1/2",
                            isOpen && "opacity-100"
                        )}
                    />
                )}
            </div>
            <SubcategoryMenu category={category} isOpen={isOpen} position={dropdownPosition} />
        </div>
    );
}

export default CategoryDropdown;