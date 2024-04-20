<script lang="ts">
    import PageHeaderArea from "$lib/Components/PageHeaderArea.svelte";
    import type { PageData } from "./$types";
    import InputContainer from "$lib/Components/InputContainer.svelte";

    export let data: PageData;
</script>

<div class="mx-auto max-w-5xl">
    <PageHeaderArea title={`Frage "${data.question?.question}" bearbeiten`} text="" />
    
    <InputContainer id="question" title="Frage" description="Die Frage, die gestellt werden soll." />
</div>