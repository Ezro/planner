import { fail, redirect } from '@sveltejs/kit'
import type { Action, Actions, PageServerLoad } from './$types'
import bcrypt from 'bcrypt'

import { db } from '$lib/database'
import { updateSession } from '$lib/helpers'

export const load: PageServerLoad = async ({ locals }) => {
    if (locals.user) {
        throw redirect(302, '/')
    }
}

const login: Action = async ({ request, cookies }) => {
    const data = await request.formData()
    const username = data.get('username')
    const password = data.get('password')
    if (typeof username !== 'string' ||
        typeof password !== 'string' ||
        !username ||
        !password) {
        return fail(400, { invalid: true })
    }
    console.log(username, password)
    const user = await db.user.findUnique({ where: { username } })
    if (!user) {
        return fail(400, { credentials: true })
    }
    const userPassword = await bcrypt.compare(password, user.passwordHash)
    if (!userPassword) {
        return fail(400, { credentials: true })
    }
    // generate new auth token just in case
    await updateSession(cookies, user.username)
    throw redirect(302, '/')
}

export const actions: Actions = { login }
