<script lang="ts">
    import { Heading, Button } from 'flowbite-svelte';
    import moment from 'moment';
    import type { Question } from '@prisma/client';
    import { jsonToFormData } from '$lib/helpers';
    import { onMount } from 'svelte';
    import type { PageData } from './$types';

    export let data: PageData;

    let currentQuestion: Question;

    type statusT = 'Answering' | 'Correct' | 'Wrong';

    let status: statusT = 'Answering';
    
    let invisibleDefaultSubmitButton: HTMLButtonElement;
    let answersCount = 0;
    
    $: {
        if (currentQuestion) {
            // get amount of answers
            
            answersCount = 2;
        
            if (currentQuestion.wrongAnswer2) {
                answersCount += 1;
            }
            if (currentQuestion.wrongAnswer3) {
                answersCount += 1;
            }
        }
    }

    onMount(() => {
        nextQuestion();
    });

    function goCheck(answer: number) {
        if (status == 'Answering') {
            console.log('Checking answer ...');
    
            fetch('/api/questions/check-answer', {
                method: 'POST',
                body: jsonToFormData({ question_id: currentQuestion.id, answer })
            }).then(response => response.json()).then(results => {
                console.log(results);
    
                if (answer == 0) {
                    status = 'Correct';
                } else {
                    status = 'Wrong';
                }
            });
        }
    }

    function nextQuestion() {
        console.log('Getting next question ...');

        fetch('/api/questions/next-public-question', {
            method: 'POST',
            body: jsonToFormData({ last_question_id: currentQuestion?.id }),
        }).then(response => response.json()).then((new_question: Question) => {
            console.log(new_question);

            currentQuestion = new_question;

            status = 'Answering';
        });
    }
</script>

<svelte:head>
    <title>Quiz</title>
</svelte:head>

<div class="flex flex-col h-full gap-10 max-w-5xl mx-auto">
    {#if !currentQuestion}
        <p>Keine Fragen vorhanden.</p>
    {:else}
        <Heading tag="h2" class="md:mb-10 md:mt-10" customSize="text-2xl md:text-3xl font-bold">{ currentQuestion.question }</Heading>

        {#if status == 'Correct'}
            <div class="bg-green-100 dark:bg-green-800/25 p-4 rounded-lg">
                <p class="text-green-500 dark:text-green-400">"{currentQuestion.answer}" ist Richtig!</p>
            </div>
        {:else if status == 'Wrong'}
            <div class="bg-red-100 dark:bg-red-800/25 p-4 rounded-lg">
                <p class="text-red-500 dark:text-red-400">Leider falsch! "{currentQuestion.answer}" wäre richtig gewesen.</p>
            </div>
        {/if}

        <div class="grow flex flex-col gap-4 md:gap-10">
            <div class="grid { ['md:grid-cols-2', 'md:grid-cols-1', 'md:grid-cols-2'][answersCount-2] } gap-4 md:gap-8 grow">
                
                <button on:click={() => { goCheck(0) }} class="font-bold text-xl md:text-2xl border dark:border-slate-500 hover:bg-primary-200 dark:hover:bg-primary-800/25 transition-all p-4 md:p-8 rounded-xl" style="order: {String(moment(currentQuestion.createdAt).unix()).at(-1)};" id="answer1">
                    { currentQuestion.answer }
                </button>

                <button on:click={() => { goCheck(1) }} class="font-bold text-xl md:text-2xl border dark:border-slate-500 hover:bg-primary-200 dark:hover:bg-primary-800/25 transition-all p-4 md:p-8 rounded-xl" style="order: {String(moment(currentQuestion.createdAt).unix()).at(-2)};" id="answer2">
                    { currentQuestion.wrongAnswer1 } 
                </button>

                <button on:click={() => { goCheck(2 ?? '') }} class="{answersCount < 3 ? 'hidden': ''} font-bold text-xl md:text-2xl border dark:border-slate-500 hover:bg-primary-200 dark:hover:bg-primary-800/25 transition-all p-4 md:p-8 rounded-xl" style="order: {String(moment(currentQuestion.createdAt).unix()).at(-3)};" id="answer3">
                    { currentQuestion.wrongAnswer2 }
                </button>

                <button on:click={() => { goCheck(3 ?? '') }} class="{answersCount < 4 ? 'hidden': ''} font-bold text-xl md:text-2xl border dark:border-slate-500 hover:bg-primary-200 dark:hover:bg-primary-800/25 transition-all p-4 md:p-8 rounded-xl" style="order: {String(moment(currentQuestion.createdAt).unix()).at(-4)};" id="answer4">
                    { currentQuestion.wrongAnswer3 }
                </button>

                <input type="hidden" name="question_id" value={currentQuestion.id}>
                <button formaction="?/check_answer" class="hidden" bind:this={invisibleDefaultSubmitButton}>Check</button>
            </div>

            <div class="flex justify-between">
                <div>
                    <!-- { answersCount } -->
                </div>

                <div class="flex gap-3">
                    {#if !data?.session?.user}
                        <Button color="alternative" href="/login">Anmelden um Fortschritt zu erfassen</Button>
                    {/if}

                    <Button on:click={nextQuestion}>Nächste Frage</Button>
                </div>
            </div>
        </div>
    {/if}
</div>