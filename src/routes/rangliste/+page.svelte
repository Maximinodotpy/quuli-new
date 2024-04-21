<script lang="ts">
    import {} from "flowbite-svelte";
    import PageHeaderArea from "$lib/Components/PageHeaderArea.svelte";
    import type { PageData } from "./$types";
    import RankingList from "$lib/Components/RankingList.svelte";

    export let data: PageData

    console.log(data);
</script>

<PageHeaderArea title="Rangliste" text="Hier findest du heraus, wer die grössten Besserwisser und die fleissigsten Bienchen sind auf Quuli." />

<div class="grid md:grid-cols-2 gap-10">
    <RankingList title="Meiste Fragen vorgeschlagen" users={data.ranked_submitted_questions} whereRankedInfo={user => user.Questions.length} />
    <RankingList title="Meiste Korrekte Fragen" users={data.ranked_correct_answers} whereRankedInfo={user => user.Responses.length} />
</div>

<!-- Meiste Beantwortungen
Meiste Richtigen Antworten
Meiste Falsche Antworten 
Längste Streaks
Meiste vorgeschlagenen Fragen -->