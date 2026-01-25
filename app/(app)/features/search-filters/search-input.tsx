"use client";

import { Input } from "@/components/ui/input";
import { ListFilterIcon, SearchIcon } from "lucide-react";
import CategoriesSidebar from "../categories/Categories-sidebar";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface Props {
    disabled?: boolean;
    data?: any; //TODO: Custom
}

export const SearchInput = ({
    disabled,
    data,
}: Props) => {
    const [isSidebarOpen , setIsSidebarOpen] = useState(false);
    return (
        <div className="flex items-center gap-2 w-full">
            <CategoriesSidebar data={data} isOpen={isSidebarOpen} onOpenChange={setIsSidebarOpen} />
            <div className="relative w-full">
                <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-neutral-500" />
                <Input className="pl-8" placeholder="Search Product" disabled={disabled} />
            </div>
            {/* TODO: Add Category View Button */}
            <Button
                variant="elavated"
                onClick={() => setIsSidebarOpen(true)}
                className="size-12 shrink-0 flex lg:hidden "
            >
                <ListFilterIcon />
            </Button>
            {/* TODO: Add Library Button */}
        </div>
    )
}