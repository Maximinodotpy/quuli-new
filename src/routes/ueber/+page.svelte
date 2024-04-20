<script lang="ts">
    import {
        Heading,
        P,
        Accordion,
        AccordionItem,
        Table,
        TableBody,
        TableBodyCell,
        TableBodyRow,
        TableHead,
        TableHeadCell,
        Checkbox,
        TableSearch,
    } from "flowbite-svelte";
    import type { PageData } from "./$types";
    import PageHeaderArea from "$lib/Components/PageHeaderArea.svelte";

    export let data: PageData;
</script>

<div class="max-w-5xl mx-auto min-h-full flex flex-col gap-16">
    <PageHeaderArea title="Über Quuli" text="Hier findest du Background infos über die Quiz Platform Quuli." />
    
    <div>
        <Heading tag="h2" class="mb-8">Zahlen</Heading>

        <Table divClass="border dark:border-slate-600 rounded-xl overflow-hidden">
            <TableHead>
                <TableHeadCell>Was</TableHeadCell>
                <TableHeadCell>Wert</TableHeadCell>
            </TableHead>
            <TableBody tableBodyClass="divide-y">
                <TableBodyRow>
                    <TableBodyCell tdClass="w-1/2 p-3 px-6">Fragen</TableBodyCell>
                    <TableBodyCell tdClass="w-1/2 p-3 px-6">{ data.amount_of_questions_in_db }</TableBodyCell>
                </TableBodyRow>
                <TableBodyRow>
                    <TableBodyCell tdClass="w-1/2 p-3 px-6">Benutzer</TableBodyCell>
                    <TableBodyCell tdClass="w-1/2 p-3 px-6">{ data.amount_of_users_in_db }</TableBodyCell>
                </TableBodyRow>
                <TableBodyRow>
                    <TableBodyCell tdClass="w-1/2 p-3 px-6">Beantwortungen</TableBodyCell>
                    <TableBodyCell tdClass="w-1/2 p-3 px-6">{ data.amount_responses_in_db }</TableBodyCell>
                </TableBodyRow>
            </TableBody>
        </Table>
    </div>
    

    <div>
        <Heading tag="h2" class="mb-8">Technologien</Heading>

        <Accordion>
            <AccordionItem>
                <span slot="header">SvelteKit</span>
                <P>Svelte ist ein modernes Frontend Framework, welches auf Compiler Technologie setzt.</P>
            </AccordionItem>
            <AccordionItem>
                <span slot="header">FlowBite</span>
                <P>Tailwind CSS ist ein Utility First CSS Framework, welches auf Utility Klassen setzt.</P>

            </AccordionItem>
            <AccordionItem>
                <span slot="header">HostPoint</span>
                <P>.</P>
            </AccordionItem>
            <AccordionItem>
                <span slot="header">Github</span>
                <P>.</P>
            </AccordionItem>
            <AccordionItem>
                <span slot="header">Vercel</span>
                <P>.</P>
                <P>Hier findet man ihr Impressum: <a href="https://vercel.com/legal/privacy-policy" class="underline">https://vercel.com/legal/privacy-policy</a></P>
            </AccordionItem>
            <AccordionItem>
                <span slot="header">Github</span>
                <P>.</P>
            </AccordionItem>
        </Accordion>
    </div>
</div>