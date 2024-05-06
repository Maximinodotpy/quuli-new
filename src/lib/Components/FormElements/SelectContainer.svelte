<script lang="ts">
    import { Select } from "flowbite-svelte";
    import InputContainer from "$lib/Components/FormElements/InputContainer.svelte";
    export let id: string;
    export let title: string;
    export let description: string = '';

    export let options: { label: string, value: string }[] = [];
    export let selected: string = '';
</script>

<InputContainer id={id} title={title} description={description} >
    <Select id={id} bind:value={selected} name={id} >
        {#each options as option}
            <option value={option.value}>{option.label}</option>
        {/each}
    </Select>
</InputContainer>
