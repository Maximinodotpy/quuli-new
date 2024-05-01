import type { PageServerData } from "./$types"
import { db } from "$lib/db"
import { AMOUNT_OF_RANKED_USERS_SHOWN } from "$lib/const"

export const load: PageServerData = async ({}) => {
    // Get Players with most submitted questions
    const ranked_submitted_questions = await db.user.findMany({
        take: AMOUNT_OF_RANKED_USERS_SHOWN,
        orderBy: {
            Questions: {
                _count: "desc",
            }
        },
        include: {
            Questions: {
                where: {
                    status: "NORMAL",
                    questionnaireId: null
                }
            }
        }
    })

    // Get Players with most correct answers
    const ranked_correct_answers = await db.user.findMany({
        take: AMOUNT_OF_RANKED_USERS_SHOWN,
        orderBy: {
            Responses: {
                _count: "desc",
            }
        },
        include: {
            Responses: {
                where: {
                    response: 0
                }
            }
        }
    })

    // Get Players with most correct answers on average
    /* const ranked_correct_answers_average = await db.user.findMany({
        _
    }) */

    return {
        ranked_submitted_questions,
        ranked_correct_answers,
    }
}