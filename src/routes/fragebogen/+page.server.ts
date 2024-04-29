import type { PageServerLoad } from "./$types";
import { db } from "$lib/db";

export const load: PageServerLoad = async ({  }) => {
    const questionnaires = await db.questionnaire.findMany({
        where: {
            visibility: "PUBLIC"
        }
    });

    return {
        questionnaires
    };
}
