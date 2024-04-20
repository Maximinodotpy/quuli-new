import { json } from "@sveltejs/kit";
import { db } from "../../../../db.js";
import { RECENT_QUESTIONS_COOKIE_KEY } from "$lib/const.js";
import type { Question } from "@prisma/client";
import { getAmountOfPublicQuestions } from "$lib/helpers.js";

export async function POST(event) {
    console.log('Requesting next public question ...');
    
    const data = await event.request.formData();
    const last_question_id = String(data.get("last_question_id"));
    console.log('Last question ID:', last_question_id);


    // Manage recent questions
    const recent_questions = event.cookies.get(RECENT_QUESTIONS_COOKIE_KEY) ?? '';
    let recent_questions_array: string[] = [];

    console.log('Old Array', recent_questions_array);
    
    recent_questions_array = recent_questions.split(",");

    if (recent_questions_array.includes(last_question_id)) {
        console.log("Question already answered");
    } else {
        recent_questions_array.push(last_question_id);

        // Get amount of questions in the datebase
        const amount_of_questions_in_db = await getAmountOfPublicQuestions();
        console.log("Amount of Public Questions: ", amount_of_questions_in_db);

        recent_questions_array = recent_questions_array.slice(-(amount_of_questions_in_db / 2));
    }

    console.log("New Array", recent_questions_array);

    event.cookies.set(RECENT_QUESTIONS_COOKIE_KEY, recent_questions_array.join(','), {
        httpOnly: true,
        path: "/",
        maxAge: 60 * 10
    });
    

    const questions: Question[] = await db.question.findMany({
        where: {
            NOT: {
                id: { in: recent_questions_array || [] }
            }
        }
    });

    // Get random question
    const question = questions[Math.floor(Math.random() * questions.length)];
    
    return json(question);
}