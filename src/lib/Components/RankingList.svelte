<script lang="ts">
    import type { User } from "@prisma/client";
    import {
        Table,
        TableBody,
        TableHeadCell,
        TableHead,
        TableBodyRow,
        TableBodyCell,
        Card,
        Heading,
    } from "flowbite-svelte";
    import Avatar from "./Avatar.svelte";

    export let users: User[] = []
    export let title: string = ''
    export let whereRankedInfo: (user: User) => {  }

</script>

<Card size="lg">
    <Heading tag="h3" class="mb-6" customSize="text-2xl font-bold">{ title }</Heading>

    <Table shadow divClass="border border-slate-500 overflow-hidden round-md">
        <TableHead>
            <TableHeadCell class="w-[10%]">#</TableHeadCell>
            <TableHeadCell class="w-[80%]">Name</TableHeadCell>
            <TableHeadCell class="w-[10%]"></TableHeadCell>
        </TableHead>
        <TableBody>
            {#each users as user, i}
                <TableBodyRow>
                    <TableBodyCell tdClass="opacity-50 p-4 px-6">{i + 1}</TableBodyCell>
                    <TableBodyCell>
                        <Avatar {user} />
                    </TableBodyCell>
                    <TableBodyCell tdClass="p-4 px-6 text-right">{whereRankedInfo(user)}</TableBodyCell>
                </TableBodyRow>
            {/each}
        </TableBody>
    </Table>
</Card>
