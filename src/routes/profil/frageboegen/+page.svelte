<script lang="ts">
    import PageHeaderArea from "$lib/Components/PageHeaderArea.svelte";
    import type { PageData } from "./$types";
    import {
        Tabs,
        TabItem,
        Button
    } from "flowbite-svelte"

    export let data: PageData
</script>

<PageHeaderArea title="Meine Fragebögen" text="Hier siehst du alle Fragebögen die du entweder erschaffen hast, bearbeiten darfst oder ein Mitglied davon bist." />

<div class="flex flex-col">
    <Tabs>
        <TabItem title="Erschaffen" open>
            <p class="mb-6">Keine Fragebögen erstellt</p>
            <Button href="/fragebogen/neu">Jetzt erstellen</Button>
        </TabItem>
        <TabItem title="Bearbeiten">
            <div class="flex flex-col">
                <p>Keine Fragebögen bearbeiten</p>
            </div>
        </TabItem>
        <TabItem title="Mitglied">
            <div class="flex flex-col">
                <p>Keine Fragebögen als Mitglied</p>
            </div>
        </TabItem>
    </Tabs>
</div>