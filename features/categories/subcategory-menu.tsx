import { Category } from "@/payload-types";
import Link from "next/link";

interface SubcategoryMenuProps {
    category: Category;
    isOpen: boolean;
    position: { top: number; left: number };
}

const SubcategoryMenu = ({ category, isOpen, position }: SubcategoryMenuProps) => {
    if (!isOpen || !category.subCategories || category.subCategories.length === 0) return null;
    const backgroundColor = category.color || "#f5f5f5";
    return (
        <div className="fixed z-50" style={{ top: position.top, left: position.left }}>
            <div className="h-3 w-60" />
            <div className="w-60 text-black rounded-md overflow-hidden border shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] -translate-x-[2px] -translate-y-[2px]" style={{ backgroundColor }}>
                <div>
                    {category.subCategories.map((subCategory: Category) => (
                        <Link href={`/${category.slug}/${subCategory.slug}`} className="w-full text-start p-4 hover:bg-black hover:text-white flex justify-between items-center underline font-medium" key={subCategory.id}>
                            <p>{subCategory.name}</p>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};


export default SubcategoryMenu;