<script lang="ts">
    import type { User } from "@prisma/client";
    import { Avatar } from "flowbite-svelte";

    export let user: User;
</script>

<a class="flex items-center space-x-4" href="/profil/{user.id}">
    <Avatar src={user.image ?? ''} alt={user.name ?? ''} size="md" />
    <div>
        <h3 class="text-lg font-semibold">{user.name}</h3>
    </div>
</a>