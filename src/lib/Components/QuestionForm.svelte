<script lang="ts">
    import { Alert, Heading, Input, Label, Button, Select, P } from "flowbite-svelte";
    import { QUESTION_MIN_LENGTH, QUESTION_MAX_LENGTH, ANSWER_MAX_LENGTH } from "$lib/const";
    import { enhance } from "$app/forms";
    import type { Category, Question } from "@prisma/client";
    import { hasDuplicates, isAValidAnswer } from "$lib/helpers";
    import { getCategories } from "$lib/helpers";
    import { onMount } from "svelte";
    import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

    export let q_info: Question = {
        id: '',
        question: '',
        answer: '',
        wrongAnswer1: '',
        wrongAnswer2: '',
        wrongAnswer3: '',
        categoryId: '',
        createdById: '',
        createdAt: new Date(),
        updatedAt: new Date(),
        status: 'NORMAL',
    };
    export let is_disabled: boolean = false;
    export let form_action: string = '/fragen/vorschlagen?/add_question';
    export let categories: Category[] = [];

    onMount(async () => {
        categories = await getCategories();
    });

    export let categoriesEnabled: boolean = true;

    export let questionnaire: null | string = ''
    
    let warnings: Array<string> = []
    let errors: Array<string> = []

    $: {
        warnings = []
        errors = []

        if (q_info.question.length < QUESTION_MIN_LENGTH && q_info.question != '') {
            errors.push(`Die Frage muss mindestens ${QUESTION_MIN_LENGTH} Zeichen lang sein.`)
        }

        if (q_info.question.length > QUESTION_MAX_LENGTH) {
            errors.push(`Die Frage darf maximal ${QUESTION_MAX_LENGTH} Zeichen lang sein.`)
        }

        // Check if any of the answers is longer than the max
        if (q_info.answer.length > ANSWER_MAX_LENGTH ||
            q_info.wrongAnswer1.length > ANSWER_MAX_LENGTH ||
            (q_info.wrongAnswer2?.length || 0) > ANSWER_MAX_LENGTH ||
            (q_info.wrongAnswer3?.length || 0) > ANSWER_MAX_LENGTH
        ) {
            errors.push(`Die Antworten dürfen maximal ${ANSWER_MAX_LENGTH} Zeiche lang sein.`)
        }
    
        if (q_info.question.length > QUESTION_MIN_LENGTH && q_info.question[q_info.question.length - 1] != "?") {
            warnings.push('Vergiss nicht ein Fragezeichen am Ende der Frage zu setzen, falls es bei dieser Frage Sinn macht.')
        }

        // Check if the question ends with multiple dots
        if (q_info.question.length > QUESTION_MIN_LENGTH && q_info.question.endsWith('...')) {
            // Check if all the answers end with 3 dots
            if (
                !q_info.answer.endsWith('...') && q_info.answer.length > 0 ||
                !q_info.wrongAnswer1.endsWith('...') && q_info.wrongAnswer1.length > 0 ||
                !q_info.wrongAnswer2.endsWith('...') && q_info.wrongAnswer2.length > 0 ||
                !q_info.wrongAnswer3.endsWith('...') && q_info.wrongAnswer3.length > 0
            ) {
                warnings.push('Die Frage endet mit drei Punkten. Vielleicht macht es Sinn, dass auch die Antworten mit drei Punkten beginnen.')
            }
        }
    
        if (hasDuplicates([q_info.wrongAnswer1, q_info.wrongAnswer2, q_info.wrongAnswer3, q_info.answer, q_info.question])) {
            errors.push('Die Antworten und die Frage dürfen nicht gleich sein.')
        }
    }
</script>

<form method="post" use:enhance={({ action }) => {
    dispatch('started_submit', {});

    return async ({ update }) => {
        console.log('submitting');
        
        await update();
        dispatch('submit', {});
    }
}} action="{form_action}">
    <fieldset disabled={is_disabled} class="flex flex-col gap-10">
        <div class="grid md:grid-cols-2 gap-4">
            <div>
                <Label for="frage" class="mb-2 text-xl">Frage <sup class="opacity-50">{q_info.question.length}</sup></Label>
                <Input name="frage" id="frage" type="text" required bind:value={q_info.question}/>
            </div>
            <div>
                <Label for="antwort" class="mb-2 text-xl">Antwort <sup class="opacity-50">{q_info.answer.length}</sup></Label>
                <Input name="antwort" id="antwort" type="text" required bind:value={q_info.answer} />
            </div>
        </div>

        <div>
            <div class="grid md:grid-cols-3 gap-4">
                <fieldset>
                    <Label for="falsch1" class="mb-2 text-xl">Falsche Antwort 1 <sup class="opacity-50">{q_info.wrongAnswer1.length}</sup></Label>
                    <Input name="falsch1" id="falsch1" type="text" bind:value={q_info.wrongAnswer1} required />
                </fieldset>

                <fieldset disabled={isAValidAnswer(q_info.wrongAnswer1)} class="disabled:opacity-50">
                    <Label for="falsch2" class="mb-2 text-xl">Falsche Antwort 2 <sup class="opacity-50">{q_info.wrongAnswer2.length}</sup></Label>
                    <Input name="falsch2" id="falsch2" type="text" bind:value={q_info.wrongAnswer2} required={!isAValidAnswer(q_info.wrongAnswer3 ?? '')} />
                </fieldset>
                <fieldset disabled={isAValidAnswer(q_info.wrongAnswer2 ?? '')} class="disabled:opacity-50">
                    <Label for="falsch3" class="mb-2 text-xl">Falsche Antwort 3 <sup class="opacity-50">{q_info.wrongAnswer3.length}</sup></Label>
                    <Input name="falsch3" id="falsch3" type="text" bind:value={q_info.wrongAnswer3}  />
                </fieldset>
            </div>
        </div>

        {#if categoriesEnabled}
            <div class="grid md:grid-cols-2 gap-4">
                <Label for="category" class="mb-2 text-xl">Kategorie</Label>
                <Select name="category" id="category" required value={q_info.categoryId}>
                    {#each categories as cat}
                        <option value={cat.id}>{cat.name}</option>
                    {/each}
                </Select>
            </div>
        {/if}

        <!-- If questionnaire is set create a disabled input that shows the id -->
        {#if questionnaire}
            <div class="opacity-50">
                <Label for="questionnaire" class="mb-2 text-xl">Fragebogen</Label>
                <Input name="questionnaire" id="questionnaire" type="text" value={questionnaire} class="pointer-events-none" />
            </div>
        {/if}

        <div>
            <div class="mb-4">
                {#each errors as error}
                    <Alert class="col-span-3 border-2 mb-2" type="error">{error}</Alert>
                {/each}
            </div>
            
            <div>
                {#each warnings as warning}
                    <Alert class="col-span-3 border-2 mb-2" color="blue">{warning}</Alert>
                {/each}
            </div>
        </div>

        <div class="mt-8">
            <Button type="submit" disabled={errors.length != 0}>Einreichen</Button>
        </div>
    </fieldset>
</form>