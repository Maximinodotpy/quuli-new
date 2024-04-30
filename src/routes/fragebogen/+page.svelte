<script lang="ts">
    import PageHeaderArea from "$lib/Components/PageHeaderArea.svelte";
    import type { PageData } from "./$types";
    import ImageAspectContainer from "$lib/Components/ImageAspectContainer.svelte";
    import { Card } from "flowbite-svelte";
    import { getPlaceholderImage } from "$lib/helpers";

    export let data: PageData
</script>

<PageHeaderArea title="Fragebogen" text="Hier siehst du eine Liste von öffentlichen Fragebögen." />

<div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
    {#each data.questionnaires as fragebogen}
        <Card href={`/fragebogen/${fragebogen.id}`}>
            <ImageAspectContainer image={fragebogen.image ?? getPlaceholderImage(fragebogen.name, 800)} />

            <div class="p-4 grow flex flex-col justify-between">
                <h2 class="font-semibold text-gray-800 dark:text-white">{fragebogen.name}</h2>
                <p class="mt-2 text-gray-600 dark:text-gray-400">{fragebogen.description}</p>
            </div>
        </Card>
    {/each}
</div>