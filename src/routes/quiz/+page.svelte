<script lang="ts">
    import {
        Heading,
        Button,
    } from 'flowbite-svelte';
    import type { PageData, ActionData } from './$types';
    import { enhance } from '$app/forms';
    import moment from 'moment';

	export let form: ActionData;

    export let data: PageData;

    let formEl: HTMLFormElement;
    let invisibleDefaultSubmitButton: HTMLButtonElement;

    // get amount of answers
    let answersCount = 2;

    if (data.question.wrongAnswer2) {
        answersCount += 1;
    }
    if (data.question.wrongAnswer3) {
        answersCount += 1;
    }

    function goCheck() {
        if (form) {
            return;
        }
        invisibleDefaultSubmitButton.click();
    }
</script>

<svelte:head>
    <title>Quiz</title>
</svelte:head>

<div class="flex flex-col h-full gap-10">
    <Heading tag="h2" class="md:mb-10 md:mt-10">{ data.question.question }</Heading>

    {#if form?.is_correct}
        <div class="bg-green-100 dark:bg-green-800/25 p-4 rounded-lg">
            <p class="text-green-500 dark:text-green-400">Richtig!</p>
        </div>
    {:else if form?.is_correct == false}
        <div class="bg-red-100 dark:bg-red-800/25 p-4 rounded-lg">
            <p class="text-red-500 dark:text-red-400">Leider falsch!</p>
        </div>
    {/if}

    <form method="post" class="grow flex flex-col gap-10" bind:this={formEl} action="?/check_answer" use:enhance>
        <div class="grid { ['md:grid-cols-2', 'md:grid-cols-1', 'md:grid-cols-2'][answersCount-2] } gap-8 grow">
            
            <label class="font-bold text-2xl border dark:border-slate-500 hover:bg-primary-200 dark:hover:bg-primary-800/25 transition-all p-8 rounded-xl" style="order: {String(moment(data.question.createdAt).unix()).at(-1)};" id="answer1" on:change={goCheck}>
                { data.question.answer }

                <input type="checkbox" name="answer" class="hidden" id="answer1" value={ 0 }>
            </label>

            <label class="font-bold text-2xl border dark:border-slate-500 hover:bg-primary-200 dark:hover:bg-primary-800/25 transition-all p-8 rounded-xl" style="order: {String(moment(data.question.createdAt).unix()).at(-2)};" id="answer2" on:change={goCheck}>
                { data.question.wrongAnswer1 } 

                <input type="checkbox" name="answer" class="hidden" id="answer2"  value={ 1 }>
            </label>

            <label class="{answersCount < 3 ? 'hidden': ''} font-bold text-2xl border dark:border-slate-500 hover:bg-primary-200 dark:hover:bg-primary-800/25 transition-all p-8 rounded-xl" style="order: {String(moment(data.question.createdAt).unix()).at(-3)};" id="answer3" on:change={goCheck}>
                { data.question.wrongAnswer2 }

                <input type="checkbox" name="answer" class="hidden" id="answer3"  value={ 2 }>
            </label>

            <label class="{answersCount < 4 ? 'hidden': ''} font-bold text-2xl border dark:border-slate-500 hover:bg-primary-200 dark:hover:bg-primary-800/25 transition-all p-8 rounded-xl" style="order: {String(moment(data.question.createdAt).unix()).at(-4)};" id="answer4" on:change={goCheck}>
                { data.question.wrongAnswer3 }

                <input type="checkbox" name="answer" class="hidden" id="answer4"  value={ 3 }>
            </label>

            <input type="hidden" name="question_id" value={data.question.id}>
            <button formaction="?/check_answer" class="hidden" bind:this={invisibleDefaultSubmitButton}>Check</button>
        </div>

        <div class="flex justify-between">
            <div>
                <!-- { answersCount } - 
                { String(moment(data.question.createdAt).unix()).at(-1) }
                { String(moment(data.question.createdAt).unix()).at(-2) }
                { String(moment(data.question.createdAt).unix()).at(-3) }
                { String(moment(data.question.createdAt).unix()).at(-4) } -->
            </div>

            <button formaction="?/next_question">Nächste Frage</button>
        </div>
    </form>
</div>