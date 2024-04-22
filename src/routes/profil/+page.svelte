<script lang="ts">
    import {
        Avatar,
        Tabs,
        TabItem,
        Rating,
        Input,
        Button,
    } from "flowbite-svelte";
    import { page } from "$app/stores";
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";
    import type { PageData } from "./$types";
    import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell, Checkbox, TableSearch } from 'flowbite-svelte';
    import moment from "moment";
    import { jsonToFormData } from "$lib/helpers";
    import { createPersistentStore } from "$lib/helpers";
    import { writable } from "svelte/store";

    let open_tabs = writable({});

    onMount(() => {
        if (!$page.data.session) {
            goto("/login");
        }

        open_tabs = createPersistentStore<{[key: string]: Boolean}>('open_tabs', {})
    });

    export let data: PageData;
</script>

<svelte:head>
    <title>{ data.session?.user?.name }</title>
</svelte:head>

<div class="min-h-screen">
    <div class="flex flex-col lg:flex-row mb-8 justify-between lg:items-center">
        <div class="flex items-center space-x-4 rtl:space-x-reverse text-4xl mb-8">
            <Avatar src="{ $page.data.session?.user?.image ?? '' }" size="xl" />
            <div class="space-y-1 font-medium dark:text-white">
                <div>{ $page.data.session?.user?.name }</div>
                <div class="text-gray-500 dark:text-gray-400 text-sm">
                    Seit {moment(data.session?.user?.createdAt).locale('de').format('MMMM')} {moment(data.session?.user?.createdAt).locale('de').format('Y')} dabei
                </div>
            </div>
        </div>
    
        {#if data.total_answers}
            <div>
                <Rating id="example-1b" total={5} size={50} rating={data.right_answers / data.total_answers * 5} />
                <p class="lg:text-center">{data.right_answers} von {data.total_answers} Fragen richtig beantwortet</p>
            </div>
        {/if}
    </div>
    
    <Table class="w-full">
        <TableHead>
            <TableHeadCell>Frage</TableHeadCell>
            <TableHeadCell>Antwort</TableHeadCell>
        </TableHead>
        <TableBody>
            {#each data.responses as response}
                <TableBodyRow>
                    <TableBodyCell>{response.question.question}</TableBodyCell>
                    <TableBodyCell>{response.question.answer}</TableBodyCell>
                </TableBodyRow>
            {/each}
        </TableBody>
    </Table>
</div>
