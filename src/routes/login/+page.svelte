<script>
    import { signIn, signOut } from "@auth/sveltekit/client";
    import { page } from "$app/stores";

    import { Heading, P, Button } from "flowbite-svelte";
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";

    onMount(() => {
        if ($page.data.session) {
            goto("/profil");
        }
    });
</script>

<div class="mb-6">
    <Heading class="mb-4">Anmelden</Heading>
    <P>Melde dich an um noch mehr Features von Quuli freizuschalten!</P>
</div>

<div>
    <!-- { JSON.stringify($page.data.session) } -->
    <div class="flex flex-col gap-2 justify-start items-start">
        <Button
            class="buttonPrimary"
            on:click={() => signIn("nodemailer")}
        >Anmelden über E-Mail</Button>
        
        <Button
            color="dark"
            on:click={() => signIn("github")}
        >Anmelden über Github</Button>
    </div>
</div>
