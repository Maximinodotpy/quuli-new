<script lang="ts">
    import type { User } from "@prisma/client";
    import { Avatar } from "flowbite-svelte";

    export let user: User;

    export let hide_image_on_mobile: boolean = false;
</script>

<a class="flex items-center gap-4" href="/profil/{user.id}">
    <Avatar src={user.image ?? ''} alt={user.name ?? ''} size="md" class="{hide_image_on_mobile ? 'hidden md:unset' : ''}" />
    <div>
        <h3 class="text-lg font-semibold">{user.name}</h3>
    </div>
</a>