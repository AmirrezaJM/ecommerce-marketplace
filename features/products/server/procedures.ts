import { Category } from "@/payload-types";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { Where } from "payload";
import z from "zod";
export const productsRouter = createTRPCRouter({
    getMany: baseProcedure.input(
        z.object({
            category: z.string().nullable().optional(),
            minPrice: z.string().nullable().optional(),
            maxPrice: z.string().nullable().optional()
        }))
        .query(async ({ ctx, input }) => {
            const where: Where = {}

            if (input.minPrice && input.maxPrice) {
                where.price = {
                    greater_than_equal: Number(input.minPrice),
                    less_than_equal: Number(input.maxPrice),
                }
            } else if (input.minPrice) {
                where.price = {
                    greater_than_equal: Number(input.minPrice),
                }
            } else if (input.maxPrice) {
                where.price = {
                    less_than_equal: Number(input.maxPrice),
                }
            }

            if (input.category) {
                const categoriesData = await ctx.payload.find({
                    collection: "categories",
                    limit: 1,
                    depth: 0,
                    pagination: false,
                    where: {
                        slug: {
                            equals: input.category,
                        },
                    },
                });

                const formatedData = categoriesData.docs.map((doc) => ({
                    ...doc,
                    subcategories: (doc.subCategories?.docs ?? []).map((doc) => ({
                        ...(doc as Category),
                    }))
                }));

                const subCategoriesSlugs = [];
                const parentCategory = formatedData[0];

                if (parentCategory) {
                    subCategoriesSlugs.push(...parentCategory.subcategories.map((subCategories) => subCategories.slug));
                    where["category.slug"] = {
                        in: [parentCategory.slug, ...subCategoriesSlugs],
                    }
                }
            }

            const data = await ctx.payload.find({
                collection: "products",
                depth: 1, // populate category and images
                pagination: false,
                where,
            });

            return data;
        })
});