import { db } from "$lib/db";
import type { Category } from "@prisma/client";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params }) => {
    const categories: Category[] = await db.category.findMany({
        orderBy: {
            name: "asc",
        },
    });

    return {
        categories,
    };
};