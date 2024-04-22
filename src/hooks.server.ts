import { db } from "./lib/db";

export { handle } from "./auth"


const categories = [
    { name: "Geschichte" },
    { name: "Wissenschafft" },
    { name: "Sport" },
    { name: "Politik" },
    { name: "Unterhaltung" },
    { name: "Kunst" },
    { name: "Technik" },
    { name: "Literatur" },
    { name: "Geographie" },
    { name: "Sonstiges" },
];

// Add these categories to the db only if they are not already there
categories.forEach(async (category) => {
    try {
        const existingCategory = await db.category.findUnique({
            where: { name: category.name }
        });

        if (!existingCategory) {
            await db.category.create({
                data: category
            });
        }
    } catch (error) {
        console.error(error);
    }
});