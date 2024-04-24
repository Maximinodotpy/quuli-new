import type { Question } from "@prisma/client";
import { db } from "$lib/db";
import type { Actions, PageServerLoad } from "./$types";
import { error, redirect } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ locals, params }) => {
    const auth = await locals.auth()

    console.log('Params: ', params.id);
    
    const userId = params.id;

    // Get responses for this user
    const responses = await db.questionResponse.findMany({
        include: {
            question: true
        },
        where: {
            userId: userId
        },
        take: 10,
    })

    // Get right answers from db
    const right_answers = await db.questionResponse.count({
        where: {
            response: 0,
            userId: userId,
        }
    })

    // Total answers
    const total_answers = await db.questionResponse.count({
        where: {
            userId: userId
        }
    })

    const user = await db.user.findUnique({
        where: {
            id: userId
        }
    })
    
    return {
        responses: responses,
        right_answers: right_answers,
        total_answers: total_answers,
        user: user,
    }
}