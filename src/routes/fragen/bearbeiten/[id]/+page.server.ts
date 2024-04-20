import type { PageServerLoad } from "./$types";
import { db } from "../../../../db";

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

    return {
        question
    }
}