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
    /* import { goto } from "$app/navigation";
    import { onMount } from "svelte"; */
    import type { PageData } from "./$types";
    import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell, Checkbox, TableSearch } from 'flowbite-svelte';
    import moment from "moment";
    /* import { jsonToFormData } from "$lib/helpers";
    import { createPersistentStore } from "$lib/helpers";
    import { writable } from "svelte/store"; */

    export let data: PageData;
</script>

<svelte:head>
    <title>{ data.user?.name }</title>
</svelte:head>

<div class="min-h-screen">
    <div class="flex flex-col lg:flex-row mb-8 justify-between lg:items-center">
        <div class="flex items-center space-x-4 rtl:space-x-reverse text-4xl mb-8">
            <Avatar src="{ $page.data.user?.image ?? '' }" size="xl" />
            <div class="space-y-1 font-medium dark:text-white">
                <div>{ $page.data.user?.name }</div>
                <div class="text-gray-500 dark:text-gray-400 text-sm">
                    Seit {moment(data.user?.createdAt).locale('de').format('MMMM')} {moment(data.user?.createdAt).locale('de').format('Y')} dabei
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

    <!-- Show a little indication in case this is the logged in users profile -->
    {#if data.session?.user?.id == data.user?.id}
        <div class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
            <strong class="font-bold">Das ist dein Profil!</strong>
            <span class="block sm:inline">Was du hier siehst können auch andere Benutzer auf Quuli sehen.</span>
        </div>
    {/if}
    
    <!-- <Table class="w-full">
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
    </Table> -->
</div>
