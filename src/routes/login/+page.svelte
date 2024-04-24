<script>
    import { signIn, signOut } from "@auth/sveltekit/client";
    import { page } from "$app/stores";

    import { 
        Heading, 
        P, 
        Button,
        Input,
        Card,
     } from "flowbite-svelte";
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";

    let email = "";

    onMount(() => {
        if ($page.data.session) {
            goto("/profil/" + $page?.data?.session?.user?.id);
        }
    });
</script>

<div class="max-w-sm mx-auto h-full flex items-center">
    <div>
        <div class="mb-6">
            <Heading class="mb-4 text-center">Anmelden</Heading>
            <P>Melde dich an, um noch mehr Features von Quuli freizuschalten! Verwende dazu einfach deine E-Mail Adresse.</P>
        </div>
        
        <div>
            <!-- { JSON.stringify($page.data.session) } -->
            <div class="flex flex-col gap-8 justify-start items-center">
        
                <Card class="w-full">
                    <form on:submit={(e) => {
                        console.log("submit");

                        signIn("nodemailer", { email: email });

                        e.preventDefault();
                    }} class="flex flex-col gap-4">
                        <Input
                            type="email"
                            placeholder="E-Mail"
                            bind:value={email}
                            required
                        />

                        <Button type="submit">Anmelden über E-Mail</Button>
                    </form>
                </Card>
        
                <div>Oder ...</div>
        
                <div class="flex flex-col w-full max-w-sm px-6">
                    <Button
                        color="dark"
                        on:click={() => signIn("github")}
                    >Anmelden über Github</Button>
                </div>
            </div>
        </div>
    </div>
</div>
