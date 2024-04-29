<script lang="ts">
    import PageHeaderArea from "$lib/Components/PageHeaderArea.svelte";
    import type { PageData } from "./$types";

    export let data: PageData
</script>

<PageHeaderArea title="Fragebogen" text="Hier siehst du eine Liste von öffentlichen Fragebögen." />

<div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
    {#each data.questionnaires as fragebogen}
        <a class="bg-white rounded-lg shadow-md dark:bg-gray-800 flex flex-col" href={`/fragebogen/${fragebogen.id}`}>
            <img src={fragebogen.image} alt="" class="w-full aspect-square">
            <div class="p-4 grow flex flex-col justify-between">
                <h2 class="text-xl font-semibold text-gray-800 dark:text-white">{fragebogen.name}</h2>
                <p class="mt-2 text-gray-600 dark:text-gray-400">{fragebogen.description}</p>
            </div>
        </a>
    {/each}
</div>