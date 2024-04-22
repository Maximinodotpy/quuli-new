import type { PageServerLoad } from "./$types";
import { redirect } from "@sveltejs/kit";
import { db } from "$lib/db";

export const load: PageServerLoad = async ({ locals }) => {
    const auth = await locals.auth()

    if (!auth) {
        redirect(308, "/")
    }

    // Get all questions this user has created
    const questions = await db.question.findMany({
        where: {
            createdById: auth.user?.id
        }
    })
    
    // Get categories and sort them alphabetically
    const categories = await db.category.findMany({
        orderBy: {
            name: "asc"
        }
    })

    return {
        questions,
        categories
    }
};