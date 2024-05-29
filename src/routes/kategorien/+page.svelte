<script lang="ts">
    import PageHeaderArea from "$lib/Components/PageHeaderArea.svelte";
    import type { PageData } from "./$types";
    import { Button, Heading, P, Checkbox, CheckboxButton } from "flowbite-svelte";
    import { MINIMUM_AMOUNT_OF_QUESTIONS_FOR_CATEGORY } from "$lib/const";
    import { goto } from '$app/navigation';
    import { onMount } from 'svelte';

    export let data: PageData;

    console.log(data);

    let select_multiple = false;
    let selected_categories: string[] = [];

    onMount(() => {
        const url = new URL(window.location.href);
        const cat = url.searchParams.get('already_selected_categories');

        if (cat) {
            selected_categories = cat.split(',');
        }
    });

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

    function selectAll() {
        selected_categories = data.categories.map(cat => cat.id);
    }

    function deselectAll() {
        selected_categories = [];
    }

    function invertSelection() {
        selected_categories = data.categories.map(cat => cat.id).filter(cat => !selected_categories.includes(cat));
    }
</script>

<PageHeaderArea title="Kategorien" text="Hier siehts du eine Übersicht der Kategorien auf Quuli. Du kannst auch von hier gleich ein Quiz mit Fragen von nur dort starten." />

<div class="pb-10">
    <div class="flex flex-col md:flex-row gap-3 md:items-center mb-3">
        <Button disabled={selected_categories.length == 0} on:click={startQuiz}>Quiz Starten</Button>
    
        <div class="grid md:flex gap-2">
            <Button on:click={selectAll} size="sm" color="alternative">Alle Auswählen</Button>
            <Button on:click={deselectAll} size="sm" color="alternative">Alle Abwählen</Button>
            <Button on:click={invertSelection} size="sm" color="alternative">Auswahl umkehren</Button>
        </div>
    </div>

    <div class="!text-sm">
        {#if selected_categories.length > 0}
            { data.categories.filter(cat => {
                return selected_categories.includes(cat.id);
            }).map(cat => cat.name).join(', ')}
        {:else}
            Wähle eine oder mehrere Kategorien aus um ein Quiz zu starten.
        {/if}
    </div>
</div>

<!-- Show all categories -->
{#if data.categories.length > 0}
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-8">
        {#each data.categories as category}
            {#if category.Questions.length > MINIMUM_AMOUNT_OF_QUESTIONS_FOR_CATEGORY}
                <div class="w-full h-full rounded-2xl aspect-square relative overflow-hidden">
                    <input type="checkbox" name="{category.id}" id="{category.id}" value="{category.id}" bind:group={selected_categories} class="hidden peer">
                    <img src="{ category.name in IMAGE_MAPPINGS ? IMAGE_MAPPINGS[category.name]: '' }" alt="" class="w-full group-hover:grayscale-0 transition-all" style="aspect-ratio: 1/1; object-fit: cover;">

                    <label for="{category.id}" class="aspect-square w-full h-full outline -outline-offset-8 transition-all rounded-2xl outline-8 outline-transparent peer-checked:outline-primary-500 hover:outline-primary-500/25 group absolute top-0">
                        <div class="absolute z-20 bottom-0 h-1/2 left-0 bg-gradient-to-b from-transparent to-black w-full flex justify-between items-end pb-2 md:p-4 whitespace-nowrap group-hover:h-full transition-all">
                            <Heading tag="h3" customSize="font-bold md:text-2xl !text-white text-center lg:text-left transition-all group-hover:mb-4">{ category.name }</Heading>
                        </div>
                    </label>
                </div>
            {/if}
        {/each}
    </div>
{/if}