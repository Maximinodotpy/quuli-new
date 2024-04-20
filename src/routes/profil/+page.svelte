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
        Input,
        Fileupload,
        Button,
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

    /* console.log(data); */
</script>

<svelte:head>
    <title>{ data.session?.user?.name }</title>
</svelte:head>

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
    
    {#if data.total_answers}
        <div>
            <Rating id="example-1b" total={5} size={50} rating={data.right_answers / data.total_answers * 5} />
            <p class="text-center">{data.right_answers} von {data.total_answers} Fragen richtig beantwortet</p>
        </div>
    {/if}
</div>

<Tabs style="underline">
    <TabItem title="Leistung">

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
    <TabItem title="Vorgeschlagene Fragen" open={false}>
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
    <TabItem title="Profil Einstellungen" open={true}>
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
    
                <div class="grid grid-cols-2">
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
    <TabItem title="Verbundene Apps">
        {#each data.connected_accounts as app}
            <div class="flex items-center space-x-4">
                <!-- <Avatar src="{app.}" size="lg" /> -->
                <div class="space-y-1 font-medium dark:text-white">
                    <div>{app.provider}</div>
                    <!-- <div class="text-gray-500 dark:text-gray-400 text-sm">
                        Verbunden seit {moment(app.).locale('de').format('MMMM')} {moment(app.createdAt).locale('de').format('Y')}
                    </div> -->
                    <pre>{JSON.stringify(app, null, 4)}</pre>
                </div>
            </div>
        {/each}
    </TabItem>
</Tabs>
