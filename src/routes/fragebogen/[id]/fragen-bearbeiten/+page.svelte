<script lang="ts">
    import PageHeaderArea from "$lib/Components/PageHeaderArea.svelte";
    import type { PageData } from "./$types";
    import QuestionListEditor from "$lib/Components/QuestionListEditor.svelte";
    import { Button, Modal } from "flowbite-svelte";
    import QuestionForm from "$lib/Components/QuestionForm.svelte";

    export let data: PageData

    let modalVisible = false;
</script>

<PageHeaderArea title={`Fragebogen Fragen bearbeiten`} text="{data?.questionnaire?.name}" />

<QuestionListEditor questions={data.questionnaire.questions} categoriesEnabled={false}/>

<div class="mt-10">
    <Button href="/fragebogen/{data.questionnaire.id}">Zurück zum Fragebogen</Button>
    <Button on:click={() => modalVisible = true}>Frage hinzufügen</Button>
</div>

<Modal bind:open={modalVisible} title="Frage hinzufügen" on:close={() => modalVisible = false}>
    <QuestionForm categoriesEnabled={false} questionnaire={data.questionnaire.id}/>
</Modal>