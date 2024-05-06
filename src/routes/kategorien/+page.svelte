<script lang="ts">
    import PageHeaderArea from "$lib/Components/PageHeaderArea.svelte";
    import type { PageData } from "./$types";
    import { Button, Heading, P, Checkbox, CheckboxButton } from "flowbite-svelte";
    import { MINIMUM_AMOUNT_OF_QUESTIONS_FOR_CATEGORY } from "$lib/const";
    import { goto } from '$app/navigation';

    export let data: PageData;

    console.log(data);

    let select_multiple = false;
    let selected_categories: string[] = [];

    function startQuiz() {
        console.log(selected_categories);

        goto(`/quiz?cat=${selected_categories.join(',')}`);
    }

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

<div class="pb-10 flex gap-6 items-center">
    <Button disabled={selected_categories.length == 0} on:click={startQuiz}>Quiz Starten</Button>

    <div>
        {#if selected_categories.length > 0}
            { data.categories.filter(cat => {
                return selected_categories.includes(cat.id);
            }).map(cat => cat.name)}
        {:else}
            <P>Wähle eine oder mehrere Kategorien aus um ein Quiz zu starten.</P>
        {/if}
    </div>
</div>

<!-- Show all categories -->
{#if data.categories.length > 0}
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-8">
        {#each data.categories as category}
            {#if category.Questions.length > MINIMUM_AMOUNT_OF_QUESTIONS_FOR_CATEGORY}
                <Checkbox custom bind:group={selected_categories} value={category.id}>
                    <div class="border-4 border-transparent dark:peer-checked:border-white peer-checked:border-black rounded-2xl overflow-hidden group relative" href={`/quiz?cat=${category.id}`}>
                        <img src="{ category.name in IMAGE_MAPPINGS ? IMAGE_MAPPINGS[category.name]: '' }" alt="" class="w-full group-hover:grayscale-0 transition-all" style="aspect-ratio: 1/1; object-fit: cover;">

                        <div class="absolute z-20 bottom-0 h-1/2 left-0 bg-gradient-to-b from-transparent to-black w-full flex justify-between items-end p-4 whitespace-nowrap ">
                            <Heading tag="h3" customSize="font-bold text-2xl !text-white text-center lg:text-left">{ category.name }</Heading>
                            <!-- <div class="!text-white hidden lg:block">{ category.Questions.length } Fragen</div> -->
                        </div>
                    </div>
                </Checkbox>
            {/if}
        {/each}
    </div>
{/if}