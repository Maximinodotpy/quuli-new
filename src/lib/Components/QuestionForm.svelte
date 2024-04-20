<script lang="ts">
    import { Alert, Heading, Input, Label, Button, Select, P } from "flowbite-svelte";
    import { AMOUNT_OF_ANSWERED_QUESTIONS_BEFORE_PROPOSALS, QUESTION_MIN_LENGTH } from "$lib/const";
    import { enhance } from "$app/forms";
    import type { Category, Question } from "@prisma/client";
    import { hasDuplicates, isAValidAnswer } from "$lib/helpers";

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
    };
    export let is_disabled: boolean = false;
    export let form_action: string = '';
    export let categories: Category[] = [];
</script>

<form method="post" use:enhance action="?/{form_action}">
    <fieldset disabled={is_disabled} class="flex flex-col gap-10">
        <div class="grid md:grid-cols-2 gap-4">
            <div>
                <Label for="frage" class="mb-2 text-xl">Frage</Label>
                <Input name="frage" id="frage" type="text" required bind:value={q_info.question}/>
            </div>
            <div>
                <Label for="antwort" class="mb-2 text-xl">Antwort</Label>
                <Input name="antwort" id="antwort" type="text" required bind:value={q_info.answer} />
            </div>
        </div>

        <div>
            <div class="grid md:grid-cols-3 gap-4">
                <fieldset>
                    <Label for="falsch1" class="mb-2 text-xl">Falsche Antwort 1</Label>
                    <Input name="falsch1" id="falsch1" type="text" bind:value={q_info.wrongAnswer1} required />
                </fieldset>

                <fieldset disabled={isAValidAnswer(q_info.wrongAnswer1)} class="disabled:opacity-50">
                    <Label for="falsch2" class="mb-2 text-xl">Falsche Antwort 2</Label>
                    <Input name="falsch2" id="falsch2" type="text" bind:value={q_info.wrongAnswer2} required={!isAValidAnswer(q_info.wrongAnswer3 ?? '')} />
                </fieldset>
                <fieldset disabled={isAValidAnswer(q_info.wrongAnswer2 ?? '')} class="disabled:opacity-50">
                    <Label for="falsch3" class="mb-2 text-xl">Falsche Antwort 3</Label>
                    <Input name="falsch3" id="falsch3" type="text" bind:value={q_info.wrongAnswer3}  />
                </fieldset>

                <!-- Check if any of the answers are the same -->
                {#if hasDuplicates([q_info.wrongAnswer1, q_info.wrongAnswer2, q_info.wrongAnswer3, q_info.answer, q_info.question])}
                    <Alert class="col-span-3 border-2" type="error">Die Antworten und die Frage dürfen nicht gleich sein.</Alert>
                {/if}

                <!-- Check if the question is atleast 10 Characters -->
                {#if q_info.question.length < QUESTION_MIN_LENGTH && q_info.question != ''}
                    <Alert class="col-span-3 border-2" type="error">Die Frage muss mindestens { QUESTION_MIN_LENGTH } Zeichen lang sein.</Alert>
                {/if}

                <!-- Ask the user if he forgot to add a question mark after the question -->
                {#if q_info.question.length > QUESTION_MIN_LENGTH && q_info.question[q_info.question.length - 1] != "?"}
                    <Alert class="col-span-3 border-2" color="blue">Vergiss nicht ein Fragezeichen am Ende der Frage zu setzen, falls es bei dieser Frage Sinn macht.</Alert>
                {/if}
            </div>
        </div>

        <div class="grid grid-cols-2 gap-4">
            <div>
                <Label for="category" class="mb-2 text-xl">Kategorie</Label>
                <Select name="category" id="category" required value={q_info.categoryId}>
                    {#each categories as cat}
                        <option value={cat.id}>{cat.name}</option>
                    {/each}
                </Select>
            </div>
        </div>

        <div class="mt-8">
            <Button type="submit">Einreichen</Button>
        </div>
    </fieldset>
</form>