import type { Question } from "@prisma/client";
import { writable, type Writable } from "svelte/store";
import { db } from "./db";
import { browser } from "$app/environment";

export function createPersistentStore<T>(key: string, initialValue: any): Writable<T> {
  const store = writable(initialValue);

  const json = localStorage.getItem(key);
  if (json) {
    store.set(JSON.parse(json));
  }

  store.subscribe((value) => {
    localStorage.setItem(key, JSON.stringify(value));
  });


  return store;
}


export function isAValidAnswer(answer: string) {
  // Is a valid answer if it is not empty without the whitespace around
  return answer.trim() == "";
}

export function hasDuplicates(array: Array<any>, remove_empty_strings = true) {
  if (remove_empty_strings) array = array.filter(Boolean);

  return (new Set(array)).size !== array.length;
}



export async function checkQuestionFormData(formData: FormData) {
  const questionO: Question = {
    question: formData.get("frage") as string,
    answer: formData.get("antwort") as string,
    wrongAnswer1: String(formData.get("falsch1") || '') as string,
    wrongAnswer2: String(formData.get("falsch2") || '') as string,
    wrongAnswer3: String(formData.get("falsch3") || '') as string,
    categoryId: String(formData.get("category") as string),
  } as Question;

  // Trim all the strings
  questionO.question = questionO.question.trim();
  questionO.answer = questionO.answer.trim();
  questionO.wrongAnswer1 = questionO.wrongAnswer1.trim();
  questionO.wrongAnswer2 = questionO?.wrongAnswer2?.trim() || '';
  questionO.wrongAnswer3 = questionO?.wrongAnswer3?.trim() || '';

  // Check if there is a question
  if (!questionO.question) {
    throw new Error("Keine Frage eingegeben");
  }

  // Check if there is an answer
  if (!questionO.answer) {
    throw new Error("Keine Antwort eingegeben");
  }

  // Check if there is at least one wrong answer
  if (!questionO.wrongAnswer1 && !questionO.wrongAnswer2 && !questionO.wrongAnswer3) {
    throw new Error("Keine falsche Antwort eingegeben");
  }

  return questionO;
}


export interface GetQuestionsOptions {
  idExceptions: string[];
  categories: string[];
  questionnaireId?: string | null;
}

export async function getAllPublicQuestions(GetQuestionsOptions: GetQuestionsOptions = { idExceptions: [], categories: [], questionnaireId: null}) {
  // In case there are no categories specified return all questions
  const all_categories = await db.category.findMany();

  if (GetQuestionsOptions.categories == null || GetQuestionsOptions.categories.length == 0 || GetQuestionsOptions.categories[0] == "") {
    console.log('No categories specified');

    GetQuestionsOptions.categories = all_categories.map((category) => category.id);
  }

  let questions;

  if (GetQuestionsOptions.questionnaireId) {
    questions = await db.question.findMany({
      where: {
        status: 'NORMAL',
        NOT: {
          id: {
            in: GetQuestionsOptions.idExceptions,
          },
        },
        questionnaireId: GetQuestionsOptions.questionnaireId,
      }
    });
  } else {
    questions = await db.question.findMany({
      where: {
        status: 'NORMAL',
        NOT: {
          id: {
            in: GetQuestionsOptions.idExceptions,
          },
        },
        categoryId: {
          in: GetQuestionsOptions.categories,
        },
      }
    });
  }

  return questions;
}

export async function getAmountOfPublicQuestions(GetQuestionsOptions: GetQuestionsOptions = { idExceptions: [], categories: [] }) {
  const list = await getAllPublicQuestions(GetQuestionsOptions);
  const amount = list.length;

  return amount;
}


export function jsonToFormData(json: any) {
  const formData = new FormData();

  for (const key in json) {
    formData.append(key, json[key]);
  }

  return formData;
}

export function formToFormData(form: HTMLFormElement) {
  const formData = new FormData(form);
  return formData;
}


export async function getCategories() {
  let categories = [];

  if (browser) {
    // Should use fetch so the frontend can also call this
    const response = await fetch('/api/categories/get-all', {
      method: 'POST',
    })
    categories = await response.json();
  } else {
    categories = await db.category.findMany({
      orderBy: {
        name: 'asc'
      }
    })

    // Reorde the categories so Sonstiges is always last
    categories = categories.sort((a, b) => {
      if (a.name == 'Sonstiges') {
        return 1;
      } else if (b.name == 'Sonstiges') {
        return -1;
      } else {
        return 0;
      }
    });
  }

  return categories
}

export async function getQuestionnaire(id: string) {
  let questionnaire;

  if (browser) {
    // Should use fetch so the frontend can also call this
    const re = await fetch('/api/questionnaire/get', {
      method: 'POST',
      body: jsonToFormData({ id }),
    })
    questionnaire = await re.json();
  } else {
    questionnaire = db.questionnaire.findUnique({
      where: {
        id,
      },
      include: {
        questions: {
          where: {
            status: 'NORMAL',
          },
        }
      },
    })
  }

  return questionnaire;
}


export async function isUserAllowedToEditQuestinnaire(questionnaire_id: string, user_id: string) {

  // Check if the user is the creator or an editor
  const questionnaire = await db.questionnaire.findFirst({
    where: {
      id: questionnaire_id,
      OR: [
        {
          createdById: user_id,
        },
        {
          editors: {
            some: {
              id: user_id,
            },
          },
        },
      ],
    },
  });

  return !!questionnaire;
}

export function getPlaceholderImage(text: string, width = 600, height = 400) {
  return `https://placehold.co/${width}x${height}.png?text=` + text;
}