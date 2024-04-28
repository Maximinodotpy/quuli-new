import type { LayoutServerLoad } from './$types';
import { isUserAllowedToEditQuestinnaire } from '$lib/helpers';

export const load: LayoutServerLoad = async (event) => {
    let session = await event.locals.auth();

    return {
        isUserAllowedToEdit: await isUserAllowedToEditQuestinnaire(event.params.id, session?.user?.id ?? ''),
    };
};