import type { Question, Questionnaire } from "@prisma/client";
import { db } from "$lib/db";
import type { Actions, PageServerLoad } from "./$types";
import { error, redirect } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ locals, params }) => {
    const auth = await locals.auth()

    console.log('Params: ', params.id);
    
    const userId = params.id;

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

    // Get proposed Questions that are public (status = NORMAL)
    const proposedQuestions = await db.question.findMany({
        where: {
            status: 'NORMAL',
            createdById: userId,
            questionnaireId: null,
        },
        include: {
            responses: true,
            category: true,
        }
    })

    // Get public questionnaires this user has created
    const questionnaires: Questionnaire[] = await db.questionnaire.findMany({
        where: {
            visibility: 'PUBLIC',
            createdById: userId,
        },
        include: {
            questions: true,
        }
    })

    
    return {
        right_answers,
        total_answers,
        user,
        proposedQuestions,
        questionnaires,
    }
}