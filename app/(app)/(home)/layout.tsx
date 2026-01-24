import { Navbar } from "../features/header/Navbar";
import { SearchFilters } from "../features/search-filters";
import configPromise from "@/payload.config";
import { getPayload } from "payload";
import React from "react";
import { Footer } from "../features/footer/footer";
import { Category } from "@/payload-types";

interface Props {
    children: React.ReactNode;
}

const Layout = async ({ children }: Props) => {
    const payload = await getPayload({
        config: configPromise,
    });

    const data = await payload.find({
        collection: "categories",
        depth: 1, // Populate subcategories
        pagination: false,
        where: {
            parent: {
                exists: false,
            },
        },
    });

    const formatedData = data.docs.map((doc) => {
        return {
            ...doc,
            subCategories: (doc.subCategories?.docs ?? []).map((doc) => {
                // Because of the type inference issue
                return doc as Category;
            }),
        };
    });

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <SearchFilters data={formatedData} />
            <div className="flex-1 bg-[#F4F4F0]">
                {children}
            </div>
            <Footer />
        </div>
    );
};

export default Layout;
