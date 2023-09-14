import type { Handle } from '@sveltejs/kit'
import { db, getLatestUserNotes } from '$lib/database'

export const handle: Handle = async ({ event, resolve }) => {
    const session = event.cookies.get('session')
    if (!session) {
        return await resolve(event)
    }
    const user = await db.user.findUnique({
        where: { userAuthToken: session },
        select: { id: true, username: true, role: true },
    })
    if (user) {
        event.locals.user = {
            id: user.id,
            name: user.username,
            role: user.role.name,
            notes: await getLatestUserNotes(user.id)
        }
    }
    return await resolve(event)
}
