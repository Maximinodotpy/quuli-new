import { db } from "$lib/db";
import type { Category } from "@prisma/client";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params }) => {
    const categories: Category[] = await db.category.findMany({
        orderBy: {
            name: "asc",
        },
        include: {
            Questions: {
                select: {
                    id: true,
                },
            },
        },
    });

    // Sort it so Sonstiges is always last
    categories.sort((a, b) => {
        if (a.name === "Sonstiges") {
            return 1;
        }
        if (b.name === "Sonstiges") {
            return -1;
        }
        return a.name.localeCompare(b.name);
    });

    return {
        categories,
    };
};