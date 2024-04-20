import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { db } from '../../../../db';

export const load: PageServerLoad = async ({ route, locals, params }) => {
    console.log('Delete question', params);

    const auth = await locals.auth();

    // Check if current user is allowed to delete this question
    if (!auth?.user) {
        return {
            status: 401,
            redirect: '/login'
        };
    }

    // Load the question
    const succ = await db.question.update({
        where: {
            id: params.id,
            createdById: auth.user.id
        },
        data: {
            status: 'DELETED',
        }
    });

    console.log('Deleted question', succ);
    
    redirect(307, '/profil')
}