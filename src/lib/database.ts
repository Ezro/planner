import pako from 'pako'
import prisma from '@prisma/client'
import type { Note } from '../routes/notes/Note'

export const db = new prisma.PrismaClient()

export async function upsertNote(userId: string, noteTitle: string, noteBody: string, noteId: number) {
    let uuid = noteId === undefined ? crypto.randomUUID() : noteId
    const compressedString = pako.gzip(noteBody)
    let insertedNote = await db.note.create({
        data: {
            uuid: uuid,
            title: noteTitle,
            body: compressedString
        }
    })
    let streamId = `note#${uuid}`
    const latestNoteEvent = await db.noteEvent.findFirst({
        where: {
            streamId: `note#${uuid}`,
        },
        orderBy: {
            sequenceId: 'desc',
        },
        select: {
            sequenceId: true,
        }
    })
    let nextSequenceId = latestNoteEvent === undefined || latestNoteEvent?.sequenceId === undefined ? 1 : latestNoteEvent.sequenceId + 1
    let eventType = nextSequenceId === 1 ? 'NoteCreated' : 'NoteUpdated'
    await db.noteEvent.create({
        data: {
            streamId: streamId,
            sequenceId: nextSequenceId,
            eventType: eventType,
            data: { connect: { id: insertedNote.id } },
            user: { connect: { id: userId } }
        }
    })
    return uuid
}

export async function getLatestUserNotes(userId: string) {
    try {
        const noteEvents = await db.noteEvent.findMany({
            where: {
                userId: userId,
            },
            orderBy: {
                sequenceId: 'asc',
            }
        })
        let noteIdMap: { [key: string]: Number } = {}
        let notes: { [key: string]: Note } = {}
        noteEvents.forEach((noteEvent) => {
            let uuid: string = noteEvent.streamId.split('#')[1]
            if (noteEvent.noteId)
                noteIdMap[uuid] = noteEvent.noteId
            else if (noteEvent.eventType == 'NoteDeleted' && noteIdMap[uuid]) {
                delete noteIdMap[uuid]
            }
        })
        for (const [uuid, noteId] of Object.entries(noteIdMap)) {
            const fetchedNote = await db.note.findUnique({
                where: {
                    id: noteId,
                },
            })
            if (fetchedNote) {
                const body = pako.ungzip(fetchedNote.body, { to: 'string' })
                notes[uuid] = {
                    uuid: uuid,
                    title: fetchedNote.title,
                    body: body,
                    time: fetchedNote.time,
                }
            }
        }
        console.log('database.ts', 'fetched user\'s latest notes')
        return notes
    } catch (error) {
        console.error(error)
        throw error
    }
}

export async function deleteNote(userId: string, uuid: string) {
    const latestNoteEvent = await db.noteEvent.findFirst({
        where: {
            streamId: `note#${uuid}`,
        },
        orderBy: {
            sequenceId: 'desc',
        },
        select: {
            sequenceId: true,
        }
    })
    let nextSequenceId = latestNoteEvent === undefined || latestNoteEvent?.sequenceId === undefined ? 1 : latestNoteEvent.sequenceId + 1
    await db.noteEvent.create({
        data: {
            streamId: `note#${uuid}`,
            sequenceId: nextSequenceId,
            eventType: 'NoteDeleted',
            user: { connect: { id: userId } }
        }
    })
}