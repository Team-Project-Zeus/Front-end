import { createStore, applyMiddleware, compose, Middleware, combineReducers } from 'redux';
// import { fetchLocationsMiddleware } from './locations/middleware';
// import { fetchSessionsMiddleware } from './sessions/middleware';
// import { fetchSpeakersMiddleware } from './speakers/middleware';
import user from './user/reducer'
import { composeWithDevTools } from 'redux-devtools-extension';
// import rootReducer from './root-reducer';

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const appReducer = combineReducers({
    user
});

const rootReducer = (state: any, action: any) => {
    if (action.type === 'USER_LOGOUT') {
        state = undefined
    }

    return appReducer(state, action)
}

function configureStore(initialState?: {}) {
    return createStore(
        rootReducer,
        initialState, composeWithDevTools())
        ;
}

// pass an optional param to rehydrate state on app start
const store = configureStore();

// export store singleton instance
export default store;