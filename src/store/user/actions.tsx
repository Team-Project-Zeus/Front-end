import { createAction } from 'typesafe-actions';

export const logIn = createAction('user/LOG_IN', resolve =>
    () => resolve(true)
);

export const setEmail = createAction('user/SET_EMAIL', resolve =>
    (email: string) => resolve(email)
)
export const setName = createAction('user/SET_NAME', resolve =>
    (name: string) => resolve(name)
)
export const setPassword = createAction('user/SET_PASSWORD', resolve =>
    (password: string) => resolve(password)
)
export const setRole = createAction('user/SET_ROLE', resolve =>
    (role: string) => resolve(role)
)

export const setToken = createAction('user/SET_TOKEN', resolve =>
    (token: string) => resolve(token)
)
