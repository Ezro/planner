
import { writable } from 'svelte/store'


export const nextNoteId = writable(0)
export const notes = writable({})