<script lang="ts">
    import {
        Avatar,
        Tabs,
        TabItem,
        Rating,
        Input,
        Button,
        Heading,
        Card,
        P,
    } from "flowbite-svelte";
    import { page } from "$app/stores";
    import type { PageData } from "./$types";
    import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell, Checkbox, TableSearch } from 'flowbite-svelte';
    import moment from "moment";

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

    <!-- <pre>{JSON.stringify(data, null, 2)}</pre> -->

    <div class="grid grid-cols-4 mt-8 gap-8">
        <Card class="max-w-full col-span-4 lg:col-span-2">
            <div class="flex flex-col gap-8">
                <Heading tag="h3">Vorgeschlagene Fragen</Heading>

                {#if data.proposedQuestions.length == 0}
                    <P>
                        <b>{ data.user?.name }</b> hat noch keine Fragen vorgeschlagen.
                    </P>
                {:else}
                    <P>
                        <b>{ data.user?.name }</b> hat schon <b>{ data.proposedQuestions.length }</b> Fragen vorgeschlagen. Hier sind die letzten 5.
                    </P>
        
                    <!-- Show the last 5 Proposed questions -->
                    <div>
                        <Table striped>
                            <TableHead>
                                <TableHeadCell>Frage</TableHeadCell>
                                <!-- <TableHeadCell class="hidden lg:block">Kategorie</TableHeadCell> -->
                                <TableHeadCell>Antwort</TableHeadCell>
                                <!-- <TableHeadCell class="hidden lg:block">Erstellt am</TableHeadCell> -->
                            </TableHead>
                            <TableBody>
                                {#each data.proposedQuestions.slice(0, 5) as question}
                                    <TableBodyRow>
                                        <TableBodyCell tdClass="px-6 py-2 text-xs">{question.question}</TableBodyCell>
                                        <!-- <TableBodyCell tdClass="px-6 py-2 text-xs hidden lg:block">{question.category.name}</TableBodyCell> -->
                                        <TableBodyCell tdClass="px-6 py-2 text-xs">{question.answer}</TableBodyCell>
                                        <!-- <TableBodyCell tdClass="px-6 py-2 text-xs hidden lg:block">{moment(question.createdAt).locale('de').format('DD.MM.YYYY')}</TableBodyCell> -->
                                    </TableBodyRow>
                                {/each}
                            </TableBody>
                        </Table>
                    </div>
                {/if}
            </div>
        </Card>
        
        <Card class="max-w-full col-span-4 lg:col-span-2">
            <div class="flex flex-col gap-8">
                <Heading tag="h3">Öffentliche Fragebögen</Heading>

                {#if data.questionnaires.length == 0}
                    <P>
                        <b>{ data.user?.name }</b> hat noch keine Öffentlichen Fragebögen erstellt.
                    </P>
                {:else}
                    <P>
                        <b>{ data.user?.name }</b> hat schon <b>{ data.questionnaires.length }</b> Öffentliche Fragebögen erstellt.
                    </P>
        
                    <!-- Show the last 5 questionnaires -->
                    <div>
                        <Table striped>
                            <TableHead>
                                <TableHeadCell>Fragebogen</TableHeadCell>
                                <TableHeadCell class="hidden lg:block">Fragen</TableHeadCell>
                                <TableHeadCell>Erstellt am</TableHeadCell>
                            </TableHead>
                            <TableBody>
                                {#each data.questionnaires.slice(0, 5) as questionnaire}
                                    <TableBodyRow>
                                        <TableBodyCell tdClass="px-6 py-2 text-xs">
                                            <a href="/fragebogen/{questionnaire.id}">{questionnaire.name}</a>
                                        </TableBodyCell>
                                        <TableBodyCell tdClass="px-6 py-2 text-xs hidden lg:block">{questionnaire?.questions?.length}</TableBodyCell>
                                        <TableBodyCell tdClass="px-6 py-2 text-xs">{moment(questionnaire.createdAt).locale('de').format('DD.MM.YYYY')}</TableBodyCell>
                                    </TableBodyRow>
                                {/each}
                            </TableBody>
                        </Table>
                    </div>
                {/if}
            </div>
        </Card>
    </div>
</div>

