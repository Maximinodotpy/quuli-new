<script lang="ts">
    import { Input, Label, Textarea } from "flowbite-svelte";
    import InputContainer from "$lib/Components/FormElements/InputContainer.svelte";
    export let id: string;
    export let title: string;
    export let description: string = '';

    type inputTypes = "text" | "email" | "password" | "number" | "tel" | "url" | "textcontainer";
    export let text_type: inputTypes = "text";

    export let value: string = '';

    export let required: boolean = false;
</script>

<InputContainer id={id} title={title} description={description} >
    <div>
        {#if text_type === "textcontainer"}
            <Textarea name={id} id={id} bind:value={value} required={required}/>
        {:else}
            <Input name={id} id={id} type={text_type} bind:value={value} required={required}/>
        {/if}
    </div>
</InputContainer>
