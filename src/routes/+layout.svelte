<script lang="ts">
    import "../app.pcss";
    import { page } from '$app/stores';
    import { 
        Sidebar, 
        SidebarGroup, 
        SidebarItem, 
        SidebarWrapper, 
        SidebarDropdownWrapper, 
        SidebarDropdownItem,
        Button,
        DarkMode,
        Input,
        Avatar,
        Dropdown,
        DropdownHeader,
        DropdownItem,
        DropdownDivider,
        NavHamburger,
     } from 'flowbite-svelte';
     import { signOut } from "@auth/sveltekit/client";
    import { onMount } from "svelte";
    import { QuestionCircleSolid, StarSolid, HomeSolid, PlaySolid, BookmarkSolid } from 'flowbite-svelte-icons';
    import { createPersistentStore } from "$lib/helpers";
    import { writable } from "svelte/store";
    import { navigating } from "$app/stores";
    import { slide } from "svelte/transition";
    import { expoOut } from "svelte/easing";
    import Footer from "$lib/Components/Footer.svelte";
    import { pwaInfo } from 'virtual:pwa-info'; 

    $: webManifestLink = pwaInfo ? pwaInfo.webManifest.linkTag : '' 

     let showSidebar = false;


     // Close sidebar on page change
        page.subscribe((value) => {
            showSidebar = false;
        });

     let isFragenDropdownOpen = writable(false);

     onMount(() => {
        // Set showSidebar to false on page size change
        window.addEventListener('resize', () => {
            showSidebar = false;
        });

        isFragenDropdownOpen = createPersistentStore('isFragenDropdownOpen', false)
     });


    $: activeUrl = $page.url.pathname;

    console.log(page);
</script>

<svelte:head> 
 	{@html webManifestLink} 
</svelte:head>

{#if $navigating}
    <!-- 
    Loading animation for next page since svelte doesn't show any indicator. 
    - delay 100ms because most page loads are instant, and we don't want to flash 
    - long 12s duration because we don't actually know how long it will take
    - exponential easing so fast loads (>100ms and <1s) still see enough progress,
        while slow networks see it moving for a full 12 seconds
    -->
    <div class="navigation-loader bg-gray-700 dark:bg-gray-300" in:slide={{ delay: 100, duration: 12000, axis: "x", easing: expoOut }}>
        { JSON.stringify($navigating) }
    </div>
{/if}

<div class="h-[100svh] flex flex-col overflow-hidden">
    <div class="shrink-0 sticky top-0 p-2 pt-3 flex border-b dark:border-slate-700 bg-white dark:bg-slate-800 z-20 items-center">
        <NavHamburger onClick={() => showSidebar = !showSidebar}/>

        <div class="text-2xl w-64 pl-4 font-bold">
            QUULI
        </div>

        <div class="grow pr-20 max-w-96 hidden">
            <Input placeholder="Suche" />
        </div>

        <div class="flex items-center gap-3 grow justify-end">
            {#if $page.data.session}
                <Avatar id="user-drop" src="{$page.data.session.user?.image ?? ''}" class="cursor-pointer" />
                <Dropdown triggeredBy="#user-drop" placement="bottom-start">
                    <DropdownHeader>
                        <span class="block text-sm">{$page.data.session.user?.name}</span>
                        <span class="block truncate text-sm font-medium">{$page.data.session.user?.email}</span>
                    </DropdownHeader>
                    <DropdownItem href="/profil/{$page.data?.session?.user?.id}">Profil</DropdownItem>
                    <DropdownItem href="/profil/einstellungen">Einstellungen</DropdownItem>
                    <DropdownItem href="/profil/vorgeschlagene-fragen">Vorgeschlagene Fragen</DropdownItem>
                    <DropdownDivider />
                    <DropdownItem>
                        <button on:click={(e) => signOut()}>Abmelden</button>
                    </DropdownItem>
                </Dropdown>
            {:else}
                <Button href="/login">Anmelden</Button>
            {/if}
            <DarkMode />
        </div>
    </div>

    <div class="flex grow overflow-hidden">
        <div class="w-64 border-r h-full dark:border-slate-700 {showSidebar ? 'flex': 'hidden'} md:flex absolute md:static bg-white dark:bg-slate-800 z-20 flex-col justify-between">
            <Sidebar activeUrl={activeUrl}>
                <SidebarWrapper divClass="h-full p-2">
                    <SidebarGroup title="Group 1">
                        <SidebarItem label="Home" href="/">
                            <svelte:fragment slot="icon">
                                <HomeSolid class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                            </svelte:fragment>
                        </SidebarItem>
                        <SidebarItem label="Zum Quiz" href="/quiz">
                            <svelte:fragment slot="icon">
                                <PlaySolid class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                            </svelte:fragment>
                        </SidebarItem>
                        <SidebarItem label="Kategorien" href="/kategorien">
                            <svelte:fragment slot="icon">
                                <BookmarkSolid class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                            </svelte:fragment>
                        </SidebarItem>
                        
                        <SidebarDropdownWrapper label="Fragen" bind:isOpen={$isFragenDropdownOpen}>
                            <svelte:fragment slot="icon">
                                <QuestionCircleSolid class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                            </svelte:fragment>

                            <SidebarDropdownItem label="Vorschlagen" href="/fragen/vorschlagen"></SidebarDropdownItem>
                            <!-- <SidebarDropdownItem label="Exportieren als PDF" href="/fragen/pdf-export"></SidebarDropdownItem> -->
                            <!-- <SidebarDropdownItem label="Fragebögen"></SidebarDropdownItem> -->
                        </SidebarDropdownWrapper>

                        <SidebarItem label="Rangliste" href="/rangliste">
                            <svelte:fragment slot="icon">
                                <StarSolid class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                            </svelte:fragment>
                        </SidebarItem>
                    </SidebarGroup>
                    
                    <SidebarGroup title="About" border>
                        <SidebarItem label="Über Quuli" href="/ueber"></SidebarItem>
                        <SidebarItem label="Kontakt" href="/kontakt"></SidebarItem>
                    </SidebarGroup>
                </SidebarWrapper>
            </Sidebar>

            <!-- <div class="p-4">
                <Button class="w-full">App Herunterladen</Button>
            </div> -->
        </div>

        <button class="bg-neutral-900/50 absolute left-0 w-full h-full z-10 {showSidebar ? 'block': 'hidden'} md:hidden" on:click={() => { showSidebar = false }}></button>

        <div class="w-full h-full overflow-y-auto p-4 md:p-8">
            <slot></slot>
            <div class="pt-24"><Footer /></div>
        </div>

    </div>
</div>

<style lang="css">
    .navigation-loader {
      position: fixed;
      top: 0;
      right: 0;
      left: 0;
      height: 5px;
      z-index: 50;
    }
</style>