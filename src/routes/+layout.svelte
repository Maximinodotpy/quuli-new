<script>
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
        DropdownDivider
     } from 'flowbite-svelte';

     import { signOut } from "@auth/sveltekit/client";

    $: activeUrl = $page.url.pathname;
</script>

<div class="h-screen flex flex-col overflow-hidden">
    <div class="shrink-0 sticky top-0 p-2 pt-3 flex border-b dark:border-slate-700 bg-white dark:bg-slate-800 z-20 items-center">
        <div class="text-2xl w-64">
            Quuli
        </div>

        <div class="grow pr-20 max-w-96">
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
                    <DropdownItem href="/profil">Profil</DropdownItem>
                    <DropdownDivider />
                    <DropdownItem>
                        <button on:click={(e) => signOut()}>Abmelden</button>
                    </DropdownItem>
                </Dropdown>
            {:else}
                <Button color="blue" href="/login">Anmelden / Registrieren</Button>
            {/if}
            <DarkMode />
        </div>
    </div>

    <div class="flex grow overflow-hidden">
        <div class="w-64 border-r h-full dark:border-slate-700">
            <Sidebar activeUrl={activeUrl}>
                <SidebarWrapper divClass="h-full p-2">
                    <SidebarGroup title="Group 1">
                        <SidebarItem label="Home" href="/"></SidebarItem>
                        <SidebarItem label="Zum Quiz" href="/quiz"></SidebarItem>
                        
                        <SidebarDropdownWrapper label="Fragen" isOpen={true}>
                            <SidebarDropdownItem label="Vorschlagen" href="/fragen/vorschlagen"></SidebarDropdownItem>
                            <SidebarDropdownItem label="Exportieren als PDF" href="/fragen/pdf-export"></SidebarDropdownItem>
                            <SidebarDropdownItem label="Fragebögen"></SidebarDropdownItem>
                        </SidebarDropdownWrapper>

                        <SidebarItem label="Rangliste" href="/rangliste"></SidebarItem>
                        <SidebarItem label="Profil" href="/profil"></SidebarItem>
                    </SidebarGroup>
                    
                    <SidebarGroup title="About" border>
                        <SidebarItem label="Über Quuli" href="/ueber"></SidebarItem>
                        <SidebarItem label="Kontakt"></SidebarItem>
                    </SidebarGroup>
                </SidebarWrapper>
            </Sidebar>
        </div>
        <div class="p-8 w-full h-full overflow-y-scroll">
            <slot></slot>
        </div>
    </div>
</div>