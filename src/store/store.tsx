import { createStore, compose, combineReducers } from 'redux';
import user from './user/reducer'
import { composeWithDevTools } from 'redux-devtools-extension';

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

//initialize all the reducers
const rootReducer = combineReducers({
    user
});


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