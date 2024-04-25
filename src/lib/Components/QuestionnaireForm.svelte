<script lang="ts">
    import TextInputContainer from "$lib/Components/FormElements/TextInputContainer.svelte";
    import { Button } from "flowbite-svelte";
    import UserChooserContainer from "./FormElements/UserChooserContainer.svelte";
</script>

<div class="flex flex-col gap-8">
    <TextInputContainer title="Name" id="name" description="" />
    <TextInputContainer title="Beschreibung" id="description" description="" text_type="textcontainer"/>

    <UserChooserContainer title="Bearbeitende" id="editors" description=""/>
    <UserChooserContainer title="Sichtbarkeit" id="visibility" description=""/>
    <UserChooserContainer title="Mitglieder" id="members" description=""/>

    <div>
        <Button>Erstellen</Button>
    </div>
</div>