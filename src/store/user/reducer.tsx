

import * as users from './actions';
import { ActionType, getType } from 'typesafe-actions';
import { User } from "./types";

const defaultState: User = {
    password: null,
    email: null,
    name: null,
    role: localStorage.getItem('token'),
    isAuthenticated: false,
    token: localStorage.getItem('token')
};

export type UserAction = ActionType<typeof users>;

export default (state = defaultState, action: UserAction): User => {
    switch (action.type) {
        case getType(users.logIn):
        case getType(users.setEmail):
            return {
                ...state,
                email: action.payload
            }
        case getType(users.setRole):
            return {
                ...state,
                role: action.payload
            }
        case getType(users.setName):
            return {
                ...state,
                name: action.payload
            }
        case getType(users.setPassword):
            return {
                ...state,
                password: action.payload
            }
        case getType(users.setToken):
            return {
                ...state,
                token: action.payload
            }

        default:
            return state;
    }
};
