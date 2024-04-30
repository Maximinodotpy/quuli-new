<script lang="ts">
    import PageHeaderArea from "$lib/Components/PageHeaderArea.svelte";
    import type { PageData } from "./$types";
    import {
        Tabs,
        TabItem,
        Button
    } from "flowbite-svelte"
    import QuestionnairesList from "$lib/Components/QuestionnairesList.svelte";

    export let data: PageData
</script>

<PageHeaderArea title="Meine Fragebögen" text="Hier siehst du alle Fragebögen die du entweder erschaffen hast, bearbeiten darfst oder ein Mitglied davon bist." />

<!-- <pre>{ JSON.stringify(data, null, 2) }</pre> -->

<div class="flex flex-col">
    <Tabs style="underline">
        <TabItem title="Erschaffen" open>
            <div class="mb-8">
                <QuestionnairesList questionnaires={data.questionnaires} />
            </div>

            <Button href="/fragebogen/neu">Fragebogen erstellen</Button>
        </TabItem>
        <TabItem title="Bearbeiten">
            <QuestionnairesList questionnaires={data.questionnairesEditor} />
        </TabItem>
        <TabItem title="Mitglied">
            <QuestionnairesList questionnaires={data.questionnairesMember} />
        </TabItem>
    </Tabs>
</div>