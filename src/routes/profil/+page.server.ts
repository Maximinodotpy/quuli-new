import type { Question } from "@prisma/client";
import { db } from "../../db";
import type { PageServerLoad } from "./$types";
import { error, redirect } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ locals }) => {
    const auth = await locals.auth()

    if (!auth) {
        redirect(308, "/")
    }

    const submitted_questions: Question[] = (await db.question.findMany({
        where: {
            createdById: auth.user?.id
        } 
    })) ?? []
    
    return {
        submitted_questions: submitted_questions
    }
}