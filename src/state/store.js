import { createStore, combineReducers	} from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import invoicesReducer from './invoicesSlice'

const invoicesPersistConfig = {
	key: 'invoices',
	storage,
}

const persistedReducer = combineReducers({
	invoices: persistReducer(invoicesPersistConfig, invoicesReducer)
})

export default () => {
	const store = createStore(persistedReducer)
	const persistor = persistStore(store)
	return { store, persistor }
}
