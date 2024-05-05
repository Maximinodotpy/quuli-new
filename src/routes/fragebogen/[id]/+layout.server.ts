import type { LayoutServerLoad } from './$types';
import { isUserAllowedToEditQuestinnaire, isUserAllowedToSeeQuestinnaire } from '$lib/helpers';
import { redirect } from '@sveltejs/kit';

export const load: LayoutServerLoad = async (event) => {
    let session = await event.locals.auth();

    let isAllowedToSee = await isUserAllowedToSeeQuestinnaire(event.params.id, session?.user?.id ?? '');
    console.log('isAllowedToSee', isAllowedToSee);

    if (!isAllowedToSee) {
        redirect(302, '/login?notAllowedToSeeQuestionnaire=1');
    }

    return {
        isUserAllowedToEdit: await isUserAllowedToEditQuestinnaire(event.params.id, session?.user?.id ?? ''),
    };
};