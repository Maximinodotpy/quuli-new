<script lang="ts">
    import { Label } from "flowbite-svelte";
    export let id: string;
    export let title: string;
    export let description: string = '';
</script>

<div class="grid grid-cols-2 items-center gap-8">
    <div>
        <Label for={id} class="text-xl font-semibold">{ title }</Label>
        <p class="text-gray-500 dark:text-gray-400 text-sm">
            {@html description }
        </p>
    </div>
    
    <div>
        <slot />
    </div>
</div>