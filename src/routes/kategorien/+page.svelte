<script lang="ts">
    import PageHeaderArea from "$lib/Components/PageHeaderArea.svelte";
    import type { PageData } from "./$types";
    import { Button, Heading, P } from "flowbite-svelte";

    export let data: PageData;
</script>

<PageHeaderArea title="Kategorien" text="Hier siehts du eine Übersicht der Kategorien auf Quuli. Du kannst auch von hier gleich ein Quiz mit Fragen von nur dort starten." />

<!-- Show all categories -->
{#if data.categories.length > 0}
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        {#each data.categories as category}
            <div class="border rounded-2xl overflow-hidden">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Queen-Mary-II-Elbe-051119-0.jpg/1280px-Queen-Mary-II-Elbe-051119-0.jpg" alt="" class="w-full" style="aspect-ratio: 2/1; object-fit: cover;">

                <div class="p-4">
                    <Heading tag="h3" customSize="font-bold text-2xl mb-2">{ category.name }</Heading>
                    <P>{ category.description ?? 'Lorem ipsum son' }</P>
                </div>

                <div class="px-4 pb-4 flex justify-between">
                    <div>

                    </div>
                    <div>
                        <Button href={`/quiz?cat=${category.id}`} color="alternative">Zu den Fragen</Button>
                    </div>
                </div>
            </div>
        {/each}
    </div>
{/if}