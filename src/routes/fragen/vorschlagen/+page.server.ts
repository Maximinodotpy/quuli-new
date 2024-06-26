import { db } from "$lib/db"
import type { PageServerLoad } from "./$types"
import type { Category } from "@prisma/client"
import type { Actions } from "./$types"

export const load: PageServerLoad = async ({ locals }) => {
    const categories: Category[] = await db.category.findMany({
        orderBy: {
            name: 'asc'
        }
    }) ?? []

    const auth = await locals.auth()

    let userAlreadyAnsweredAmount = 0

    if (auth) {
        userAlreadyAnsweredAmount = await db.questionResponse.count({
            where: {
                userId: auth.user?.id ?? ''
            }
        })
    }

    return {
        categories: categories,
        userAlreadyAnsweredAmount: userAlreadyAnsweredAmount
    }
}


export const actions: Actions = {
    add_question: async ({ request, locals }) => {
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
        const questionnaire_id = String(data.get('questionnaire')) ?? ''

        // Trim all the strings
        frage = frage.trim()
        antwort = antwort.trim()
        falsch1 = falsch1.trim()
        falsch2 = falsch2.trim()
        falsch3 = falsch3.trim()

        // Print alle values
        console.log('frage', frage);
        console.log('antwort', antwort);
        console.log('falsch1', falsch1);
        console.log('falsch2', falsch2);
        console.log('falsch3', falsch3);
        console.log('category', category);
        console.log('questionnaire_id', questionnaire_id);

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

        // Check if the question is atleast 10 characters long
        if (frage.length < 10) {
            return {
                success: false,
                message: 'Die Frage muss mindestens 10 Zeichen lang sein'
            }
        }

        console.log('All checks passed');

        // Add this to the database
        const new_question = await db.question.create({
            data: {
                question: frage,
                answer: antwort,
                wrongAnswer1: falsch1,
                wrongAnswer2: falsch2,
                wrongAnswer3: falsch3,
                createdById: auth.user?.id ?? ''
            }
        })

        console.log('Added question to database ... ', new_question.id);

        // Add the category to the question if it exists
        if (category != 'null' && category != '') {
            console.log('Adding category to question ... ', category);
            
            await db.question.update({
                where: {
                    id: new_question.id
                },
                data: {
                    categoryId: category
                }
            })

            console.log('Added category to question ... ', category);
        }

        // add it to the questionnaire
        if (questionnaire_id != 'null' && questionnaire_id != '') {
            console.log('Adding question to questionnaire ... ', questionnaire_id);

            await db.question.update({
                where: {
                    id: new_question.id
                },
                data: {
                    questionnaireId: questionnaire_id
                }
            })

            console.log('Added question to questionnaire ... ', questionnaire_id);
        }

        return {
            success: true
        }
    }
}