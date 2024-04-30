<script lang="ts">
    import { ShareNodesSolid } from 'flowbite-svelte-icons';
    import { Button } from 'flowbite-svelte'

    export let title = '';
    export let share_content = '';

    function share() {
        if (navigator.share) {
            navigator.share({
                title: title,
                text: share_content,
                url: window.location.href
            })
                .then(() => console.log('Successful share'))
                .catch((error) => console.log('Error sharing', error));
        } else {
            console.log('Web Share API not supported');
        }
    }
</script>

<Button color="alternative" on:click={share}>
    <ShareNodesSolid />
    <span class="ml-2">Teilen</span>
</Button>