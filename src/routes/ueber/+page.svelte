<script lang="ts">
    import {
        Heading,
        P
    } from "flowbite-svelte";
    import type { PageData } from "./$types";
    import PageHeaderArea from "$lib/Components/PageHeaderArea.svelte";
    import { text } from "@sveltejs/kit";

    export let data: PageData;
</script>

<PageHeaderArea title="Über Quuli" text="Hier findest du Background infos über die Quiz Platform Quuli." />

<div>
    <h2 class="font-bold text-2xl">{ data.amount_of_questions_in_db } Fragen</h2>
    <h2 class="font-bold text-2xl">{ data.amount_of_users_in_db } User</h2>
    <h2 class="font-bold text-2xl">{ data.amount_responses_in_db } Beantwortungen</h2>
</div>

<div>
    Technologien:

    <a href="/">Github</a>
</div>