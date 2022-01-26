import { Provider } from 'react-redux'
import store from './state/store'
import InvoiceView from './views/InvoiceView'

function App() {
	return (
		<Provider store={ store().store }>
			<InvoiceView />
		</Provider>
	)
}

export default App
