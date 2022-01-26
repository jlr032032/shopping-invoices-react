import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	selectorWidth: 240,
	showSelector: false,
	activeInvoice: 0,
	invoices: []
}

const invoicesSlice = createSlice({
	name: 'invoices',
	initialState,
	reducers: {
		setSupplierName(state, action) {
			const { invoices, activeInvoice } = state
			invoices[activeInvoice].supplierName = action.payload
		},
		setDate(state, action) {
			const { invoices, activeInvoice } = state
			invoices[activeInvoice].date = action.payload
		},
		setUsdValuation(state, action) {
			const { invoices, activeInvoice } = state
			const invoice = invoices[activeInvoice]
			const usdValuation = action.payload
			invoice.usdValuation = action.payload
			invoice.items.forEach( item => {
				const { price, subtotal, quantity } = item
				if ( price.source==='usd' ) {
					price.bs = Number((price.usd*usdValuation).toFixed(2))
					subtotal.bs = Number((price.bs*quantity).toFixed(2))
				}
				if ( price.source==='bs' ) {
					price.usd = Number((price.bs/usdValuation).toFixed(2))
					subtotal.usd = Number((price.usd*quantity).toFixed(2))
				}
			})
		},
		addItem(state, action) {
			const { invoices, activeInvoice } = state
			invoices[activeInvoice].items.push(action.payload)
		},
		deleteItem(state, action) {
			const { invoices, activeInvoice } = state
			const index = action.payload
			invoices[activeInvoice].items.splice(index, 1)
		},
		setItem(state, action) {
			const { invoices, activeInvoice } = state
			const { index, item } = action.payload
			invoices[activeInvoice].items.splice(index, 1, item)
		},
		setShowSelector(state, action) {
			state.showSelector = action.payload
		},
		setActiveIndex(state, action) {
			state.activeInvoice = action.payload
		},
		addInvoice(state) {
			const now = Date.now()
			const newInvoice = {
				id: now,
				supplierName: 'Nombre de proveedor',
				date: now,
				usdValuation: null,
				items: []
			}
			state.invoices = [ newInvoice, ...state.invoices ]
			state.activeInvoice = 0
		},
		deleteInvoice(state) {
			const { invoices, activeInvoice } = state
			invoices.splice(activeInvoice, 1)
			state.activeInvoice = 0
		}
	}
})

// Selectors
export const getSupplierName = function(state) {
	const { invoices, activeInvoice } = state.invoices
	if ( invoices.length ) {
		return invoices[activeInvoice].supplierName
	}
	return null
}

export const getDate = function(state) {
	const { invoices, activeInvoice } = state.invoices
	if ( invoices.length ) {
		return invoices[activeInvoice].date
	}
	return null
}

export const getUsdValuation = function(state) {
	const { invoices, activeInvoice } = state.invoices
	if ( invoices.length ) {
		return invoices[activeInvoice].usdValuation
	}
	return null
}

export const getItems = function(state) {
	const { invoices, activeInvoice } = state.invoices
	if ( invoices.length ) {
		return invoices[activeInvoice].items
	}
	return null
}

export const getTotal = function(state) {
	const { invoices, activeInvoice } = state.invoices
	if ( invoices.length ) {
		const total = invoices[activeInvoice].items.reduce(
			(accum, item) => ({
				usd: accum.usd + item.subtotal.usd,
				bs: accum.bs + item.subtotal.bs
			}),
			{ usd: 0, bs: 0 }
		)
		return {
			usd: Number(total.usd.toFixed(2)),
			bs: Number(total.bs.toFixed(2))
		}
	}
	return {}
}

export const getShowSelector = function(state) {
	return state.invoices.showSelector
}

export const getSelectorWidth = function(state) {
	return state.invoices.selectorWidth
}

export const getInvoices = function(state) {
	return state.invoices.invoices
}

export const getActiveIndex = function(state) {
	return state.invoices.activeInvoice
}

export const getNoInvoices = function(state) {
	return !state.invoices.invoices.length
}

// Reducers
export const {
	setSupplierName,
	setDate,
	setUsdValuation,
	addItem,
	deleteItem,
	setItem,
	setShowSelector,
	setActiveIndex,
	addInvoice,
	deleteInvoice
} = invoicesSlice.actions

export default invoicesSlice.reducer
