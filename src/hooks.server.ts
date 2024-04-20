import { db } from "./db";

export { handle } from "./auth"


/* const categories = [
    { name: "Geschichte" },
    { name: "Wissenschafft" },
    { name: "Sport" },
    { name: "Politik" },
    { name: "Unterhaltung" },
];

// Add these categories to the db only if they are not already there
categories.forEach(async (category) => {
    const existingCategory = await db.category.findUnique({
        where: { name: category.name }
    });

    if (!existingCategory) {
        await db.category.create({
            data: category
        });
    }
}); */