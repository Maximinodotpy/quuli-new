<script lang="ts">
    import { page } from "$app/stores";
    import { Alert, Heading, Input, Label, Button, Select, P } from "flowbite-svelte";
    import type { ActionData, PageData } from "./$types";
    import PageHeaderArea from "$lib/Components/PageHeaderArea.svelte";
    import { AMOUNT_OF_ANSWERED_QUESTIONS_BEFORE_PROPOSALS, QUESTION_MIN_LENGTH } from "$lib/const";
    import { enhance } from "$app/forms";

    export let data: PageData;
	export let form: ActionData;

    let answer = "";
    let wrongAnswer1 = "";
    let wrongAnswer2 = "";
    let wrongAnswer3 = "";
    let question = "";

    function isAValidAnswer(answer: string) {
        // Is a valid answer if it is not empty without the whitespace around
        return answer.trim() == "";
    }

    function hasDuplicates(array: Array<any>, remove_empty_strings = true) {
        if (remove_empty_strings) array = array.filter(Boolean);

        return (new Set(array)).size !== array.length;
    }
</script>

<PageHeaderArea title="Frage vorschlagen" text="Quuli lebt von deinen kreativen Fragen. Hilf mit die Quuli-Datenbanken mit spannenden und fordernden Fragen zu befüllen. Fleissige Bienchen erhalten auch einen Platz auf der Rangliste." />

{#if !$page.data.session}
    <Alert class="mb-4 border-2" type="error">Bitte <a href="/login" class="underline">melde</a> dich an um Fragen vorzuschlagen.</Alert>
{:else}
    {#if data.userAlreadyAnsweredAmount < AMOUNT_OF_ANSWERED_QUESTIONS_BEFORE_PROPOSALS}
        <Alert class="mb-4 border-2" type="error">Bitte <a href="/quiz" class="underline">beantworte</a> mindestens <b>{ AMOUNT_OF_ANSWERED_QUESTIONS_BEFORE_PROPOSALS }</b> Fragen, bevor du selber welche vorschlägst. Du hast bis jetzt <b>{data.userAlreadyAnsweredAmount}</b> Fragen beantwortet.</Alert>
    {/if}
{/if}


<!-- Form successful message -->
{#if form?.success}
    <Alert class="mb-4 border-2" color="green">Hurra deine Frage wurde erfolgreich vorgeschlagen In deinem <a href="/profil" class="underline">Profil</a> hast du eine Übersicht über alle deiner vorgeschlagenen Fragen.</Alert>
{/if}

<form method="post" use:enhance>
    <fieldset disabled={!$page.data.session || data.userAlreadyAnsweredAmount < AMOUNT_OF_ANSWERED_QUESTIONS_BEFORE_PROPOSALS} class="flex flex-col gap-10" name="f">
        <div class="grid md:grid-cols-2 gap-4">
            <div>
                <Label for="frage" class="mb-2 text-xl">Frage</Label>
                <Input name="frage" id="frage" type="text" required bind:value={question}/>
            </div>
            <div>
                <Label for="antwort" class="mb-2 text-xl">Antwort</Label>
                <Input name="antwort" id="antwort" type="text" required bind:value={answer} />
            </div>
        </div>

        <div>
            <div class="grid md:grid-cols-3 gap-4">
                <fieldset>
                    <Label for="falsch1" class="mb-2 text-xl">Falsche Antwort 1</Label>
                    <Input name="falsch1" id="falsch1" type="text" bind:value={wrongAnswer1} required />
                </fieldset>

                <fieldset disabled={isAValidAnswer(wrongAnswer1)} class="disabled:opacity-50">
                    <Label for="falsch2" class="mb-2 text-xl">Falsche Antwort 2</Label>
                    <Input name="falsch2" id="falsch2" type="text" bind:value={wrongAnswer2} required={!isAValidAnswer(wrongAnswer3)} />
                </fieldset>
                <fieldset disabled={isAValidAnswer(wrongAnswer2)} class="disabled:opacity-50">
                    <Label for="falsch3" class="mb-2 text-xl">Falsche Antwort 3</Label>
                    <Input name="falsch3" id="falsch3" type="text" bind:value={wrongAnswer3}  />
                </fieldset>

                <!-- Check if any of the answers are the same -->
                {#if hasDuplicates([wrongAnswer1, wrongAnswer2, wrongAnswer3, answer, question])}
                    <Alert class="col-span-3 border-2" type="error">Die Antworten und die Frage dürfen nicht gleich sein.</Alert>
                {/if}

                <!-- Check if the question is atleast 10 Characters -->
                {#if question.length < QUESTION_MIN_LENGTH && question != ''}
                    <Alert class="col-span-3 border-2" type="error">Die Frage muss mindestens { QUESTION_MIN_LENGTH } Zeichen lang sein.</Alert>
                {/if}

                <!-- Ask the user if he forgot to add a question mark after the question -->
                {#if question.length > QUESTION_MIN_LENGTH && question[question.length - 1] != "?"}
                    <Alert class="col-span-3 border-2" color="blue">Vergiss nicht ein Fragezeichen am Ende der Frage zu setzen, falls es bei dieser Frage Sinn macht.</Alert>
                {/if}
            </div>
        </div>

        <div class="grid grid-cols-2 gap-4">
            <div>
                <Label for="category" class="mb-2 text-xl">Kategorie</Label>
                <Select name="category" id="category" required>
                    {#each data.categories as cat}
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