import { db } from '$lib/db.js';
import type { Questionnaire } from '@prisma/client';
import type { PageServerLoad } from './$types.js';
import { redirect } from "@sveltejs/kit";
import type { Actions } from "./$types";
import type { QuestionnaireVisibility } from "@prisma/client";

export const load: PageServerLoad = async ({ params }) => {
    const questionnaireId = params.id;

    console.log('Loading questionnaire with id', questionnaireId, '...');

    const questionnaire = await db.questionnaire.findUnique({
        where: {
            id: questionnaireId
        },
        include: {
            members: true,
            editors: true,
        }
    }) as Questionnaire;

    return {
        questionnaire
    }
}

export const actions: Actions = {
    edit_questionnaire: async ({locals, request, params}) => {
        // Check if the user is logged in
        const auth = await locals.auth()

        if (!auth) {
            redirect(308, "/login")
        }

        const data = await request.formData()

        const name = String(data.get("name"))
        const description = String(data.get("description"))
        const visibility = String(data.get("visibility")) as QuestionnaireVisibility
        const editors = String(data.get("editors")).split(",")
        const members = String(data.get("members")).split(",")
        const image = String(data.get("image"))

        console.log('Creating questionnaire with name', name, '...');
        console.log('Description:', description);
        console.log('Visibility:', visibility);
        console.log('Editors:', editors);
        console.log('Members:', members);
        console.log('Image:', image);

        // Update the question
        const questionnaire = await db.questionnaire.update({
            where: {
                id: params.id
            },
            data: {
                name,
                description,
                visibility,
                image,
            },
            include: {
                members: true,
                editors: true,
            }
        })

        // Remove all editors and members
        await db.questionnaire.update({
            where: {
                id: params.id
            },
            data: {
                editors: {
                    disconnect: questionnaire.editors.map((editor) => {
                        return {
                            id: editor.id
                        }
                    })
                },
                members: {
                    disconnect: questionnaire.members.map((member) => {
                        return {
                            id: member.id
                        }
                    })
                }
            }
        })

        // Add the new editors if there are any
        if (editors.length > 0 && editors[0] !== "") {
            await db.questionnaire.update({
                where: {
                    id: params.id
                },
                data: {
                    editors: {
                        connect: editors.map((editor) => {
                            return {
                                id: editor
                            }
                        })
                    }
                }
            })
        }

        // Add the new members if there are any
        if (members.length > 0 && members[0] !== "") {
            await db.questionnaire.update({
                where: {
                    id: params.id
                },
                data: {
                    members: {
                        connect: members.map((member) => {
                            return {
                                id: member
                            }
                        })
                    }
                }
            })
        }

        redirect(303, "/fragebogen/" + params.id)
    }
}