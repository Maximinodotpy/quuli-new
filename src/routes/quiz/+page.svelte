<script lang="ts">
    import { Heading, Button, Skeleton, TextPlaceholder } from 'flowbite-svelte';
    import moment from 'moment';
    import type { Question, Questionnaire } from '@prisma/client';
    import { getQuestionnaire, jsonToFormData } from '$lib/helpers';
    import { onMount } from 'svelte';
    import type { PageData } from './$types';
    import { GO_BACK_TO, SHORTCUTS } from '$lib/const';

    export let data: PageData;

    let currentQuestion: Question | undefined = undefined;

    type statusT = 'Answering' | 'Correct' | 'Wrong' | 'LoadingNew' | 'Checking'| 'QuestionnaireFinished';

    let status: statusT = 'Answering';
    let chosenAnswer: number | undefined = undefined;
    
    let invisibleDefaultSubmitButton: HTMLButtonElement;
    let answersCount = 0;

    let category_ids: string[] = []

    let questionnaire: Questionnaire;
    
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

    onMount(async () => {
        
        // Check if the get parameter cat is set
        const urlParams = new URLSearchParams(window.location.search);
        
        if (urlParams.has('cat')) {
            category_ids = urlParams.get('cat')?.split(',') ?? [];
            
            console.log('Kategorien gefunden', category_ids);
        }

        // Check if the get parameter questionnaire is set
        if (urlParams.has('questionnaire')) {
            questionnaire = await getQuestionnaire(urlParams.get('questionnaire') ?? '') as Questionnaire;

            console.log('Fragebogen gefunden', questionnaire);
        }
        
        nextQuestion();
        
        document.addEventListener('keydown', (event) => {
            const buttonContainer = document.querySelector('#button_container')
            
            // Get the first four children of this container and then sort them by their order css property
            const buttons = Array.from(buttonContainer?.children ?? []).slice(0, 4).sort((a, b) => {
                return parseInt(a.getAttribute('style')?.split('order: ')[1] ?? '0') - parseInt(b.getAttribute('style')?.split('order: ')[1] ?? '0');
            });

            if (event.key == SHORTCUTS.select_first_answer.key) {
                let numberToCheck =Array.from(buttonContainer?.children || []).indexOf(buttons[0]);
                console.log(numberToCheck);
                
                if (status == 'Answering') {
                    goCheck(numberToCheck);
                }
            } else if (event.key == SHORTCUTS.select_second_answer.key) {
                let numberToCheck =Array.from(buttonContainer?.children || []).indexOf(buttons[1]);
                console.log(numberToCheck);
                
                if (status == 'Answering') {
                    goCheck(numberToCheck);
                }
            } else if (event.key == SHORTCUTS.select_third_answer.key) {
                let numberToCheck =Array.from(buttonContainer?.children || []).indexOf(buttons[2]);
                console.log(numberToCheck);

                if (status == 'Answering') {
                    goCheck(numberToCheck);
                }
            } else if (event.key == SHORTCUTS.select_fourth_answer.key) {
                let numberToCheck =Array.from(buttonContainer?.children || []).indexOf(buttons[3]);
                console.log(numberToCheck);

                if (status == 'Answering') {
                    goCheck(numberToCheck);
                }
            }

            // If the user presses enter, we want to go to the next question
            if (event.key == SHORTCUTS.skip_question.key) {
                nextQuestion();
            }
        });
    });

    function goCheck(answer: number) {
        if (status == 'Answering') {
            status = 'Checking';

            chosenAnswer = answer;

            console.log('Checking answer ...');
    
            fetch('/api/questions/check-answer', {
                method: 'POST',
                body: jsonToFormData({ question_id: currentQuestion?.id, answer })
            }).then(response => response.json()).then(results => {
                console.log(results);
    
                if (answer == 0) {
                    status = 'Correct';

                    (async () => {
                        const canvas : HTMLElement | null = document.getElementById("bg-canvas");

                        console.log(canvas);

                        if (!canvas) return;
                        // you should  only initialize a canvas once, so save this function
                        // we'll save it to the canvas itself for the purpose of this demo
                        // @ts-ignore
                        canvas.confetti = canvas.confetti || (await confetti.create(canvas, { resize: false }));

                        // @ts-ignore
                        canvas.confetti({
                            spread: 100,
                            particleCount: 40,
                            origin: { y: 1, x: 0.5},
                        });
                    })();
                } else {
                    status = 'Wrong';
                }
            });
        } else {
            nextQuestion();
        }
    }

    function nextQuestion() {
        console.log('Getting next question ...');

        status = 'LoadingNew';
        
        let last_question_id = '';
        if (currentQuestion && 'id' in currentQuestion) {
            last_question_id = currentQuestion.id;
        }

        currentQuestion = undefined;


        fetch('/api/questions/next-public-question', {
            method: 'POST',
            body: jsonToFormData({ last_question_id, category_ids, questionnaire_id: questionnaire?.id }),
        }).then(response => {
            console.log(response, 'response');
            
            return response.json()
        }).then((data: { question: Question, questions_left: number }) => {
            console.log(data.question);

            currentQuestion = data.question;

            if (data.questions_left == 0) {
                status = 'QuestionnaireFinished';
            } else {
                status = 'Answering';
            }
        }).catch(e => {
            console.error(e, 'fads');
        });
    }
