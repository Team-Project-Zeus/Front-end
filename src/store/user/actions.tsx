import { createAction } from 'typesafe-actions';

export const logIn = createAction('user/LOG_IN', resolve =>
    () => resolve(true)
);

export const logOut = createAction('user/LOG_OUT', resolve =>
    () => resolve(false)
);

export const setUsername = createAction('user/SET_USERNAME', resolve =>
    (username: string) => resolve(username)
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