<script lang="ts">
    import type { PageData } from "./$types";
    import PageHeaderArea from "$lib/Components/PageHeaderArea.svelte";
    import Avatar from "$lib/Components/Avatar.svelte";
    import AvatarList from "$lib/Components/AvatarList.svelte";
    import { Button } from "flowbite-svelte";

    export let data: PageData;
</script>

<!-- <pre>{ JSON.stringify(data, null, 2) }</pre> -->

<div class="mx-auto max-w-3xl">
    <PageHeaderArea title="Fragebogen: {data.questionnaire.name}" text={data.questionnaire.description ?? ''} />

    <div class="flex justify-between items-center">
        <div class="flex gap-5 items-center">
            <div>Erschaffen von </div>
            <Avatar user={data.questionnaire.createdBy} />
        </div>

        <!-- If the user currently logged in user is the creator show a bearbeiten knopf -->
        {#if data.questionnaire.createdBy.id === data.session?.user?.id}
            <Button href="/fragebogen/{data.questionnaire.id}/bearbeiten">Bearbeiten</Button>
        {/if}
    </div>

    <div class="grid md:grid-cols-2">
        <div>
            <h2 class="text-xl mt-8 mb-3">Mitglieder</h2>
            <AvatarList users={data.questionnaire.members} />
        </div>
        <!-- Show Editors as AvatarList -->
        <div>
            <h2 class="text-xl mt-8 mb-3">Bearbeiter</h2>
            <AvatarList users={data.questionnaire.editors} />
        </div>
    </div>

    <!-- Show Questions -->
    <h2 class="text-xl mt-8 mb-3">Fragen</h2>

    <div class="grid gap-5">
        {#each data.questionnaire.questions as question}
            <div class="p-5 bg-white rounded-lg shadow-md">
                <h3 class="text-lg font-semibold">{question.question}</h3>
            </div>
        {:else}
            <div>
                <p>Keine Fragen vorhanden</p>
                <Button href="/fragebogen/{data.questionnaire.id}/fragen-bearbeiten">Fragen Bearbeiten</Button>
            </div>
        {/each}
    </div>
    

</div>
