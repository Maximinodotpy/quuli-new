<script lang="ts">
    import PageHeaderArea from "$lib/Components/PageHeaderArea.svelte";
    import type { Question, Category } from "@prisma/client";
    import { jsonToFormData } from "$lib/helpers";
    import { Input, Select, CheckboxButton, Dropdown, DropdownItem, Button } from "flowbite-svelte";
    import { getCategories } from "$lib/helpers";

    type InteractiveQuestion = Question & {
        selected?: boolean,
        isLoading?: boolean,
    };

    export let questions: InteractiveQuestion[] = [];

    let sought_after: InteractiveQuestion[] = [];

    // Search String
    let search_string: string = '';
    // Category Filter
    let category_filter: string = '0';
    // Hide Hidden
    let hide_hidden: boolean = true;

    let categories: Category[] = []

    $: {
        console.log('');
        console.log('Filtering questions ...');

        console.log('Old Amount: ', questions.length);
        
        sought_after = questions.filter(q => {
            if (search_string.length > 0 && !q.question.toLowerCase().includes(search_string.toLowerCase())) {
                return false;
            }

            // Hide hidden questions if the user wants
            if (hide_hidden && q.status == 'DELETED') {
                return false;
            }

            if (category_filter != '0' && q.categoryId != category_filter) {
                return false;
            }

            return true
        });

        console.log('New Amount: ', sought_after.length);

        // Unselect all that are not visible
        sought_after = sought_after.map(q => {
            if (!questions.find(qq => qq.id == q.id)) {
                return { ...q, selected: false };
            }

            return q;
        });
    }

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
            'actions': []
        }
    ];
    let currentBulkAction: string = 'null';

    getCategories().then(cat => {
        categories = cat;
        console.log(categories);

        bulkActions[1].actions = categories.map(c => ({
            name: c.name,
            action: () => setBulkCategory(c.id)
        }));
    })

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
        return sought_after.filter(q => q.selected);
    }

    function bulkActionCallback() {
        let action_group = bulkActions.find(a => a.actions.find(a => a.name == currentBulkAction));
        let action = action_group?.actions.find(a => a.name == currentBulkAction);

        console.log(getAllSelectedQuestions(), 'fasdf');

        if (action) {
            action.action();
        }
    }

    function toggleQuestionStatus(question_id: string, force: 'DELETED' | 'NORMAL' | null = null) {
        console.log('Toggling question status ...');
        
        // @ts-ignore
        let status = sought_after.find(q => q.id == question_id).status == 'DELETED' ? 'NORMAL' : 'DELETED';

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

<div class="mb-4 flex flex-col lg:flex-row gap-3 whitespace-nowrap">
    <Input type="text" placeholder="Suche" bind:value={search_string} />

    <Select name="" id="" bind:value={category_filter}>
        <option value="0">Alle Kategorien</option>
        {#each categories as category}
            <option value={category.id}>{category.name}</option>
        {/each}
    </Select>

    <CheckboxButton color="alternative" bind:checked={hide_hidden}>Verborgene Fragen nicht anzeigen</CheckboxButton>
</div>

<div class="sticky md:-top-8 -top-4 border shadow-md dark:border-gray-600 bg-white dark:bg-slate-800 p-3 flex gap-4 items-center">
    <Button color="alternative">
        { sought_after.filter(q => q.selected).length }/{ sought_after.length } sichtbare Fragen Ausgewählt
    </Button>
    <Dropdown>
        <DropdownItem on:click={selectAll} >Alles auswählen</DropdownItem>
        <DropdownItem on:click={selectNone}>Alles abwählen</DropdownItem>
        <DropdownItem on:click={invertSelection}>Auswahl umkehren</DropdownItem>
    </Dropdown>

    <div class="ml-auto flex gap-3 items-center">
        <!-- <div>Massenaktionen</div> -->

        <Select name="" id="" bind:value={currentBulkAction}>
            {#each bulkActions as action}
                <optgroup label={action.group}>
                    {#each action.actions as a}
                        <option value={a.name}>{a.name}</option>
                    {/each}
                </optgroup>
            {/each}
        </Select>

        <button on:click={bulkActionCallback}>Ausführen</button>
    </div>
</div>

<div class="flex flex-col divide-y-[1px] divide-gray-300 max-w-full overflow-hidden">
    {#each sought_after as question}
        <div class="flex flex-col lg:flex-row justify-between p-2 lg:p-4 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all whitespace-nowrap { question.isLoading ? 'animate-pulse text-blue-500': '' }">
            <div class="flex items-center gap-2 overflow-hidden max-w-full { question.status == 'DELETED'? 'line-through text-red-500': '' }">
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