import pako from 'pako'
import prisma from '@prisma/client'

export const db = new prisma.PrismaClient()

export async function upsertNote(userId: string, noteTitle: string, noteBody: string, noteId: number) {
    let noteIdToUse = noteId === undefined ? 1 : noteId
    const compressedString = pako.gzip(noteBody)
    let insertedNote = await db.note.create({
        data: {
            noteId: noteIdToUse,
            title: noteTitle,
            body: compressedString
        }
    })
    let streamId = `note#${noteIdToUse}`
    const latestNoteEvent = await db.noteEvent.findFirst({
        where: {
            streamId: streamId,
        },
        orderBy: {
            sequenceId: 'desc',
        },
        select: {
            sequenceId: true,
        },
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
    return noteIdToUse
}

export async function getLatestUserNotes(userId: string) {
    const notes = await db.noteEvent.findMany({
        where: {
            userId: userId,
        },
        orderBy: {
            time: 'asc',
        }
    })
    console.log('notes', notes)
    return notes
}