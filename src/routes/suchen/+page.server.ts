import type { PageServerData } from "./$types"
import { db } from "$lib/db";

export const load: PageServerData = async ({ request }) => {
    const params = new URLSearchParams(request.url.split('?')[1]);
    
    const nach = params.get('nach');

    if (!nach) {
        return {
            questionnaires: [],
            users: [],
        }
    }

    // Search for public questionnaires
    const questionnaires = await db.questionnaire.findMany({
        where: {
            name: {
                contains: nach ?? ''
            },
            visibility: 'PUBLIC'
        }
    });

    const users = await db.user.findMany({
        where: {
            name: {
                contains: nach ?? ''
            },
        }
    });

    return {
        questionnaires,
        users,
    }
}