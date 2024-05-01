import { json } from "@sveltejs/kit";
import { db } from "$lib/db";
import { getAllPublicQuestions } from "$lib/helpers.js";

export async function POST(event) {
    
    const data = await event.request.formData();

    const exceptions = String(data.get("exceptions") ?? '')?.split(",") ?? [];
    const categories = String(data.get("categories") ?? '')?.split(",") ?? [];
    const questionnaireId = data.get("questionnaireId") ?? null;
    const amount = Number(data.get("amount")) ?? 20;

    // Log this data
    console.log("exceptions", exceptions);
    console.log("categories", categories);
    console.log("questionnaireId", questionnaireId);
    console.log("amount", amount);

    const questions = await getAllPublicQuestions({ idExceptions: exceptions, categories: [], questionnaireId: null });

    // Get a random collection of questions
    const randomQuestions = [];
    while (randomQuestions.length < amount && questions.length > 0) {
        const index = Math.floor(Math.random() * questions.length);
        randomQuestions.push(questions.splice(index, 1)[0]);
    }

    return json({ questions: randomQuestions });
}