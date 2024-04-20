import type { Question } from "@prisma/client";
import { db } from "$lib/db";
import type { Actions, PageServerLoad } from "./$types";
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

    // Get connected accounts from db to show oauth providers
    const connected_accounts = await db.account.findMany({
        where: {
            userId: auth.user?.id
        }
    })
    
    return {
        submitted_questions: submitted_questions,
        responses: responses,
        right_answers: right_answers,
        total_answers: total_answers,
        connected_accounts: connected_accounts
    }
}


export const actions: Actions = {
    edit_user: async ({ request, locals }) => {
        console.log('Editing user...');
        

        // getting the form data
        const data = await request.formData()

        const new_username = String(data.get('username')).trim()


        // Getting the user id
        const userId = (await locals.auth())?.user?.id

        // Updating the user
        const succ = await db.user.update({
            where: {
                id: userId
            },
            data: {
                name: new_username
            }
        })
        

        return {
            success: true
        }
    }
}