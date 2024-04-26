<script lang="ts">
    import { Input, Checkbox } from "flowbite-svelte";
    import InputContainer from "$lib/Components/FormElements/InputContainer.svelte";
    export let id: string;
    export let title: string;
    export let description: string;

    export let checked: boolean = false;
</script>

<InputContainer id={id} title={title} description={description} >
    <Checkbox id={id} checked={checked} />
</InputContainer>
