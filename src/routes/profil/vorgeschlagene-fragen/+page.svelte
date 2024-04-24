<script lang="ts">
    import PageHeaderArea from "$lib/Components/PageHeaderArea.svelte";
    import type { Question } from "@prisma/client";
    import { jsonToFormData } from "$lib/helpers";
    import { Input, Select, CheckboxButton, Dropdown, DropdownItem, Button } from "flowbite-svelte";
    import type { PageData } from "./$types";
    import QuestionListEditor from "$lib/Components/QuestionListEditor.svelte";

    export let data: PageData
</script>

<PageHeaderArea title="Vorgeschlagene Fragen" text="Bearbeite hier deine vorgeschlagenen Fragen." />

<QuestionListEditor questions={data.questions} />