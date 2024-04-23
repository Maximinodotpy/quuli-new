import { json } from "@sveltejs/kit";
import { db } from "$lib/db";

export async function POST(event) {
    // Check if the user is logged in
    const auth = await event.locals.auth();

    if (!auth) {
        return json({ error: "Not logged in" }, { status: 401 });
    }

    console.log('Setting question category ...');

    const data = await event.request.formData();
    const question_id = String(data.get("question_id"));
    const new_catgory_id = String(data.get("new_category_id"));

    console.log('Question ID:', question_id);
    console.log('New category ID:', new_catgory_id);

    // Set question category if this user is the creator of the question
    const question = await db.question.findFirst({
        where: {
            id: question_id,
            createdById: auth.user?.id
        }
    });

    if (!question) {
        return json({ error: "Question not found" }, { status: 404 });
    }

    // Update the question
    const new_question = await db.question.update({
        where: {
            id: question_id
        },
        data: {
            categoryId: new_catgory_id
        },
        include: {
            category: true
        }
    });

    return json(new_question);
}