import { json } from "@sveltejs/kit";
import { getQuestionnaire } from "$lib/helpers.js";

export async function POST(event) {
    const data = await event.request.formData();

    const id = String(data.get('id')) ?? '';

    const categories = await getQuestionnaire(id);

    return json(categories)
}