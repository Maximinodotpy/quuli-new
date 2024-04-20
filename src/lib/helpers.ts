import { writable, type Writable } from "svelte/store";

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