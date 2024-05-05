<script lang="ts">
    import { NumberInput } from "flowbite-svelte";
    import InputContainer from "$lib/Components/FormElements/InputContainer.svelte";
    export let id: string;
    export let title: string;
    export let description: string = '';

    export let value: number = 0;

    export let required: boolean = false;
</script>

<InputContainer id={id} title={title} description={description} >
    <NumberInput name={id} id={id} bind:value={value} required={required}/>
</InputContainer>
