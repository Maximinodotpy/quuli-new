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
        Avatar,
        Kbd,
    } from "flowbite-svelte";
    import type { PageData } from "./$types";
    import PageHeaderArea from "$lib/Components/PageHeaderArea.svelte";
    import moment from "moment";
    import { DATE_TIME_FORMAT, SHORTCUTS } from "$lib/const";

    console.log(SHORTCUTS);
    console.log(SHORTCUTS);
    console.log(Object.values(SHORTCUTS));
        

    export let data: PageData;
</script>

<div class="max-w-5xl mx-auto min-h-full flex flex-col gap-16">
    <PageHeaderArea title="Über Quuli" text="Hier findest du Background infos über die Quiz Platform Quuli." />
    
    <div class="flex flex-col md:flex-row gap-10 items-center">
        <img src="https://avatars.githubusercontent.com/u/85794303?v=4" alt="Maxim Mäder" class="rounded-xl w-full md:w-48 shadow-md border dark:border-gray-600">
        <div class="col-span-2 flex flex-col gap-2">
            <Heading tag="h2">Maxim Mäder</Heading>
            <P>Programming Enthusiast, Cowboy, Train Fan, Department Head Cartel Schaffhausen, Intergalactic Business Man, Rebel, Socialist and Mediamatician. IIOOA
            </P>
        </div>
    </div>

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
                <TableBodyRow>
                    <TableBodyCell tdClass="w-1/2 p-3 px-6">Letzte Benutzerregistrierung</TableBodyCell>
                    <TableBodyCell tdClass="w-1/2 p-3 px-6">
                        { moment(data.last_registered_user.createdAt).format(DATE_TIME_FORMAT) }
                    </TableBodyCell>
                </TableBodyRow>
                <TableBodyRow>
                    <TableBodyCell tdClass="w-1/2 p-3 px-6">Letzte Beantwortung</TableBodyCell>
                    <TableBodyCell tdClass="w-1/2 p-3 px-6">
                        { moment(data.last_response.createdAt).format(DATE_TIME_FORMAT) }
                    </TableBodyCell>
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
    
    <div>
        <Heading tag="h2" class="mb-8">Tipps, Tricks und Sonstiges</Heading>

        <Accordion>
            <AccordionItem>
                <span slot="header">Tastenkombinationen</span>
                <div class="flex flex-col gap-4">
                    <P>Hier findest du eine kleine Auswahl an Tastenkombinationen, mit denen du auf Quuli schneller unterwegs bist.</P>
                    <Table shadow striped>
                        <TableHead>
                            <TableHeadCell>Was macht's</TableHeadCell>
                            <TableHeadCell>Taste</TableHeadCell>
                        </TableHead>
                        <TableBody>
                            {#each Object.values(SHORTCUTS) as shortcut}
                                <TableBodyRow>
                                    <TableBodyCell>{ shortcut.name }</TableBodyCell>
                                    <TableBodyCell>{ shortcut.key }</TableBodyCell>
                                </TableBodyRow>
                            {/each}
                        </TableBody>
                    </Table>
                    <P>Übrigens <a href="https://maximmaeder.com/keyboard-shortcuts/" target="_blank" class="underline">hier</a> findet man auch noch andere Tastenkombinationen.</P>
                </div>
            </AccordionItem>
        </Accordion>
    </div>
</div>