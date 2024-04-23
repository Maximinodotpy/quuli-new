<script lang="ts">
    import PageHeaderArea from "$lib/Components/PageHeaderArea.svelte";
    import type { PageData } from "./$types";
    import type { Question, QuestionStatus } from "@prisma/client";
    import { jsonToFormData } from "$lib/helpers";

    export let data: PageData;

    console.log(data);

    type InteractiveQuestion = Question & {
        selected?: boolean,
        isLoading?: boolean,
    };

    export let questions: InteractiveQuestion[] = data.questions;

    let bulkActions = [
        {
            'group': 'Sichtbarkeit',
            'actions': [
                { name: 'Verbergen', action: hideSelectedQuestions },
                { name: 'Anzeigen', action: showSelectedQuestions }
            ]
        },
        {
            'group': 'Kategorie setzen',
            'actions': data.categories.map(c => ({ name: c.name, action: () => {
                setBulkCategory(c.id);
            } }))
        }
    ];
    let currentBulkAction: string = 'null';

    function selectAll() {
        questions = questions.map(q => ({ ...q, selected: true }));
    }

    function selectNone() {
        questions = questions.map(q => ({ ...q, selected: false }));
    }

    function invertSelection() {
        questions = questions.map(q => ({ ...q, selected: !q.selected }));
    }

    function getAllSelectedQuestions() {
        return questions.filter(q => q.selected);
    }

    function bulkActionCallback() {
        let action_group = bulkActions.find(a => a.actions.find(a => a.name == currentBulkAction));
        let action = action_group?.actions.find(a => a.name == currentBulkAction);

        if (action) {
            action.action();
        }
    }

    function toggleQuestionStatus(question_id: string, force: 'DELETED' | 'NORMAL' | null = null) {
        console.log('Toggling question status ...');
        
        // @ts-ignore
        let status = questions.find(q => q.id == question_id).status == 'DELETED' ? 'NORMAL' : 'DELETED';

        if (force) {
            status = force;
        }

        // Set question to loading
        questions = questions.map(q => {
            if (q.id == question_id) {
                q.isLoading = true;
            }
            return q;
        });

        console.log('Desired status:', status);

        fetch(`/api/questions/set-question-status`, {
            method: "POST",
            body: jsonToFormData({ question_id, status })
        }).then(re => re.json()).then(new_question => {
            questions = questions.map(q => {
                if (q.id == question_id) {
                    new_question.selected = q.selected;
                    return new_question;
                }
                
                return q;
            });
        });
    }

    function setBulkCategory(category_id: string) {
        getAllSelectedQuestions().forEach(q => {
            setQuestionCategory(q.id, category_id);
        });
    }

    function setQuestionCategory(question_id: string, category_id: string) {
        console.log('Setting question category ...');

        // Set question to loading
        questions = questions.map(q => {
            if (q.id == question_id) {
                q.isLoading = true;
            }
            return q;
        });

        fetch(`/api/questions/set-question-category`, {
            method: "POST",
            body: jsonToFormData({ question_id, new_category_id: category_id })
        }).then(re => re.json()).then((new_question) => {
            questions = questions.map(q => {
                if (q.id == question_id) {
                    new_question.selected = q.selected;
                    return new_question;
                }
                return q;
            })
        }); 
    }

    function hideSelectedQuestions() {
        getAllSelectedQuestions().forEach(q => {
            toggleQuestionStatus(q.id, 'DELETED');
        });
    }

    function showSelectedQuestions() {
        getAllSelectedQuestions().forEach(q => {
            toggleQuestionStatus(q.id, 'NORMAL');
        });
    }
</script>

<PageHeaderArea title="Vorgeschlagene Fragen" text="Bearbeite hier deine vorgeschlagenen Fragen." />

<!-- <div class="mb-4">
    <input type="text" placeholder="Suche">

    <select name="" id="">
        <option value="0">Alle Kategorien</option>
        {#each data.categories as category}
            <option value={category.id}>{category.name}</option>
        {/each}
    </select>

    <input type="checkbox" name="hide_hidden" id="hide_hidden">
    <label for="hide_hidden">Verborgene Fragen nicht anzeigen</label>
</div> -->

<div class="sticky md:-top-8 -top-4 bg-green-200 dark:bg-green-800 p-3 flex gap-4 items-center">
    <div>{ questions.filter(q => q.selected).length }/{ questions.length } Fragen Ausgewählt</div>

    <div class="flex gap-2">
        <button on:click={selectAll}>Alle</button>
        <button on:click={selectNone}>Keine</button>
        <button on:click={invertSelection}>Invertieren</button>
    </div>

    <div class="ml-auto flex gap-3 items-center">
        <div>Massenaktionen</div>

        <select name="" id="" bind:value={currentBulkAction}>
            {#each bulkActions as action}
                <optgroup label={action.group}>
                    {#each action.actions as a}
                        <option value={a.name}>{a.name}</option>
                    {/each}
                </optgroup>
            {/each}
        </select>

        <button on:click={bulkActionCallback}>Ausführen</button>
    </div>
</div>

<div class="flex flex-col divide-y-2 divide-gray-700">
    {#each questions as question}
        <div class="flex justify-between p-4 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all whitespace-nowrap { question.isLoading ? 'animate-pulse text-blue-500': '' }">
            <div class="flex items-center gap-2 { question.status == 'DELETED'? 'line-through text-red-500': '' }">
                <input type="checkbox" name="" id="" style="aspect-ratio: 1/1;" class="h-full shrink-0 aspect-square" bind:checked={question.selected}>
                <h3>{question.question}</h3>
            </div>
            <div class="w-[60%] flex justify-between">
                <p>{question.answer}/{question?.category?.name}</p>
                <div class="grid grid-cols-2 gap-4 w-[40%]">
                    <a href={`/fragen/bearbeiten/${question.id}`}>Bearbeiten</a>
                    <button on:click={() => { toggleQuestionStatus(question.id) }}>
                        {#if question.status == 'DELETED'}
                            Anzeigen
                        {:else}
                            Verbergen
                        {/if}
                    </button>
                </div>
            </div>
        </div>
    {/each}
</div>