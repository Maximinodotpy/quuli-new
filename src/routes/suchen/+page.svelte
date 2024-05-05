<script lang="ts">
    import PageHeaderArea from "$lib/Components/PageHeaderArea.svelte";
    import { Input, Button, Heading } from 'flowbite-svelte';
    import { SearchOutline } from 'flowbite-svelte-icons';
    import type { PageData } from './$types';
    import { page } from '$app/stores';
    import QuestionnairesList from "$lib/Components/QuestionnairesList.svelte";
    import PlayersList from "$lib/Components/PlayersList.svelte";

    function callSearch() {
        const nach = document.getElementById('nach') as HTMLInputElement;
        console.log(nach.value);

        // Redirect to search page
        window.location.href = `/suchen?nach=${nach.value}`;
    }

    export let data: PageData;

    console.log(data)
</script>

<div class="max-w-4xl mx-auto min-h-full">
    <PageHeaderArea title="Suche" />

    <div class="flex gap-4">
        <div class="hidden relative md:block grow">
            <div class="flex absolute inset-y-0 start-0 items-center ps-3 pointer-events-none">
                <SearchOutline class="w-4 h-4" />
            </div>
            <Input id="nach" class="ps-10" placeholder="Search..." value={$page.url.searchParams.get('nach')}/>
        </div>
    
        <!-- Submit -->
        <Button on:click={callSearch}>Suchen</Button>
    </div>

    <div class="grid gap-8 mt-10">
        <div class="grid gap-4">
            <Heading tag="h3">Benutzer</Heading>
            <PlayersList users={data.users} />
        </div>

        <div class="grid gap-4">
            <Heading tag="h3">Fragebögen</Heading>
            <QuestionnairesList questionnaires={data.questionnaires} />
        </div>
    </div>
</div>
