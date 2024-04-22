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
    
    function toggleQuestionStatus(question_id: string) {
        console.log('Toggling question status ...');
        
        // @ts-ignore
        const status = data.submitted_questions.find(q => q.id == question_id).status == 'DELETED' ? 'NORMAL' : 'DELETED';

        console.log('Desired status:', status);

        fetch(`/api/questions/set-question-status`, {
            method: "POST",
            body: jsonToFormData({ question_id, status })
        }).then(re => re.json()).then(re => {
            console.log(re);

            data.submitted_questions = data.submitted_questions.map(q => {
                if (q.id == question_id) {
                    q.status = status;
                }
                console.log(q, 'fff');
                
                return q;
            });
        });
    }
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
    
    <Tabs style="underline" defaultClass="flex overflow-auto whitespace-nowrap space-x-2 rtl:space-x-reverse" tabStyle="pill">
        <TabItem title="Leistung" bind:open={$open_tabs['l']}>
    
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
        <TabItem title="Vorgeschlagene Fragen" bind:open={$open_tabs['v']}>
            <Table class="w-full">
                <TableHead>
                    <TableHeadCell>Frage</TableHeadCell>
                    <TableHeadCell>Antwort</TableHeadCell>
                    <TableHeadCell></TableHeadCell>
                    <TableHeadCell></TableHeadCell>
                </TableHead>
                <TableBody>
                    {#each data.submitted_questions as question}
                        <TableBodyRow>
                            <TableBodyCell class="w-1/4">
                                <div class="{question.status == 'DELETED' ? 'line-through': ''}">{question.question}</div>
                            </TableBodyCell>
                            <TableBodyCell class="w-1/4">
                                <div class="{question.status == 'DELETED' ? 'line-through': ''}">{question.answer}</div>
                            </TableBodyCell>
                            <TableBodyCell>
                                <Button href="/fragen/bearbeiten/{question.id}" size="xs">Bearbeiten</Button>
                            </TableBodyCell>
                            <TableBodyCell>
                                <Button size="xs" on:click={() => { toggleQuestionStatus(question.id) }} >
                                    {question.status == 'DELETED' ? 'Wiederherstellen' : 'Löschen'}
                                </Button>
                            </TableBodyCell>
                        </TableBodyRow>
                    {/each}
                </TableBody>
            </Table>
        </TabItem>
        <TabItem title="Profil Einstellungen" bind:open={$open_tabs['p']}>
            <form action="?/edit_user" method="post">
                <div class="max-w-4xl mx-auto flex flex-col gap-12">
    
                    <!-- <div class="grid grid-cols-2">
                        <div>
                            <h2 class="text-2xl font-semibold">Profilbild</h2>
                            <p class="text-gray-500 dark:text-gray-400 text-sm">Lade ein Profilbild hoch</p>
                        </div>
    
                        <div>
                            <Fileupload accept="image/*" name="profile_picture" />
                        </div>
                    </div> -->
    
                    <div class="grid gap-3 md:grid-cols-2">
                        <div>
                            <h2 class="text-2xl font-semibold">Benutzername</h2>
                            <p class="text-gray-500 dark:text-gray-400 text-sm">Dein öffentlicher Benutzername</p>
                        </div>
    
                        <Input type="text" name="username" placeholder="Benutzername" value={data.session?.user?.name} required />
                    </div>
    
                    <div class="flex justify-end">
                        <Button type="submit">Speichern</Button>
                    </div>
                </div>
            </form>
        </TabItem>
        <TabItem title="Verbundene Apps" bind:open={$open_tabs['va']}>
            {#each data.connected_accounts as app}
                <div class="flex items-center space-x-4">
                    <!-- <Avatar src="{app.}" size="lg" /> -->
                    <div class="space-y-1 font-medium dark:text-white">
                        <div>{app.provider}</div>
                        <!-- <div class="text-gray-500 dark:text-gray-400 text-sm">
                            Verbunden seit {moment(app.).locale('de').format('MMMM')} {moment(app.createdAt).locale('de').format('Y')}
                        </div> -->
                        <!-- <pre>{JSON.stringify(app, null, 4)}</pre> -->
                    </div>
                </div>
            {/each}
        </TabItem>
    </Tabs>
</div>
