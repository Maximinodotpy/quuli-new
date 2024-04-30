<script lang="ts">
    export let aspectRatio: number = 2;
    export let image: string = '';
</script>

<div class="w-full bg-gray-500 overflow-hidden relative rounded-xl" style="aspect-ratio: {aspectRatio}/1;">
    <img src={image} alt="" class="h-full w-full object-cover absolute top-0 left-0 blur-md">
    <img src={image} alt="" class="h-full w-full object-contain absolute top-0 left-0">
</div>