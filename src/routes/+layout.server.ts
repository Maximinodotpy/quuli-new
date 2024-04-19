import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async (event) => {
    let session = await event.locals.auth();

    // add user id
    if (session) {
        session.user = {
            ...session.user,
        };
    }

    return {
        session
    };
};