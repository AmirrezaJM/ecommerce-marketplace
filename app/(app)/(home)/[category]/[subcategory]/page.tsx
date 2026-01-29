interface Props {
    params: Promise<{ category: string, subcategory: string }>
}
export default async function CategoryPage({ params }: Props) {
    const { category, subcategory } = await params;

    return (
        <div>
            <h1>Category:{category}</h1> <br />
            <h2>Subcategory:{subcategory}</h2>
        </div>
    );
}
