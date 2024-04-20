import { json } from "@sveltejs/kit";
import { db } from "../../../../db.js";

export async function POST(event) {
    const auth = await event.locals.auth();

    const data = await event.request.formData();

    const question_id = String(data.get("question_id"));
    const answer = Number(data.get("answer"));

    console.log("question_id", question_id);
    console.log("answer", answer);
    console.log("auth", auth?.user?.id);
    
    if (auth?.user) {
        await db.questionResponse.create({
            data: {
                questionId: question_id,
                userId: auth.user.id ?? '',
                response: answer
            }
        })
    }

    return json({ success: true });
}