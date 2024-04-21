import type { Question } from "@prisma/client";
import { writable, type Writable } from "svelte/store";
import { db } from "../db";

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