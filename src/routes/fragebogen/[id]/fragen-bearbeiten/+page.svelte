<script lang="ts">
    import PageHeaderArea from "$lib/Components/PageHeaderArea.svelte";
    import type { ActionData, PageData } from "./$types";
    import QuestionListEditor from "$lib/Components/QuestionListEditor.svelte";
    import { Button, Modal } from "flowbite-svelte";
    import QuestionForm from "$lib/Components/QuestionForm.svelte";
    import { SpeedDial, SpeedDialButton } from "flowbite-svelte";
    import {
        ArrowLeftOutline,
        CirclePlusSolid,
        PlayOutline,
    } from "flowbite-svelte-icons";
    import { goto } from "$app/navigation";

    export let data: PageData;
    export let form: ActionData;

    let modalVisible = false;
</script>

<PageHeaderArea
    title={`Fragebogen Fragen bearbeiten`}
    text={data?.questionnaire?.name}
/>

<QuestionListEditor
    questions={data.questionnaire.questions}
    categoriesEnabled={false}
/>

<div class="mt-10">
    <Button href="/fragebogen/{data.questionnaire.id}"
        >Zurück zum Fragebogen</Button
    >
    <Button on:click={() => (modalVisible = true)}>Frage hinzufügen</Button>
</div>

<Modal
    bind:open={modalVisible}
    title="Frage hinzufügen"
    on:close={() => (modalVisible = false)}
    class="relative"
>
    <QuestionForm
        categoriesEnabled={false}
        questionnaire={data.questionnaire.id}
        on:submit={() => {
            modalVisible = false;
        }}
        on:started_submit={() => {
            console.log("started submit");
        }}
    />
</Modal>

<SpeedDial defaultClass="absolute end-12 bottom-6">
    <SpeedDialButton name="Frage hinzufügen" on:click={() => {
        modalVisible = true;
    }}>
        <CirclePlusSolid class="w-6 h-6" />
    </SpeedDialButton>
    <SpeedDialButton name="Zurück zum Fragebogen" on:click={() => {
        goto(`/fragebogen/${data.questionnaire.id}`);
    }}>
        <ArrowLeftOutline class="w-6 h-6" href="/"/>
    </SpeedDialButton>
    <SpeedDialButton name="Quiz starten" on:click={() => {
        goto(`/quiz?questionnaire=${data.questionnaire.id}`);
    }}>
        <PlayOutline class="w-6 h-6" href="/"/>
    </SpeedDialButton>
</SpeedDial>
