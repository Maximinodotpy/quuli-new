import { json } from "@sveltejs/kit";
import { db } from "$lib/db";

export async function POST(event) {
    console.log('Setting question status ...');

    type QuestionStatus = "NORMAL" | "DELETED";

    const data = await event.request.formData();
    const question_id = String(data.get("question_id"));
    const status: QuestionStatus = String(data.get("status")) as QuestionStatus;

    console.log('Question ID:', question_id);
    console.log('Status:', status);

    const new_question = await db.question.update({
        where: {
            id: question_id
        },
        data: {
            status: status
        },
        include: {
            category: true
        }
    });

    return json(new_question);
}