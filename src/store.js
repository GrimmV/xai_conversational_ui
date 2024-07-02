import { writable } from "svelte/store";
import { browser } from "$app/environment"

const lsDocumentationKey = "conversational_documentation"
const hideInfoKey = "hide_info"

const locallyStoredDocumentation = JSON.parse(browser && localStorage.getItem(lsDocumentationKey) || "{}");
const locallyStoredhideInfo = JSON.parse(browser && localStorage.getItem(hideInfoKey) || "false");

export const documentation = writable((locallyStoredDocumentation));
export const hideInfo = writable((locallyStoredhideInfo));

documentation.subscribe(v => browser && localStorage.setItem(lsDocumentationKey, JSON.stringify(v)))
hideInfo.subscribe(v => browser && localStorage.setItem(hideInfoKey, JSON.stringify(v)))