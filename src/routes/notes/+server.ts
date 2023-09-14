import { upsertNote, deleteNote } from '$lib/database.js'
import { json } from '@sveltejs/kit'

export async function POST({ request, locals }) {
    if (locals.user) {
        const note = await request.json()
        let uuid = (await upsertNote(locals.user.id, note.title, note.body, note.uuid)).valueOf()
        return json({ uuid }, { status: 201 })
    }
}

export async function DELETE({ request, locals }) {
    if (locals.user) {
        const note = await request.json()
        await deleteNote(locals.user.id, note.uuid)
        let uuid = note.uuid
        return json({ uuid }, { status: 200 })
    }
}