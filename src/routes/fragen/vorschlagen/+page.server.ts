import { db } from "../../../db"
import type { PageServerLoad } from "./$types"
import type { Category } from "@prisma/client"
import type { Actions } from "./$types"
import { page } from "$app/stores"
import { redirect } from "@sveltejs/kit"

export const load: PageServerLoad = async () => {
    const categories: Category[] = await db.category.findMany() ?? []

    return {
        categories: categories
    }
}


export const actions: Actions = {
    default: async ({ request, locals }) => {
        // Check if the user is logged in
        const auth = await locals.auth()
        if (!auth) {
            return {
                status: 401,
                message: 'Not logged in'
            }
        }

        console.log('Adding question to database');
        console.log(`User ID: ${auth.user?.id}`);
        console.log(auth.user);
        
        const data = await request.formData()

        console.log(data);

        let frage = String(data.get('frage')) ?? ''
        let antwort = String(data.get('antwort')) ?? ''
        
        let falsch1 = String(data.get('falsch1') || '')
        let falsch2 = String(data.get('falsch2') || '')
        let falsch3 = String(data.get('falsch3') || '')

        const category = String(data.get('category')) ?? ''

        // Trim all the strings
        frage = frage.trim()
        antwort = antwort.trim()
        falsch1 = falsch1.trim()
        falsch2 = falsch2.trim()
        falsch3 = falsch3.trim()

        // Print alle values
        console.log(frage);
        console.log(antwort);
        console.log(falsch1);
        console.log(falsch2);
        console.log(falsch3);
        console.log(category);

        // Check if there is a question
        if (!frage) {
            return {
                success: false,
                message: 'Keine Frage eingegeben'
            }
        }

        // Check if there is an answer
        if (!antwort) {
            return {
                success: false,
                message: 'Keine Antwort eingegeben'
            }
        }

        // Check if there is at least one wrong answer
        if (!falsch1 && !falsch2 && !falsch3) {
            return {
                success: false,
                message: 'Keine falsche Antwort eingegeben'
            }
        }

        // Add this to the database
        await db.question.create({
            data: {
                question: frage,
                answer: antwort,
                wrongAnswer1: falsch1,
                wrongAnswer2: falsch2,
                wrongAnswer3: falsch3,
                categoryId: category,
                createdById: auth.user?.id ?? ''
            }
        })

        return {
            success: true
        }
    }
}