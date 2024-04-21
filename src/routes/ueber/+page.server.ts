import { db } from "$lib/db";
import type { QuestionResponse, User } from "@prisma/client";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ request }) => {
    console.log("load function");

    const amount_of_questions_in_db = await db.question.count();
    const amount_of_users_in_db = await db.user.count();
    const amount_responses_in_db = await db.questionResponse.count();
    const last_registered_user: User = await db.user.findFirst({
        orderBy: {
            createdAt: "desc"
        },
        take: 1
    }) as User;
    // Get last response
    const last_response: QuestionResponse = await db.questionResponse.findFirst({
        orderBy: {
            createdAt: "desc"
        },
        take: 1
    }) as QuestionResponse;

    return {
        amount_of_questions_in_db,
        amount_of_users_in_db,
        amount_responses_in_db,
        last_registered_user,
        last_response
    }
};