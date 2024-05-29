<script lang="ts">
    import type { Questionnaire } from "@prisma/client";
    import ImageAspectContainer from "./ImageAspectContainer.svelte";
    import { getPlaceholderImage } from "$lib/helpers";

    export let questionnaires: Questionnaire[] = [];
</script>

<div class="grid">
    {#each questionnaires as questionnaire}
        <a class="md:p-4 py-2 flex items-center gap-4 hover:bg-gray-100 dark:hover:bg-gray-900" href="/fragebogen/{questionnaire.id}">
            <div class="w-24 md:w-48 shrink-0">
                <ImageAspectContainer image={questionnaire.image ?? getPlaceholderImage(questionnaire.name, 800)}  />
            </div>
            <div class="flex flex-col">
                <h2 class="text-lg font-semibold">{questionnaire.name}</h2>
                <p class="text-sm text-neutral-500">{questionnaire.description}</p>
            </div>
        </a>
    {:else}
        <p class="mb-6">Keine Fragebögen ...</p>
    {/each}
</div>
