<script lang="ts">
    import type { PageData } from "./$types";
    import PageHeaderArea from "$lib/Components/PageHeaderArea.svelte";
    import Avatar from "$lib/Components/Avatar.svelte";
    import AvatarList from "$lib/Components/AvatarList.svelte";
    import { Button, Card } from "flowbite-svelte";

    export let data: PageData;
</script>

<!-- <pre>{ JSON.stringify(data, null, 2) }</pre> -->

<div class="mx-auto max-w-3xl flex flex-col gap-6">
    <PageHeaderArea title="{data.questionnaire.name}" text={data.questionnaire.description ?? ''} margin={false} />

    <!-- <img src="{ data.questionnaire.image ?? 'https://placehold.co/600x400?text=Hello+World' }" alt="" class="w-full rounded-xl shadow-xl border"> -->

    <Button size="lg" href="/quiz?questionnaire={data.questionnaire.id}">Fragebogen ausfüllen</Button>

    <div class="flex justify-between gap-6 lg:items-center flex-col lg:flex-row">
        <div class="flex gap-5 items-center">
            <div>Erschaffen von </div>
            <Avatar user={data.questionnaire.createdBy} />
        </div>

        <!-- If the user currently logged in user is the creator show a bearbeiten knopf -->
        {#if data.isUserAllowedToEdit}
            <div class="flex gap-2">
                <Button color="alternative" href="/fragebogen/{data.questionnaire.id}/bearbeiten">Bearbeiten</Button>
                <Button color="alternative" href="/fragebogen/{data.questionnaire.id}/fragen-bearbeiten">Fragen Bearbeiten</Button>
            </div>
        {/if}
    </div>

    <div class="grid md:grid-cols-2">
        {#if data.questionnaire.members.length > 0}
            <div>
                <h2 class="text-xl mt-8 mb-3">Mitglieder</h2>
                <AvatarList users={data.questionnaire.members} />
            </div>
        {/if}
        
        {#if data.questionnaire.editors.length > 0}
            <div>
                <h2 class="text-xl mt-8 mb-3">Bearbeiter</h2>
                <AvatarList users={data.questionnaire.editors} />
            </div>
        {/if}
    </div>

    <!-- Show Questions -->
    <!-- <h2 class="text-xl mt-8 mb-3">Fragen</h2>

    <Card class="max-w-full relative group" tabindex="1">
        <div class="blur-sm group-focus-within:blur-none">
            {#each data.questionnaire.questions as question}
                <div class="flex justify-between">
                    <h3 class="text-lg font-semibold">{question.question}</h3>
                    <p>{question.answer}</p>
                </div>
            {:else}
                <div>
                    <p>Keine Fragen vorhanden</p>
                    {#if data.isUserAllowedToEdit}
                        <Button href="/fragebogen/{data.questionnaire.id}/fragen-bearbeiten">Fragen Bearbeiten</Button>
                    {/if}
                </div>
            {/each}
        </div>

        <div class="font-bold text-2xl absolute top-0 left-0 w-full h-full flex justify-center items-center pointer-events-none group-focus-within:hidden drop-shadow-xl">Click auf mich um die Fragen zu sehen ...</div>
    </Card> -->    

</div>
