<script lang="ts">
    import PageHeaderArea from "$lib/Components/PageHeaderArea.svelte";
    import type { PageData } from "./$types";
    import {
        Tabs,
        TabItem,
        Button
    } from "flowbite-svelte"

    export let data: PageData
</script>

<PageHeaderArea title="Meine Fragebögen" text="Hier siehst du alle Fragebögen die du entweder erschaffen hast, bearbeiten darfst oder ein Mitglied davon bist." />

<!-- <pre>{ JSON.stringify(data, null, 2) }</pre> -->

<div class="flex flex-col">
    <Tabs style="underline">
        <TabItem title="Erschaffen" open>
            <div class="mb-8">
                {#each data.questionnaires as questionnaire}
                    <a class="flex flex-col" href="/fragebogen/{questionnaire.id}">
                        <h2 class="text-lg font-semibold">{questionnaire.name}</h2>
                        <p class="text-sm text-neutral-500">{questionnaire.description}</p>
                    </a>
                {:else}
                    <p class="mb-6">Keine Fragebögen erstellt</p>
                {/each}
            </div>

            <Button href="/fragebogen/neu">Fragebogen erstellen</Button>
        </TabItem>
        <TabItem title="Bearbeiten">
            {#each data.questionnairesEditor as questionnaire}
                <a class="flex flex-col" href="/fragebogen/{questionnaire.id}">
                    <h2 class="text-lg font-semibold">{questionnaire.name}</h2>
                    <p class="text-sm text-neutral-500">{questionnaire.description}</p>
                </a>
            {:else}
                <p class="mb-6">Keine Fragebögen zum Bearbeiten</p>
            {/each}
        </TabItem>
        <TabItem title="Mitglied">
            {#each data.questionnairesMember as questionnaire}
                <a class="flex flex-col" href="/fragebogen/{questionnaire.id}">
                    <h2 class="text-lg font-semibold">{questionnaire.name}</h2>
                    <p class="text-sm text-neutral-500">{questionnaire.description}</p>
                </a>
            {:else}
                <p class="mb-6">Keine Fragebögen als Mitglied</p>
            {/each}
        </TabItem>
    </Tabs>
</div>