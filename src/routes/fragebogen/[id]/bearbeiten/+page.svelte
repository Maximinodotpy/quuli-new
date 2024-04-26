<script lang="ts">
    import PageHeaderArea from "$lib/Components/PageHeaderArea.svelte";
    import QuestionnaireForm from "$lib/Components/QuestionnaireForm.svelte";
    import type { PageData } from "./$types";

    export let data: PageData
</script>

<div class="max-w-3xl mx-auto">
    <PageHeaderArea title={`Fragebogen "${data?.questionnaire?.name}" bearbeiten`} />
    <QuestionnaireForm questionnaire={data.questionnaire} form_action="?/edit_questionnaire" />
</div>