<script lang="ts">
    import PageHeaderArea from "$lib/Components/PageHeaderArea.svelte";
    import type { PageData } from "./$types";
    import { Button, Heading, P } from "flowbite-svelte";
    import { MINIMUM_AMOUNT_OF_QUESTIONS_FOR_CATEGORY } from "$lib/const";

    export let data: PageData;

    console.log(data);

    const IMAGE_MAPPINGS = {
        'Technik': '/cat/Technik.jpg',
        'Geschichte': '/cat/Geschichte.jpg',
        'Wissenschafft': '/cat/Wissenschafft.jpg',
        'Sport': '/cat/Sport.jpg',
        'Politik': '/cat/Politik.jpg',
        'Unterhaltung': '/cat/Unterhaltung.jpg',
        'Kunst': '/cat/Kunst.jpg',
        'Literatur': '/cat/Literatur.jpg',
        'Geographie': '/cat/Geographie.jpg',
        'Sonstiges': '/cat/Sonstiges.jpg',
    }
</script>

<PageHeaderArea title="Kategorien" text="Hier siehts du eine Übersicht der Kategorien auf Quuli. Du kannst auch von hier gleich ein Quiz mit Fragen von nur dort starten." />

<!-- Show all categories -->
{#if data.categories.length > 0}
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-8">
        {#each data.categories as category}
            {#if category.Questions.length > MINIMUM_AMOUNT_OF_QUESTIONS_FOR_CATEGORY}
                <a class="rounded-2xl overflow-hidden group relative" href={`/quiz?cat=${category.id}`}>
                    <img src="{ category.name in IMAGE_MAPPINGS ? IMAGE_MAPPINGS[category.name]: '' }" alt="" class="w-full group-hover:grayscale-0 transition-all" style="aspect-ratio: 1/1; object-fit: cover;">

                    <div class="absolute z-20 bottom-0 h-1/2 left-0 bg-gradient-to-b from-transparent to-black w-full flex justify-between items-end p-4 whitespace-nowrap ">
                        <Heading tag="h3" customSize="font-bold text-2xl !text-white text-center lg:text-left">{ category.name }</Heading>
                        <!-- <div class="!text-white hidden lg:block">{ category.Questions.length } Fragen</div> -->
                    </div>
                </a>
            {/if}
        {/each}
    </div>
{/if}