import type { PageServerLoad } from "./$types";
import { db } from "../../../../db";
import type { Actions } from "../../vorschlagen/$types";
import { checkQuestionFormData } from "$lib/helpers";
import { redirect } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ route, locals, params }) => {
    console.log(route);
    console.log(route.id, params.id);
    

    const auth = await locals.auth();

    // Check if current user is allowed to edit this question
    if (!auth?.user) {
        return {
            status: 401,
            redirect: "/login"
        };
    }

    // Load the question
    const question = await db.question.findFirst({
        where: {
            id: params.id,
            createdById: auth.user.id,
        }
    })


    if (!question) {
        return {
            status: 404,
            redirect: "/fragen"
        };
    }

    // Auch noch die Kategorien laden
    const categories = await db.category.findMany({
        orderBy: {
            name: "asc"
        }
    });

    return {
        question,
        categories
    }
}


export const actions: Actions = {
    edit_question: async ({ request, params }) => {
        console.log('editing question', params);
        
        try {
            const data = await checkQuestionFormData(await request.formData());

            await db.question.update({
                where: {
                    id: params?.id || ''
                },
                data: data
            });

            console.log('Updated question', params.id);
        } catch (error) {
            console.log(error, 'error editing question');
            
            return {
                success: false,
                error: error
            };
        }

        redirect(307, "/profil");
        
        return {
            success: true,
        };
    }
}