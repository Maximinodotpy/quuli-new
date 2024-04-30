<script lang="ts">
    import type { PageData } from "./$types";
    import PageHeaderArea from "$lib/Components/PageHeaderArea.svelte";
    import Avatar from "$lib/Components/Avatar.svelte";
    import AvatarList from "$lib/Components/AvatarList.svelte";
    import { Button, Card } from "flowbite-svelte";
    import ImageAspectContainer from "$lib/Components/ImageAspectContainer.svelte";
    import ShareButton from "$lib/Components/ShareButton.svelte";

    export let data: PageData;

    console.log(data);


</script>

<!-- <pre>{ JSON.stringify(data, null, 2) }</pre> -->

<div class="mx-auto max-w-3xl flex flex-col gap-6">
    <PageHeaderArea title="{data.questionnaire.name}" text={data.questionnaire.description ?? ''} margin={false} />

    <ImageAspectContainer image={data.questionnaire.image ?? 'https://placehold.co/600x400?text=Hello+World'} />

    <div class="flex gap-4 items-center">
        <Button class="grow" href="/quiz?questionnaire={data.questionnaire.id}">Fragebogen ausfüllen</Button>
        {#if data.questionnaire.visibility == 'PUBLIC' || data.questionnaire.visibility == 'UNLISTED'}
            <ShareButton title={data.questionnaire.name} share_content={data.questionnaire.description ?? ''} />
        {/if}
    </div>

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

    <div class="grid md:grid-cols-8 gap-8 items-start">
        <!-- <div class="bg-gray-200 col-span-4 p-2">
        </div> -->
        
        <Card class="md:col-span-3 max-w-full">
            <div class="text-4xl font-bold">{ data.questionnaire.responseCount }</div>
            <div class="text-xl font-semibold opacity-75">Beantwortungen</div>
        </Card>

        <Card class="md:col-span-5 max-w-full">
            <div class="mb-4">
                <div class="text-4xl font-bold">{ data.questionnaire.questions.length }</div>
                <div class="text-xl font-semibold opacity-75">Fragen</div>
            </div>

            <div>
                <div class="blur-sm hover:blur-0">
                    {#each data.questionnaire.questions as question}
                        <div class="grid grid-cols-6 whitespace-nowrap overflow-hidden max-w-full text-xs">
                            <div class="grow overflow-hidden relative col-span-6">
                                {question.question}
                                <div class="absolute right-0 top-0 h-full w-10 bg-gradient-to-r from-transparent to-white dark:to-gray-800"></div>
                            </div>

                            <!-- <div class="flex justify-end col-span-2 overflow-hidden">{question.answer}</div> -->
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
            </div>
        </Card>
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
