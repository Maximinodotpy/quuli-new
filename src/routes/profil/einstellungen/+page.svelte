<script lang="ts">
    import PageHeaderArea from "$lib/Components/PageHeaderArea.svelte";
    import { Button, Input, Fileupload } from "flowbite-svelte";
    import type { PageData } from "./$types";
    import TextInputContainer from "$lib/Components/FormElements/TextInputContainer.svelte";
    import { enhance } from "$app/forms";

    export let data: PageData;
</script>


<form action="?/edit_user" method="post">
    <div class="max-w-4xl mx-auto flex flex-col gap-12">
        <PageHeaderArea title="Profil Einstellungen" text="" />
        
        <TextInputContainer id="username" title="Benutzername" bind:value={data.session.user.name} />
        <TextInputContainer id="image" title="Profilbild URL" bind:value={data.session.user.image} />

        <div class="flex justify-end">
            <Button type="submit">Speichern</Button>
        </div>
    </div>
</form>