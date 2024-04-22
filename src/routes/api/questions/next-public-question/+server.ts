import { json } from "@sveltejs/kit";
import { db } from "$lib/db";
import { RECENT_QUESTIONS_COOKIE_KEY } from "$lib/const.js";
import { getAmountOfPublicQuestions, getAllPublicQuestions } from "$lib/helpers.js";

export async function POST(event) {
    console.log('Requesting next public question ...');
    
    const data = await event.request.formData();
    const last_question_id = String(data.get("last_question_id"));
    console.log('Last question ID:', last_question_id);

    const category_ids = String(data.get("category_ids")).split(",");
    console.log('Category IDs:', category_ids);

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

        /* recent_questions_array = recent_questions_array.slice(-(amount_of_questions_in_db / 2)); */
        recent_questions_array = recent_questions_array.slice(-2);
    }

    console.log("New Array", recent_questions_array);

    event.cookies.set(RECENT_QUESTIONS_COOKIE_KEY, recent_questions_array.join(','), {
        httpOnly: true,
        path: "/",
        maxAge: 60 * 10
    });
    
    // Get all NORMAL questions that are not in the recent questions array
    const questions = await getAllPublicQuestions({
        idExceptions: recent_questions_array,
        categories: category_ids
    });

    // Get random question
    const question = questions[Math.floor(Math.random() * questions.length)];
    
    return json(question);
}