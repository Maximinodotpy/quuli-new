<script lang="ts">
    import { Button } from "flowbite-svelte";
    import TextInputContainer from "$lib/Components/FormElements/TextInputContainer.svelte";
    import UserChooserContainer from "./FormElements/UserChooserContainer.svelte";
    import SelectContainer from "./FormElements/SelectContainer.svelte";
    import type { Questionnaire, User } from "@prisma/client";
    import { PUT_IMAGE_ON_IMGUR } from "$lib/const";

    type QuestionnaireWithUsers = Questionnaire & {
        editorIds: string[];
        editors?: User[];
        memberIds: string[];
        members?: User[];
    };

    export let questionnaire: QuestionnaireWithUsers = {
        name: "",
        description: "",
        editorIds: [],
        memberIds: [],
        visibility: "PRIVATE",
        id: ''
    };

    export let form_action: string = '?/create_questionnaire'
</script>

<div>
    <form action={form_action} class="flex flex-col gap-8" method="post">
        <TextInputContainer title="Name" id="name" description="" bind:value={questionnaire.name} required={true} />
        
        <TextInputContainer title="Bild" id="image" description="{PUT_IMAGE_ON_IMGUR}" bind:value={questionnaire.image} />

        <TextInputContainer title="Beschreibung" id="description" description="" text_type="textcontainer" bind:value={questionnaire.description}/>
    
        <UserChooserContainer title="Bearbeitende" id="editors" description="" chosen_users={questionnaire.editors}/>
        <SelectContainer title="Sichtbarkeit" id="visibility" description="" selected={questionnaire.visibility} options={[{label: "Öffentlich", value: "PUBLIC"}, {label: "Privat", value: "PRIVATE"}]}/>
        <UserChooserContainer title="Mitglieder" id="members" description="" chosen_users={questionnaire.members}/>
    
        <div>
            <Button type="submit">Absenden</Button>
        </div>
    </form>
</div>