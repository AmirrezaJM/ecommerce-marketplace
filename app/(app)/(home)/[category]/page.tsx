interface Props {
    params: Promise<{ category: string }>
}
export default async function CategoryPage({ params }: Props) {
    const { category } = await params;

    return (
        <div>
            <h1>Category:{category}</h1>
        </div>
    );
}
