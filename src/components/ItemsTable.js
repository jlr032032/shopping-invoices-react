import { useSelector, useDispatch } from 'react-redux'
import { getItems, deleteItem, setItem, getUsdValuation } from '../state/invoicesSlice'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import EditDialog from '../components/utils/EditDialog'

function ItemsTable() {
	const dispatch = useDispatch()
	const items = useSelector(getItems)
	const usdValuation = useSelector(getUsdValuation)

	function handleNameChange(item, index, name) {
		const newItem = { ...item, name }
		dispatch(setItem({ index, item: newItem }))
	}

	function handleUsdChange(item, index, usd) {
		usd = Number(usd)
		const bs = Number((usd*usdValuation).toFixed(2))
		const subtotal = {
			usd: Number((item.quantity*usd).toFixed(2)),
			bs: Number((item.quantity*bs).toFixed(2))
		}
		const newItem = { ...item, price: { usd, bs, source: 'usd' }, subtotal }
		dispatch(setItem({ index, item: newItem }))
	}

	function handleBsChange(item, index, bs) {
		bs = Number(bs)
		const usd = Number((bs/usdValuation).toFixed(2))
		const subtotal = {
			usd: Number((item.quantity*usd).toFixed(2)),
			bs: Number((item.quantity*bs).toFixed(2))
		}
		const newItem = { ...item, price: { usd, bs, source: 'bs' }, subtotal }
		dispatch(setItem({ index, item: newItem }))
	}

	function handleQuantityChange(item, index, quantity) {
		const subtotal = {
			usd: Number((quantity*item.price.usd).toFixed(2)),
			bs: Number((quantity*item.price.bs).toFixed(2))
		}
		const newItem = { ...item, quantity, subtotal }
		dispatch(setItem({ index, item: newItem }))
	}

	function priceStyle(itemPrice, slot) {
		if ( itemPrice.source===slot ) {
			return {
				minWidth: 'max-content',
				backgroundColor: '#f5f5f5',
				borderRadius: '4px',
				paddingLeft: '4px',
				paddingRight: '4px'
			}
		} else {
			return { minWidth: 'max-content' }
		}
	}

	return (
		<TableContainer component='div'>
			<Table size='small'>
				<TableHead>
					<TableRow>
						<TableCell>Producto</TableCell>
						<TableCell align="center">Precio</TableCell>
						<TableCell align="center">Cantidad</TableCell>
						<TableCell align="center">Subtotal</TableCell>
						<TableCell align="center"/>
					</TableRow>
				</TableHead>
				<TableBody>
					{ items && items.map( (item, index) => (
						<TableRow
							key={ index }
							sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
						>
							<TableCell
								component="th"
								scope="row"
							>
								<EditDialog
									value={item.name}
									onChange={ value => handleNameChange(item, index, value) }
								>
									{ item.name }
								</EditDialog>
							</TableCell>
							<TableCell align="center">
								<EditDialog
									value={item.price.usd}
									onChange={ value => handleUsdChange(item, index, value) }
								>
									<div style={ priceStyle(item.price, 'usd') }>$ { item.price.usd }</div>
								</EditDialog>
								<EditDialog
									value={item.price.bs}
									onChange={ value => handleBsChange(item, index, value) }
								>
									<div style={ priceStyle(item.price, 'bs') }>Bs { item.price.bs }</div>
								</EditDialog>
							</TableCell>
							<TableCell align="center">
								<EditDialog
									value={item.quantity}
									onChange={ value => handleQuantityChange(item, index, value) }
								>
									{ item.quantity }
								</EditDialog>
							</TableCell>
							<TableCell align="center">
								<div style={{ minWidth: 'max-content' }}>$ { item.subtotal.usd }</div>
								<div style={{ minWidth: 'max-content' }}>Bs { item.subtotal.bs }</div>
							</TableCell>
							<TableCell align="center">
								<IconButton onClick={ () => dispatch(deleteItem(index)) }>
									<DeleteIcon fontSize="small" />
								</IconButton>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	)
}

export default ItemsTable
