<script lang="ts">
    import { page } from "$app/stores";
    import { Alert, Heading, Input, Label, Button, Select, P } from "flowbite-svelte";
    import type { ActionData, PageData } from "./$types";
    import PageHeaderArea from "$lib/Components/PageHeaderArea.svelte";
    import { AMOUNT_OF_ANSWERED_QUESTIONS_BEFORE_PROPOSALS, QUESTION_MIN_LENGTH } from "$lib/const";
    import QuestionForm from "$lib/Components/QuestionForm.svelte";

    export let data: PageData;
	export let form: ActionData;
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
    <Alert class="mb-4 border-2" color="green">Hurra deine Frage wurde erfolgreich vorgeschlagen In deinem <a href="/profil/vorgeschlagene-fragen" class="underline">Profil</a> hast du eine Übersicht über alle deiner vorgeschlagenen Fragen.</Alert>
{/if}

<QuestionForm is_disabled={!$page.data.session || data.userAlreadyAnsweredAmount < AMOUNT_OF_ANSWERED_QUESTIONS_BEFORE_PROPOSALS} categories={data.categories} />