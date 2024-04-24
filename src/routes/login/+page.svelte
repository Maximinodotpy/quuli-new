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
    let password = "";

    let isUsingCredentials = false;

    onMount(() => {
        if ($page.data.session) {
            goto("/profil/" + $page?.data?.session?.user?.id);
        }
    });
</script>

<div class="max-w-lg mx-auto h-full flex items-center">
    <div>
        <div class="mb-6">
            <Heading class="mb-4 text-center">Anmelden</Heading>
            <P>Melde dich an, um noch mehr Features von Quuli freizuschalten! Verwende dazu einfach deine E-Mail Adresse. Du wirst dann einen Link erhalten der dich anmeldet bzw. registriert. Falls du gerade keinen Zugangn zu deiner Mail hast um etwas zu bestätigen dann kannst du dich auch <span class="underline hover:cursor-pointer" on:click={() => { isUsingCredentials = false }}>per E-Mail und Password anmelden</span>.</P>
        </div>
        
        <div>
            <!-- { JSON.stringify($page.data.session) } -->
            <div class="flex flex-col gap-8 justify-start items-center">
        
                <Card class="w-full">
                    <form on:submit={(e) => {
                        console.log("submit");

                        if (isUsingCredentials) {
                            signIn("credentials", { email, password });
                        } else {
                            signIn("nodemailer", { email });
                        }

                        e.preventDefault();
                    }} class="flex flex-col gap-4">

                        <Input
                            type="email"
                            placeholder="E-Mail"
                            bind:value={email}
                            required
                        />

                        {#if isUsingCredentials}
                            <Input
                                type="text"
                                placeholder="Password"
                                bind:value={password}
                                required={isUsingCredentials}
                            />
                        {/if}

                        <Button type="submit">
                            Anmelden über E-Mail
                            { isUsingCredentials ? " und Passwort" : ""}
                        </Button>
                    </form>
                </Card>
        
                <div>Oder ...</div>
        
                <div class="flex flex-col w-full max-w-sm px-6 gap-2">
                    <Button
                        color="dark"
                        on:click={() => signIn("github")}
                    >Anmelden über Github</Button>
                    <!-- <Button
                        color="alternative"
                        on:click={() => isUsingCredentials = !isUsingCredentials}
                    >
                        {isUsingCredentials ? "Anmelden über E-Mail und Password" : "Anmelden über E-Mail"}
                        {isUsingCredentials}
                    </Button> -->
                </div>
            </div>
        </div>
    </div>
</div>
