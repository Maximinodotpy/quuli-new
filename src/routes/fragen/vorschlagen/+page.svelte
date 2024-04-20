<script lang="ts">
    import { page } from "$app/stores";
    import { Alert, Heading, Input, Label, Button, Select, P } from "flowbite-svelte";
    import type { ActionData, PageData } from "./$types";

    export let data: PageData;
	export let form: ActionData;

    let answer = "";
    let wrongAnswer1 = "";
    let wrongAnswer2 = "";
    let wrongAnswer3 = "";

    function isAValidAnswer(answer: string) {
        // Is a valid answer if it is not empty without the whitespace around
        return answer.trim() == "";
    }

    function hasDuplicates(array: Array<any>) {
        return (new Set(array)).size !== array.length;
    }
</script>

<svelte:head>
    <title>Frage vorschlagen</title>
</svelte:head>

<div class="mb-10">
    <Heading class="mb-4">Frage vorschlagen</Heading>
    <P>Quuli lebt von deinen kreativen Fragen. Hilf mit die Quuli Datenbanken mit spannenden und fordernden Fragen zu befüllen. Fleissige Bienchen erhalten auch einen Platz auf der Rangliste.</P>
</div>

{#if !$page.data.session}
    <Alert class="mb-4" type="error">Bitte <a href="/login" class="underline">melde</a> dich an um Fragen vorzuschlagen.</Alert>
{/if}

<!-- Form successful message -->
{#if form?.success}
    <Alert class="mb-4" type="green">Hurra deine Frage wurde erfolgreich vorgeschlagen In deinem <a href="/profil" class="underline">Profil</a> hast du eine Übersicht über alle deiner vorgeschlagenen Fragen.</Alert>
{/if}

<form method="post">
    <fieldset disabled={!$page.data.session} class="flex flex-col gap-10" name="f">
        <div class="grid grid-cols-2 gap-4">
            <div>
                <Label for="frage" class="mb-2 text-xl">Frage</Label>
                <Input name="frage" id="frage" type="text" required/>
            </div>
            <div>
                <Label for="antwort" class="mb-2 text-xl">Antwort</Label>
                <Input name="antwort" id="antwort" type="text" required bind:value={answer} />
            </div>
        </div>

        <div>
            <div class="grid grid-cols-3 gap-4">
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

                <!-- {#if hasDuplicates([wrongAnswer1, wrongAnswer2, wrongAnswer3, answer]) && answer != "" && wrongAnswer1 != ''}
                    <Alert class="col-span-3" type="error">Die Antworten dürfen nicht gleich sein.</Alert>
                {/if} -->
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