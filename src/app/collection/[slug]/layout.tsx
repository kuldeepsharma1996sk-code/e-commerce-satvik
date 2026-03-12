import { products } from "@/data/products";

export function generateStaticParams() {
    return products.map((product) => ({
        slug: product.slug,
    }));
}

export default function ProductLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
