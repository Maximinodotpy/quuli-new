import type { Question } from "@prisma/client";
import { db } from "../../db";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals }) => {
    const auth = await locals.auth()

    if (!auth) {
        return {
            status: 401,
            message: 'Not logged in'
        }
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