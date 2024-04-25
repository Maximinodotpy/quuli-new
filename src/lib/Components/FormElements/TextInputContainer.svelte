<script lang="ts">
    import { Input, Label, Textarea } from "flowbite-svelte";
    import InputContainer from "$lib/Components/FormElements/InputContainer.svelte";
    export let id: string;
    export let title: string;
    export let description: string;

    type inputTypes = "text" | "email" | "password" | "number" | "tel" | "url" | "textcontainer";
    export let text_type: inputTypes = "text";
</script>

<InputContainer id={id} title={title} description={description} >
    <div>
        {#if text_type === "textcontainer"}
            <Textarea id={id}/>
        {:else}
            <Input id={id} type={text_type} />
        {/if}
    </div>
</InputContainer>
