<script lang="ts">
    import { Heading, P } from "flowbite-svelte";

    export let title = "Titel";
    export let text = "";

    export let set_page_title = true;
</script>

<svelte:head>
    {#if set_page_title}
        <title>{title}</title>
    {/if}
</svelte:head>

<div class="mb-10 max-w-4xl">
    <Heading class="mb-4" tag="h1">{title}</Heading>
    <P class="text-gray-500 dark:text-gray-400 text-xl">{text}</P>
</div>