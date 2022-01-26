import { useSelector, useDispatch } from 'react-redux'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import { formatDate } from '../helpers'
import {
	getShowSelector,
	getSelectorWidth,
	setShowSelector,
	getInvoices,
	getActiveIndex,
	setActiveIndex
} from '../state/invoicesSlice'

function InvoiceSelector() {
	const dispatch = useDispatch()
	const showSelector = useSelector(getShowSelector)
	const selectorWidth = useSelector(getSelectorWidth)
	const invoices = useSelector(getInvoices)
	const activeIndex = useSelector(getActiveIndex)

	function handleInvoiceSelection(index) {
		dispatch(setActiveIndex(index))
		dispatch(setShowSelector(false))
	}

	const listSelector = (
		<List>
			{ invoices.map( (invoice, index) => 
				<ListItemButton
					key={ invoice.id }
					selected={ index===activeIndex }
					onClick={ () => handleInvoiceSelection(index) }
				>
					<ListItemText
						primary={ invoice.supplierName }
						secondary={ formatDate(invoice.date) }
					/>
				</ListItemButton>
			)}
		</List>
	)

	return (
		<>
			<Drawer
				variant='temporary'
				anchor='right'
				open={ showSelector }
				onClose={ () => dispatch(setShowSelector(false)) }
				sx={{
					width: selectorWidth,
					'& .MuiDrawer-paper': { boxSizing: 'border-box', width: selectorWidth }
				}}
			>
				{ listSelector }
			</Drawer>
			<Drawer
				variant='permanent'
				sx={{
					width: selectorWidth,
					display: { xs: 'none', md: 'block' },
					'& .MuiDrawer-paper': { boxSizing: 'border-box', width: selectorWidth }
				}}
			>
				{ listSelector }
			</Drawer>
		</>
	)

}

export default InvoiceSelector
