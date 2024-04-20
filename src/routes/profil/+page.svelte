<script lang="ts">
    import {
        Avatar,
        Dropdown,
        DropdownHeader,
        DropdownItem,
        DropdownDivider,
        Tooltip,
        Tabs,
        TabItem,
        Rating,
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

<div class="flex justify-between items-center">
    <div class="flex items-center space-x-4 rtl:space-x-reverse text-4xl mb-8">
        <Avatar src="{ $page.data.session?.user?.image ?? '' }" size="xl" />
        <div class="space-y-1 font-medium dark:text-white">
            <div>{ $page.data.session?.user?.name }</div>
            <div class="text-gray-500 dark:text-gray-400 text-sm">
                Seit {moment(data.session?.user.createdAt).locale('de').format('MMMM')} {moment(data.session?.user.createdAt).locale('de').format('Y')} dabei
            </div>
        </div>
    </div>
    
    <div>
        <Rating id="example-1b" total={5} size={50} rating={data.right_answers / data.total_answers * 5} />
        <p class="text-center">{data.right_answers} von {data.total_answers} Fragen richtig beantwortet</p>
    </div>
</div>

<!-- <pre>{ JSON.stringify($page.data.session, null, 4) }</pre> -->

<Tabs style="underline">
    <TabItem title="Leistung">
        <!-- <pre>{ JSON.stringify(data.responses, null, 4) }</pre> -->

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

    </TabItem>
    <TabItem title="Vorgeschlagene Fragen" open>
        <!-- Create table with these questions -->
        <Table class="w-full">
            <TableHead>
                <TableHeadCell>Frage</TableHeadCell>
                <TableHeadCell>Antwort</TableHeadCell>
            </TableHead>
            <TableBody>
                {#each data.submitted_questions as question}
                    <TableBodyRow>
                        <TableBodyCell>{question.question}</TableBodyCell>
                        <TableBodyCell>{question.answer}</TableBodyCell>
                    </TableBodyRow>
                {/each}
            </TableBody>
        </Table>
    </TabItem>
</Tabs>
