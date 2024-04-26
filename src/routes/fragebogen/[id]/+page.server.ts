import { db } from '$lib/db.js';
import type { Questionnaire } from '@prisma/client';
import type { PageServerLoad } from './$types.js';

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
            createdBy: true,
            questions: true,
        }
    }) as Questionnaire;

    return {
        questionnaire
    }
}