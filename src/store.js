import { writable } from "svelte/store";
import { browser } from "$app/environment"

const lsDocumentationKey = "conversational_documentation"

const locallyStoredDocumentation = JSON.parse(browser && localStorage.getItem(lsDocumentationKey) || "{}");

export const documentation = writable((locallyStoredDocumentation));

documentation.subscribe(v => browser && localStorage.setItem(lsDocumentationKey, JSON.stringify(v)))