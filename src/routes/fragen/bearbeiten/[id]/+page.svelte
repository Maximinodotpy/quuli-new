<script lang="ts">
    import PageHeaderArea from "$lib/Components/PageHeaderArea.svelte";
    import type { PageData, ActionData } from "./$types";
    import QuestionForm from "$lib/Components/QuestionForm.svelte";

    export let data: PageData;
    export let form: ActionData;

    console.log(form);
</script>

<div class="mx-auto max-w-5xl">
    <PageHeaderArea title={`Frage "${data.question?.question}" bearbeiten`} text="" />
    
    <QuestionForm q_info={data.question} categories={data.categories} form_action="?/edit_question" />
</div>