import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk';
import rootReducer from './reducers'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'root',
    storage,
}

const initialState = {};

const persistedReducer = persistReducer(persistConfig, rootReducer)

const middleware = [thunk];


const store = createStore(persistedReducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));
const persistor = persistStore(store);
export default { store, persistor }