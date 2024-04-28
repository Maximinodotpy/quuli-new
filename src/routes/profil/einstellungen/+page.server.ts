import type { Actions } from "./$types";
import { db } from "$lib/db";

export const actions: Actions = {
    edit_user: async ({ request, locals }) => {
        console.log('Editing user...');
        

        // getting the form data
        const data = await request.formData()

        const new_username = String(data.get('username')).trim()
        const image = String(data.get('image')).trim()

        // Getting the user id
        const userId = (await locals.auth())?.user?.id

        // Updating the user
        const succ = await db.user.update({
            where: {
                id: userId
            },
            data: {
                name: new_username,
                image: image,
            }
        })
        

        return {
            success: true
        }
    }
}