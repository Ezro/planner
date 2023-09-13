import { db } from '$lib/database'
import type { Cookies } from '@sveltejs/kit'

export async function updateSession(cookies: Cookies, username: string) {
    const authenticatedUser = await db.user.update({
        where: { username: username },
        data: { userAuthToken: crypto.randomUUID() },
    })
    cookies.set('session', authenticatedUser.userAuthToken, {
        // send cookie for every page
        path: '/',
        // server side only cookie so you can't use `document.cookie`
        httpOnly: true,
        // only requests from same site can send cookies
        // https://developer.mozilla.org/en-US/docs/Glossary/CSRF
        sameSite: 'strict',
        // only sent over HTTPS in production
        secure: process.env.NODE_ENV === 'production',
        // set cookie to expire after a month
        maxAge: 60 * 60 * 24 * 30,
    })
}