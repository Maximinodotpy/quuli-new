<script lang="ts">
    import PageHeaderArea from "$lib/Components/PageHeaderArea.svelte";
    import QuestionnaireForm from "$lib/Components/QuestionnaireForm.svelte";
    import type { PageData } from "./$types";
    import { Button } from "flowbite-svelte"; 

    export let data: PageData

    console.log(data.questionnaire);
    
</script>

<div class="max-w-3xl mx-auto">
    <PageHeaderArea title={`Fragebogen "${data?.questionnaire?.name}" bearbeiten`} />
    <QuestionnaireForm questionnaire={data.questionnaire} form_action="?/edit_questionnaire" />
    <br>
    <Button href="/fragebogen/{data.questionnaire.id}" color="alternative">Zurück zum Fragebogen</Button>
</div>