import type { Question } from "@prisma/client";
import { db } from "$lib/db";
import type { Actions, PageServerLoad } from "./$types";
import { error, redirect } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ locals }) => {
    const auth = await locals.auth()

    if (!auth) {
        redirect(308, "/")
    }

    // Get responses for this user
    const responses = await db.questionResponse.findMany({
        include: {
            question: true
        },
        where: {
            userId: auth.user?.id
        },
        take: 10,
    })

    // Get right answers from db
    const right_answers = await db.questionResponse.count({
        where: {
            response: 0,
            userId: auth.user?.id,
        }
    })

    // Total answers
    const total_answers = await db.questionResponse.count({
        where: {
            userId: auth.user?.id
        }
    })
    
    return {
        responses: responses,
        right_answers: right_answers,
        total_answers: total_answers,
    }
}