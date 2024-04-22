<script lang="ts">
    import PageHeaderArea from "$lib/Components/PageHeaderArea.svelte";
    import type { PageData } from "./$types";
    import { Button, Heading, P } from "flowbite-svelte";
    import { MINIMUM_AMOUNT_OF_QUESTIONS_FOR_CATEGORY } from "$lib/const";

    export let data: PageData;

    console.log(data);

    const IMAGE_MAPPINGS = {
        'Technik': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Queen-Mary-II-Elbe-051119-0.jpg/1280px-Queen-Mary-II-Elbe-051119-0.jpg',
        'Geschichte': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Nikolaos_Gyzis_-_Historia.jpg/440px-Nikolaos_Gyzis_-_Historia.jpg',
        'Wissenschafft': 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Statue_Unter_den_Linden_6_%28Mitte%29_Wilhelm_von_Humboldt.jpg/1024px-Statue_Unter_den_Linden_6_%28Mitte%29_Wilhelm_von_Humboldt.jpg',
        'Sport': 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Sport_by_Eduard_Bargheer_1962.jpg/1920px-Sport_by_Eduard_Bargheer_1962.jpg',
        'Politik': 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/2020-02-13_Deutscher_Bundestag_IMG_3438_by_Stepro.jpg/1280px-2020-02-13_Deutscher_Bundestag_IMG_3438_by_Stepro.jpg',
        'Unterhaltung': 'https://upload.wikimedia.org/wikipedia/commons/b/bd/Eubank-Love-2011-Figur-William-Eubank-Genesis.jpg',
        'Kunst': 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Sebastiano_Ricci_002.jpg/1024px-Sebastiano_Ricci_002.jpg',
        'Literatur': 'https://upload.wikimedia.org/wikipedia/commons/f/f6/Books_and_Scroll_Ornament_with_Open_Book.png',
        'Geographie': 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Weltkarte.jpg/1920px-Weltkarte.jpg',
        'Sonstiges': 'https://th.bing.com/th/id/OIP.3WDgNgHkKnSYBEmYaJdl_AHaFj?rs=1&pid=ImgDetMain',
    }
</script>

<PageHeaderArea title="Kategorien" text="Hier siehts du eine Übersicht der Kategorien auf Quuli. Du kannst auch von hier gleich ein Quiz mit Fragen von nur dort starten." />

<!-- Show all categories -->
{#if data.categories.length > 0}
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        {#each data.categories as category}
            {#if category.Questions.length > MINIMUM_AMOUNT_OF_QUESTIONS_FOR_CATEGORY}
                <div class="border rounded-2xl overflow-hidden group">
                    <img src="{ category.name in IMAGE_MAPPINGS ? IMAGE_MAPPINGS[category.name]: '' }" alt="" class="w-full grayscale group-hover:grayscale-0 transition-all" style="aspect-ratio: 2/1; object-fit: cover;">

                    <div class="p-4">
                        <Heading tag="h3" customSize="font-bold text-2xl mb-2">{ category.name } <sup>{ category.Questions.length }</sup></Heading>
                    </div>

                    <div class="px-4 pb-4 flex">
                        <Button href={`/quiz?cat=${category.id}`} color="alternative">Zu den Fragen</Button>
                    </div>
                </div>
            {/if}
        {/each}
    </div>
{/if}