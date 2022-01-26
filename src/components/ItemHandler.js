import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getUsdValuation, addItem } from '../state/invoicesSlice'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'

function ItemHandler(props) {
	const dispatch = useDispatch()
	const usdValuation = useSelector(getUsdValuation)
	const open = props.open || false
	const [ item, setItem ] = useState({
		name: '',
		price: { usd: '', bs: '' },
		quantity: '',
		subtotal: { usd: '', bs: '' }
	})

	function handleClose(add) {
		if ( add ) {
			const subtotal = {
				usd: Number((item.quantity*item.price.usd).toFixed(2)),
				bs: Number((item.quantity*item.price.bs).toFixed(2))
			}
			const newItem = { ...item, subtotal }
			dispatch(addItem(newItem))
		}
		props.onClose()
		setItem({
			name: '',
			price: { usd: '', bs: '' },
			quantity: '',
			subtotal: { usd: '', bs: '' }
		})
	}

	function handleItemChange(event, prop) {
		let value = event.target.value
		if ( value ) {
			prop==='quantity' && ( value = Number(value) )
			const changedValue = { [prop]: value }
			setItem({ ...item, ...changedValue })
		} else {
			setItem({ ...item, [prop]: '' })
		}
	}

	function handleUsdValueChange(event) {
		if ( event.target.value.trim() ) {
			const usd = Number(event.target.value)
			const bs = Number((usd*usdValuation).toFixed(2))
			setItem({ ...item, price: { usd, bs, source: 'usd' } })
		} else {
			setItem({ ...item, price: { usd: '', bs: '' } })
		}
	}

	function handleBsValueChange(event) {
		if ( event.target.value.trim() ) {
			const bs = Number(event.target.value)
			const usd = Number((bs/usdValuation).toFixed(2))
			setItem({ ...item, price: { usd, bs, source: 'bs' } })
		} else {
			setItem({ ...item, price: { usd: '', bs: '' } })
		}
	}

	return (
		<Dialog
			open={open}
			onClose={ () => handleClose() }
		>
			<DialogTitle> Agregar producto </DialogTitle>
			<DialogContent>
				<Grid
					container
					spacing={2}
				>
					<Grid
						item
						xs={12}
					>
						<div style={{ display: 'flex', alignItems: 'flex-end' }}>
							<TextField
								label="Producto"
								variant="standard"
								fullWidth
								value={ item.name }
								onChange={ event => handleItemChange(event, 'name') }
							/>
						</div>
					</Grid>
					<Grid
						item
						xs={4}
					>
						<div style={{ display: 'flex', alignItems: 'flex-end' }}>
							<TextField
								label="Cantidad"
								variant="standard"
								type="number"
								fullWidth
								value={ item.quantity }
								onChange={ event => handleItemChange(event, 'quantity') }
							/>
						</div>
					</Grid>
					<Grid
						item
						xs={4}
					>
						<TextField
							label="Precio $"
							variant="standard"
							type="number"
							fullWidth
							value={ item.price.usd }
							onChange={ event => handleUsdValueChange(event) }
						/>
					</Grid>
					<Grid
						item
						xs={4}
					>
						<TextField
							label="Precio Bs"
							variant="standard"
							type="number"
							fullWidth
							value={ item.price.bs }
							onChange={ event => handleBsValueChange(event) }
						/>
					</Grid>
				</Grid>
			</DialogContent>
			<DialogActions>
				<Button onClick={ () => handleClose() }> Cancelar </Button>
				<Button
					onClick={ () => handleClose(true) }
				>
					Agregar
				</Button>
			</DialogActions>
		</Dialog>
	)
}

export default ItemHandler
