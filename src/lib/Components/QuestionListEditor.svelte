<script lang="ts">
    import PageHeaderArea from "$lib/Components/PageHeaderArea.svelte";
    import type { Question, Category } from "@prisma/client";
    import { jsonToFormData } from "$lib/helpers";
    import { Input, Select, CheckboxButton, Dropdown, DropdownItem, Button, Checkbox } from "flowbite-svelte";
    import { getCategories } from "$lib/helpers";
    import { GO_BACK_TO } from "$lib/const";
    import { page } from "$app/stores";
    import { SHORTCUTS } from "$lib/const";
    import { onDestroy, onMount } from "svelte";
    import { PenSolid, EyeSolid, EyeSlashSolid } from "flowbite-svelte-icons";
    import { browser } from "$app/environment";

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
    export let categoriesEnabled: boolean = true;

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

    if (categoriesEnabled) {
        getCategories().then(cat => {
            categories = cat;
            console.log(categories);
    
            bulkActions[1].actions = categories.map(c => ({
                name: c.name,
                action: () => setBulkCategory(c.id)
            }));
        })
    } else {
        bulkActions.splice(1, 1);
    }

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

    onMount(() => {
        // Shortcuts
        if (browser) {
            document.addEventListener('keydown', (e) => {                
                if (document?.activeElement?.tagName == 'INPUT') {
                    console.log('Input is focused so no shortcuts will be executed');
                } else {
                    console.log('Executing shortcut ...');

                    if (e.key == SHORTCUTS.select_all.key) {
                        selectAll();
                    } else if (e.key == SHORTCUTS.deselect_all.key) {
                        selectNone();
                    } else if (e.key == SHORTCUTS.invert_selection.key) {
                        invertSelection();
                    } else if (e.key == SHORTCUTS.hide_selected_questions.key) {
                        hideSelectedQuestions();
                    } else if (e.key == SHORTCUTS.unhide_selected_questions.key) {
                        showSelectedQuestions();
                    }
                }
                    
            });  
        }
    });

    onDestroy(() => {
        document.removeEventListener('keydown', () => {});
    });


</script>

<div class="mb-4 flex flex-col lg:flex-row gap-3 whitespace-nowrap">
    <Input type="text" placeholder="Suche" bind:value={search_string} />

    {#if categoriesEnabled}
        <Select name="" id="" bind:value={category_filter}>
            <option value="0">Alle Kategorien</option>
            {#each categories as category}
                <option value={category.id}>{category.name}</option>
            {/each}
        </Select>
    {/if}

    <CheckboxButton color="alternative" bind:checked={hide_hidden}>Verborgene Fragen nicht anzeigen</CheckboxButton>
</div>

<div class="sticky md:-top-[33px] -top-4 border shadow-md dark:border-slate-700 bg-white dark:bg-gray-800 p-3 flex gap-4 items-center rounded-xl z-20">
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

<div class="flex flex-col divide-y-[1px] divide-gray-300 dark:divide-gray-700 max-w-full overflow-hidden">
    {#each sought_after as question}
        <div class="grid grid-cols-5 gap-3 py-2 lg:py-4 hover:bg-gray-100 dark:hover:bg-gray-900 group whitespace-nowrap { question.isLoading ? 'animate-pulse text-blue-500': '' } { question.status == 'DELETED'? 'line-through !text-red-500': '' }">
            <div class="flex items-center col-span-4 md:col-span-3 gap-2 pl-1 overflow-hidden relative">
                <Checkbox bind:checked={question.selected}>{question.question}</Checkbox>
                
                <div class="absolute top-0 right-0 h-full w-16 bg-gradient-to-r from-transparent to-white dark:to-gray-800 to-60% group-hover:to-gray-100 dark:group-hover:to-gray-900"></div>
            </div>
            <div class="hidden md:block relative overflow-hidden">
                {question.answer}
                <div class="absolute top-0 right-0 h-full w-16 bg-gradient-to-r from-transparent to-white dark:to-gray-800 to-60% group-hover:to-gray-100 dark:group-hover:to-gray-900"></div>
                {#if categoriesEnabled}
                    <span class="text-xs text-gray-500 dark:text-gray-400">{question?.category?.name}</span>
                {/if}
            </div>
            <div class="gap-4 flex opacity-25 group-hover:opacity-100 justify-end pr-4">
                <a href={`/fragen/bearbeiten/${question.id}?${GO_BACK_TO}=${$page.url.pathname}`}><PenSolid size="lg" title={{
                    id: 'Bearbeiten',
                    title: 'Bearbeiten'
                }} /></a>
                <button on:click={() => { toggleQuestionStatus(question.id) }}>
                    {#if question.status == 'DELETED'}
                        <EyeSolid size="lg" title={{
                            id: 'Anzeigen',
                            title: 'Anzeigen'
                        }} />
                    {:else}
                        <EyeSlashSolid size="lg" title={{
                            id: 'Verstecken',
                            title: 'Verstecken'
                        }} />
                    {/if}
                </button>
            </div>
        </div>
    {/each}
</div>