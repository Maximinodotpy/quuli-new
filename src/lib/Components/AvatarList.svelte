<script lang="ts">
    import type { User } from "@prisma/client";
    import { Avatar } from "flowbite-svelte";

    export let users: User[];
</script>

<div class="flex items-center space-x-4 flex-wrap">
    {#each users as user}
        <Avatar src={user.image ?? ''} alt={user.name ?? ''} size="md"  href="/profil/{user.id}" />
    {/each}
</div>