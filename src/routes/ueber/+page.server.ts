import { db } from "../../db";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ request }) => {
    console.log("load function");

    const amount_of_questions_in_db = await db.question.count();
    const amount_of_users_in_db = await db.user.count();
    const amount_responses_in_db = await db.questionResponse.count();

    return {
        amount_of_questions_in_db,
        amount_of_users_in_db,
        amount_responses_in_db
    }
};