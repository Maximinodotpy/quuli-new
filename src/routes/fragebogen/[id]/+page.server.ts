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
            questions: {
                include: {
                    responses: true
                },
            },
        }
    }) as Questionnaire;

    // Count the number of responses for all questions
    questionnaire.questions = questionnaire.questions.map(question => {
        question.responseCount = question.responses.length;
        return question;
    });

    // Count the number of responses for the questionnaire
    questionnaire.responseCount = questionnaire.questions.reduce((acc, question) => acc + question.responseCount, 0);

    return {
        questionnaire
    }
}