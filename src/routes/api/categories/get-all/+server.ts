import { json } from "@sveltejs/kit";
import { getCategories } from "$lib/helpers.js";

export async function POST(event) {
    const categories = await getCategories();

    return json(categories)
}