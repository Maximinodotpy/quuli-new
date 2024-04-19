<script lang="ts">
    import {
        Avatar,
        Dropdown,
        DropdownHeader,
        DropdownItem,
        DropdownDivider,
        Tooltip,
        Tabs, TabItem
    } from "flowbite-svelte";
    import { page } from "$app/stores";
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";
    import type { PageData } from "./$types";
    import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell, Checkbox, TableSearch } from 'flowbite-svelte';
    import moment from "moment";


    onMount(() => {
        if (!$page.data.session) {
            goto("/login");
        }
    });

    export let data: PageData;
</script>

<div class="flex items-center space-x-4 rtl:space-x-reverse text-4xl mb-8">
    <Avatar src="{ $page.data.session?.user?.image ?? '' }" size="xl" />
    <div class="space-y-1 font-medium dark:text-white">
        <div>{ $page.data.session?.user?.name }</div>
        <div class="text-gray-500 dark:text-gray-400 text-sm">
            Seit {moment(data.session?.user.createdAt).locale('de').format('MMMM')} {moment(data.session?.user.createdAt).locale('de').format('Y')} dabei
        </div>
    </div>
</div>

<!-- <pre>{ JSON.stringify($page.data.session, null, 4) }</pre> -->

<Tabs style="underline">
    <TabItem title="Leistung">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        <p class="text-sm text-gray-500 dark:text-gray-400">
            <b>Profile:</b>
            tempor incididunt ut labore et dolore magna aliqua.
        </p>
    </TabItem>
    <TabItem title="Vorgeschlagene Fragen" open>
        <!-- Create table with these questions -->
        <Table class="w-full">
            <TableHead>
                <TableHeadCell>Frage</TableHeadCell>
                <TableHeadCell>Antwort</TableHeadCell>
            </TableHead>
            <tbody>
                {#each data.submitted_questions as question}
                    <TableBodyRow>
                        <TableBodyCell>{question.question}</TableBodyCell>
                        <TableBodyCell>{question.answer}</TableBodyCell>
                    </TableBodyRow>
                {/each}
            </tbody>
        </Table>
    </TabItem>
</Tabs>
