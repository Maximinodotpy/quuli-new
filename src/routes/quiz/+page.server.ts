import type { Actions, PageServerLoad } from "./$types";
import { db } from "../../db";
import type { Question } from "@prisma/client";
import { redirect } from "@sveltejs/kit";


const RECENT_QUESTIONS = "recent_questions";


export const load: PageServerLoad = async ({ request, cookies }) => {
    console.log("load function");

    // Get recent questions from session
    const recent_questions = cookies.get(RECENT_QUESTIONS)?.split(",");
    console.log("recent_questions", recent_questions);

    const question: Question | null = await db.question.findFirst({
        where: {
            NOT: {
                id: { in: recent_questions || [] }
            }
        }
    });

    if (!question) {
        throw new Error("No question found");
    }

    return {
        question: question
    }
};


export const actions: Actions = {
    check_answer: async ({ request, locals }) => {
        console.log("check_answer action");

        const data = await request.formData();

        const question_id = String(data.get("question_id"));
        const answer = Number(data.get("answer"));

        const question_from_db = await db.question.findFirst({
            where: {
                id: question_id
            }
        });

        if (!question_from_db) {
            throw new Error("Question not found");
        }

        // Add response to the database
        const auth = await locals.auth();

        if (auth?.user) {
            await db.questionResponse.create({
                data: {
                    questionId: question_id,
                    userId: auth.user.id ?? '',
                    response: answer
                }
            })
        }

        if (answer == 0) {
            return {
                is_correct: true
            }
        } else {
            return {
                is_correct: false
            }
        }
    },

    next_question: async ({ request, cookies }) => {
        console.log("next_question action");

        // Add the question id to the session so the next load function wont include the same question
        const data = await request.formData();

        const question_id = String(data.get("question_id"));


        // get recent question id from session
        const recent_questions = cookies.get(RECENT_QUESTIONS);

        console.log(RECENT_QUESTIONS, recent_questions);

        if (recent_questions) {
            let recent_questions_array = recent_questions.split(",");

            if (recent_questions_array.includes(question_id)) {
                console.log("Question already answered");
            } else {

                recent_questions_array.push(question_id);

                // Get amount of questions in the datebase
                const amount_of_questions_in_db = await db.question.count();
                console.log("amount_of_questions_in_db", amount_of_questions_in_db);

                recent_questions_array = recent_questions_array.slice(-(amount_of_questions_in_db / 2));

                cookies.set(RECENT_QUESTIONS, recent_questions_array.join(','), {
                    httpOnly: true,
                    path: "/"
                });
            }
        } else {
            cookies.set(RECENT_QUESTIONS, question_id, {
                httpOnly: true,
                path: "/"
            });
        }
    }
}