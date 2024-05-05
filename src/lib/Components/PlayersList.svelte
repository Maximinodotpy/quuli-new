<script lang="ts">
    import type { User } from "@prisma/client";
    import ImageAspectContainer from "./ImageAspectContainer.svelte";
    import { getPlaceholderImage } from "$lib/helpers";

    export let users: User[] = [];
</script>

<div class="grid">
    {#each users as user}
        <a class="p-4 flex items-center gap-4 hover:bg-gray-100 dark:hover:bg-gray-900" href="/profil/{user.id}">
            <div class="w-24 md:w-24">
                <ImageAspectContainer image={user.image ?? getPlaceholderImage(user?.name ?? '', 800)} aspectRatio={1}  />
            </div>
            <div class="flex flex-col">
                <h2 class="text-lg font-semibold">{user.name}</h2>
            </div>
        </a>
    {:else}
        <p class="mb-6">Keine Benutzer ...</p>
    {/each}
</div>
