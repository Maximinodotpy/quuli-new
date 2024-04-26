import type { Question } from "@prisma/client";
import { db } from "$lib/db";
import type { Actions, PageServerLoad } from "./$types";
import { error, redirect } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ locals, params }) => {
    const auth = await locals.auth()

    if (!auth) {
        return redirect(300, "/login")
    }

    // Get all questionnaires created by the user
    const questionnaires = await db.questionnaire.findMany({
        where: {
            createdById: auth.user?.id
        }
    })

    // Get all questionnaires where the user is added as a member
    const questionnairesMember = await db.questionnaire.findMany({
        where: {
            members: {
                some: {
                    id: auth.user?.id
                }
            }
        }
    })

    // Get all questionnaires where the user is added as an editor
    const questionnairesEditor = await db.questionnaire.findMany({
        where: {
            editors: {
                some: {
                    id: auth.user?.id
                }
            }
        }
    })
    
    return {
        questionnaires,
        questionnairesMember,
        questionnairesEditor, 
    }
}