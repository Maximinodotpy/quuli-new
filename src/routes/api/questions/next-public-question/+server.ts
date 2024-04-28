import { json } from "@sveltejs/kit";
import { db } from "$lib/db";
import { RECENT_QUESTIONS_COOKIE_KEY } from "$lib/const.js";
import { getAmountOfPublicQuestions, getAllPublicQuestions, type GetQuestionsOptions } from "$lib/helpers.js";

export async function POST(event) {
    console.log('Requesting next public question ...');
    
    const data = await event.request.formData();
    const last_question_id = String(data.get("last_question_id"));
    console.log('Last question ID:', last_question_id);

    const category_ids = String(data.get("category_ids")).split(",");
    console.log('Category IDs:', category_ids);

    let questionnaire_id: string | null = String(data.get("questionnaire_id") ?? '');
    questionnaire_id = questionnaire_id === 'undefined' ? null : questionnaire_id;
    console.log('Questionnaire ID:', questionnaire_id);

    // Manage recent questions
    const recent_questions = event.cookies.get(RECENT_QUESTIONS_COOKIE_KEY) ?? '';
    
    let GetQuestionsOptions: GetQuestionsOptions = {
        idExceptions: [],
        categories: category_ids,
        questionnaireId: questionnaire_id
    };

    GetQuestionsOptions.idExceptions = recent_questions.split(",");

    if (GetQuestionsOptions.idExceptions.includes(last_question_id)) {
        console.log("Question already answered");
    } else {
        GetQuestionsOptions.idExceptions.push(last_question_id);

        GetQuestionsOptions.idExceptions = GetQuestionsOptions.idExceptions;

        // Get amount of questions in the datebase
        const amount_of_questions_in_db = await getAmountOfPublicQuestions(GetQuestionsOptions);
        console.log("Amount of Public Questions: ", amount_of_questions_in_db);

        // In case this is a questionnaire, we need to get all questions from the questionnaire but if its a category we want it to loop
        if (questionnaire_id) {
            GetQuestionsOptions.idExceptions = GetQuestionsOptions.idExceptions.slice(-(amount_of_questions_in_db-1));
        } else {
            GetQuestionsOptions.idExceptions = GetQuestionsOptions.idExceptions.slice(-(amount_of_questions_in_db/2));
        }
    }

    console.log("New Array", GetQuestionsOptions.idExceptions);

    event.cookies.set(RECENT_QUESTIONS_COOKIE_KEY, GetQuestionsOptions.idExceptions.join(','), {
        httpOnly: true,
        path: "/",
        maxAge: 60 * 10
    });
    
    // Get all NORMAL questions that are not in the recent questions array
    const questions = await getAllPublicQuestions(GetQuestionsOptions);

    console.log('Amount of questions:', questions.length);
    

    // Get random question
    const question = questions[Math.floor(Math.random() * questions.length)];

    console.log('Next public question:', question);
    
    return json({
        question,
        questions_left: questions.length,
    });
}