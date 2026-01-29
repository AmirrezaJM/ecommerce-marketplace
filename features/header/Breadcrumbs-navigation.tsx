import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import Link from "next/link";

interface Props {
    activeCategoryName?: string | null;
    activeCategory?: string | null;
    activeSubcategoryName?: string | null;
}

const BreacrumbNavigation = ({ activeCategoryName, activeCategory, activeSubcategoryName }: Props) => {
    if (!activeCategoryName || activeCategory === "all") return null;
    
    return (
        <Breadcrumb>
            <BreadcrumbList>
                {activeSubcategoryName ? (
                    <>
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild className="text-lg font-medium underline text-primary">
                                <Link href={`/${activeCategory}`}>{activeCategory}</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator className="text-primary font-medium text-lg">
                            /
                        </BreadcrumbSeparator>
                        <BreadcrumbItem>
                            <BreadcrumbPage className="text-lg font-medium">{activeSubcategoryName}</BreadcrumbPage>
                        </BreadcrumbItem>

                    </>
                ) : (
                    <>
                        <BreadcrumbItem>
                            <BreadcrumbPage className="text-lg font-medium">{activeCategoryName}</BreadcrumbPage>
                        </BreadcrumbItem>
                    </>
                )}
            </BreadcrumbList>
        </Breadcrumb>
    )
}

export default BreacrumbNavigation;