</script>

<svelte:head>
    <title>Quiz</title>
    <script src="https://cdn.jsdelivr.net/npm/tsparticles-confetti@2.10.1/tsparticles.confetti.bundle.min.js"></script>
</svelte:head>


<div class="flex flex-col h-full max-h-full gap-10 max-w-5xl mx-auto relative">
    <canvas id="bg-canvas" class="absolute pointer-events-none w-full h-full"></canvas>
    {#if status == 'QuestionnaireFinished'}
        <Heading tag="h2" class="md:mb-10 md:mt-10" customSize="text-2xl md:text-3xl font-bold">Fragebogen abgeschlossen</Heading>
        <div class="flex flex-col gap-4 md:gap-10">
            <Button href="/fragebogen/{questionnaire?.id}" color="alternative">Zurück zur Fragebogenübersicht</Button>
        </div>
    {:else}
        {#if !currentQuestion}
            <Heading tag="h2" class="md:mb-10 md:mt-10" customSize="text-2xl md:text-3xl font-bold">Frage wird geladen ...</Heading>

            <div class="grid md:grid-cols-2 grow gap-6 overflow-hidden">
                <Skeleton divClass="shrink-1" />
                <Skeleton divClass="shrink-1" />
                <Skeleton divClass="shrink-1 hidden md:block" />
                <Skeleton divClass="shrink-1 hidden md:block" />
            </div>
        {:else}
            <div class="md:mb-10 md:mt-10">
                {#if questionnaire}
                    <a href="/fragebogen/{questionnaire.id}">{questionnaire.name}</a>
                {/if}
                <Heading tag="h2" customSize="text-2xl md:text-3xl font-bold">{ currentQuestion.question }</Heading>
            </div>

            <div class="grow flex flex-col gap-4 md:gap-10">

                <div class="grid { ['md:grid-cols-2', 'md:grid-cols-1', 'md:grid-cols-2'][answersCount-2] } gap-4 md:gap-8 grow" id="button_container">
                    
                    <button on:click={() => { goCheck(0) }} class="font-bold text-xl md:text-2xl border dark:border-slate-500 transition-all p-4 md:p-8 rounded-xl { status != 'Answering' ? 'bg-green-500 text-green-100': 'hover:bg-primary-200 dark:hover:bg-primary-800/25' }" style="order: {String(moment().unix()).at(-1)};" id="answer1">
                        { currentQuestion.answer }
                    </button>

                    <button on:click={() => { goCheck(1) }} class="font-bold text-xl md:text-2xl border dark:border-slate-500 transition-all p-4 md:p-8 rounded-xl { status != 'Answering' && chosenAnswer == 1? 'bg-red-500 text-red-100': ''} { status == 'Answering' ? 'hover:bg-primary-200 dark:hover:bg-primary-800/25': '' }" style="order: {String(moment().unix()).at(-2)};" id="answer2">
                        { currentQuestion.wrongAnswer1 } 
                    </button>

                    <button on:click={() => { goCheck(2 ?? '') }} class="{answersCount < 3 ? 'hidden': ''} font-bold text-xl md:text-2xl border dark:border-slate-500 transition-all p-4 md:p-8 rounded-xl { status != 'Answering' && chosenAnswer == 2? 'bg-red-500 text-red-100': ''} { status == 'Answering' ? 'hover:bg-primary-200 dark:hover:bg-primary-800/25': '' }" style="order: {String(moment().unix()).at(-3)};" id="answer3">
                        { currentQuestion.wrongAnswer2 }
                    </button>

                    <button on:click={() => { goCheck(3 ?? '') }} class="{answersCount < 4 ? 'hidden': ''} font-bold text-xl md:text-2xl border dark:border-slate-500 transition-all p-4 md:p-8 rounded-xl { status != 'Answering' && chosenAnswer == 3? 'bg-red-500 text-red-100': ''} { status == 'Answering' ? 'hover:bg-primary-200 dark:hover:bg-primary-800/25': '' }" style="order: {String(moment().unix()).at(-4)};" id="answer4">
                        { currentQuestion.wrongAnswer3 }
                    </button>

                    <input type="hidden" name="question_id" value={currentQuestion.id}>
                    <button formaction="?/check_answer" class="hidden" bind:this={invisibleDefaultSubmitButton}>Check</button>
                </div>

                <div class="flex justify-between">
                    <div>
                        <!-- If the user is logged in and this question was contributed by them add a edit this question button -->
                        {#if data?.session?.user && data?.session?.user?.id == currentQuestion?.createdById}
                            <Button href="/fragen/bearbeiten/{currentQuestion.id}?{GO_BACK_TO}=/quiz" color="alternative">Frage bearbeiten</Button>
                        {/if}
                    </div>

                    <div class="flex gap-3">
                        {#if !data?.session?.user}
                            <Button color="alternative" href="/login">Anmelden um Fortschritt zu erfassen</Button>
                        {/if}

                        <Button on:click={nextQuestion} title="enter">Nächste Frage</Button>
                    </div>
                </div>
            </div>
        {/if}
    {/if}
</div>