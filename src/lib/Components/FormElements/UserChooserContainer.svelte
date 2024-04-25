<script lang="ts">
    import { Input, Label, Textarea } from "flowbite-svelte";
    import InputContainer from "$lib/Components/FormElements/InputContainer.svelte";
    import type { User } from "@prisma/client";
    import { jsonToFormData } from '$lib/helpers'

    export let id: string;
    export let title: string;
    export let description: string;

    let search_query: string = "";

    let current_search_results: User[] = [];

    export let chosen_users: User[] = [];

    $: {
        if (search_query.length > 0) {
            console.log("searching ...");
            
            fetch(`/api/search/users`, { method: "POST", body: jsonToFormData({ query: search_query }) })
                .then(res => res.json())
                .then(data => {
                    console.log('data', data);
                    
                    current_search_results = data.users;
                });
        }
    
    }
</script>

<InputContainer id={id} title={title} description={description} >
    <div class="relative">
        <div class="p-2 mb-2">
            {#each chosen_users as user}
                <button class="bg-gray-200 py-1 px-2 rounded-lg mr-1" on:click={() => {
                    chosen_users = chosen_users.filter(u => u.id !== user.id);
                }} >{user.name}</button>
            {/each}
        </div>

        <!-- Hidden input element that actually contains the ids of the chosen users comma seperated -->
        <input type="hidden" name={id} value={chosen_users.map(u => u.id).join(",")} />

        <div class="group">
            <Input placeholder="Nach Benutzer suchen" bind:value={search_query} />

            <div class="p-2 absolute top-[110%] bg-white z-20 group-focus-within:block hidden w-full shadow-xl border rounded-lg">
                {#if current_search_results.length > 0}
                    <ul>
                        {#each current_search_results as user}
                            <li>
                                <button on:click={() => {
                                    if (!chosen_users.find(u => u.id === user.id)) {
                                        chosen_users = [...chosen_users, user];
                                        search_query = "";
                                        current_search_results = [];
                                    }
                                }}>
                                    {user.name}
                                </button>
                            </li>
                        {/each}
                    </ul>
                {:else}
                    <p>Keine Benutzer gefunden</p>
                {/if}
            </div>
        </div>

    </div>
</InputContainer>
