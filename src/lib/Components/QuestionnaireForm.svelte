<script lang="ts">
    import { Button } from "flowbite-svelte";
    import TextInputContainer from "$lib/Components/FormElements/TextInputContainer.svelte";
    import UserChooserContainer from "./FormElements/UserChooserContainer.svelte";
    import CheckboxInputContainer from "./FormElements/CheckboxInputContainer.svelte";
    import SelectContainer from "./FormElements/SelectContainer.svelte";
    import type { Questionnaire } from "@prisma/client";

    type QuestionnaireWithUsers = Questionnaire & {
        editors: string[];
        members: string[];
    };

    let questionnaire: QuestionnaireWithUsers = {
        name: "",
        description: "",
        editors: [],
        members: [],
        visibility: "PRIVATE",
        id: ''
    };
</script>

<div>
    <form action="?/create_questionnaire" class="flex flex-col gap-8" method="post">
        <TextInputContainer title="Name" id="name" description="" bind:value={questionnaire.name} required={true} />
        <TextInputContainer title="Beschreibung" id="description" description="" text_type="textcontainer"/>
    
        <UserChooserContainer title="Bearbeitende" id="editors" description=""/>
        <SelectContainer title="Sichtbarkeit" id="visibility" description="" selected="PRIVATE" options={[{label: "Öffentlich", value: "PUBLIC"}, {label: "Privat", value: "PRIVATE"}]}/>
        <UserChooserContainer title="Mitglieder" id="members" description=""/>
    
        <div>
            <Button type="submit">Erstellen</Button>
        </div>

        {questionnaire.name}

        <input type="submit" value="Einreichen">
    </form>
</div>