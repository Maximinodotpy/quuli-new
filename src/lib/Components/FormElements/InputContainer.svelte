<script lang="ts">
    import { Label } from "flowbite-svelte";
    export let id: string;
    export let title: string;
    export let description: string = '';

    console.log($$props);
    
</script>

<div class="grid grid-cols-2">
    <div>
        <Label for={id} class="text-xl font-semibold">{ title }</Label>
        <p class="text-gray-500 dark:text-gray-400 text-sm">{ description }</p>
    </div>
    
    <div>
        <slot />
    </div>
</div>