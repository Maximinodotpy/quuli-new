<script lang="ts">
    import PageHeaderArea from "$lib/Components/PageHeaderArea.svelte";
    import { Button, Input, Fileupload } from "flowbite-svelte";
    import type { PageData } from "./$types";

    export let data: PageData;
</script>


<form action="?/edit_user" method="post">
    <div class="max-w-4xl mx-auto flex flex-col gap-12">
        <PageHeaderArea title="Profil Einstellungen" text="" />
        
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