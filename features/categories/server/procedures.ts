import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { Category } from "@/payload-types";

export const categoriesRouter = createTRPCRouter({
    getMany: baseProcedure.query(async ({ctx}) => {
        const data = await ctx.payload.find({
            collection: "categories",
            depth: 1,
            pagination: false,
            where: {
                parent: {
                    exists: false,
                },
            },
            sort: "name"
        });

        const formatedData = data.docs.map((doc) => {
            return {
                ...doc,
                subCategories: (doc.subCategories?.docs ?? []).map((doc) => {
                    return doc as Category;
                }),
            };
        });

        return formatedData;
    })
});

// localhost:3000/favicon.ico
// localhost:3000/