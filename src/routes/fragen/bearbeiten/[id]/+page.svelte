<script lang="ts">
    import PageHeaderArea from "$lib/Components/PageHeaderArea.svelte";
    import type { PageData, ActionData } from "./$types";
    import QuestionForm from "$lib/Components/QuestionForm.svelte";
    import { goto } from "$app/navigation";
    import { page } from "$app/stores";

    export let data: PageData;
    export let form: ActionData;

    // get go_back_to url parameter
    const urlParams = new URLSearchParams(window.location.search);
    const go_back_to = urlParams.get('go_back_to');
    
    $: {
        console.log('form', form);

        // if the form was submitted successfully, redirect to the go_back_to url
        if (form && form.success && go_back_to) {
            console.log('redirecting to', go_back_to);
            
            goto(go_back_to);
        }
    }
    
</script>

<div class="mx-auto max-w-5xl">
    <PageHeaderArea title={`Frage "${data.question?.question}" bearbeiten`} text="" />
    
    <QuestionForm q_info={data.question} categories={data.categories} form_action="?/edit_question" categoriesEnabled={data.question?.questionnaireId == null} />
</div>