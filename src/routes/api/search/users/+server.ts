import { json } from "@sveltejs/kit";
import { db } from "$lib/db.js";

export async function POST(event) {
    const data = await event.request.formData();

    const query = String(data.get("query"));

    console.log('Searching for users with name containing', query, '...');
    

    const users = await db.user.findMany({
        where: {
            name: {
                contains: query
            }
        },
        take: 10
    });

    console.log('Found', users.length, 'users');

    return json({ users });
}