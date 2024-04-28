import { redirect } from "@sveltejs/kit";
import type { Actions } from "./$types";
import { db } from "$lib/db";
import type { Question, QuestionnaireVisibility } from "@prisma/client";

export const actions: Actions = {
    create_questionnaire: async ({locals, request}) => {
        // Check if the user is logged in
        const auth = await locals.auth()

        if (!auth) {
            redirect(308, "/login")
        }

        const data = await request.formData()

        const name = String(data.get("name"))
        const description = String(data.get("description"))
        const visibility = String(data.get("visibility")) as QuestionnaireVisibility
        let editors = String(data.get("editors")).split(",")
        let members = String(data.get("members")).split(",")

        // Remove empty strings
        editors = editors.filter(Boolean)
        members = members.filter(Boolean)

        console.log('Creating questionnaire with name', name, '...');
        console.log('Description:', description);
        console.log('Visibility:', visibility);
        console.log('Editors:', editors);
        console.log('Members:', members);

        // Create the questionnaire
        const questionnaire = await db.questionnaire.create({
            data: {
                name,
                description,
                visibility,
                createdById: auth.user?.id ?? '',
                members: {
                    connect: members.map(id => ({ id }))
                },
                editors: {
                    connect: editors.map(id => ({ id }))
                }
            }
        })

        console.log('Created questionnaire with id', questionnaire.id);

        redirect(303, "/fragebogen/" + questionnaire.id)
    }
}