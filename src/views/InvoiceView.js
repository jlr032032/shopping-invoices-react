import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getSelectorWidth, getTotal, getNoInvoices, addInvoice } from '../state/invoicesSlice'
import Box from '@mui/material/Box'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Fab from '@mui/material/Fab'
import AddIcon from '@mui/icons-material/Add'
import IconButton from '@mui/material/IconButton'
import InvoiceHeader from '../components/InvoiceHeader'
import InvoiceSelector from '../components/InvoiceSelector'
import ItemsTable from '../components/ItemsTable'
import ItemHandler from '../components/ItemHandler'
import { Typography } from '@mui/material'

function InvoiceView() {
	const dispatch = useDispatch()
	const [ showItemHandler, setShowItemHandler ] = useState(false)
	const selectorWidth = useSelector(getSelectorWidth)
	const total = useSelector(getTotal)
	const noInvoices = useSelector(getNoInvoices)

	let view

	if ( noInvoices ) {
		view = (
			<Box style={{ display: 'flex', alignItems: 'center' }}>
				<InvoiceSelector />
				<Box style={{
						flexGrow: 1,
						display:'flex',
						height: '100vh',
						alignItems: 'center',
						justifyContent: 'center'
					}}>
					<AppBar>
						<Toolbar style={{ justifyContent: 'end' }}>
							<IconButton
								style={{ color: 'white' }}
								onClick={ () => dispatch(addInvoice()) }
							>
								<AddIcon />
							</IconButton>
						</Toolbar>
					</AppBar>
					<Typography style={{
						textAlign: 'center',
						padding: '0 40px 0 40px'
					}}>
						No hay listas que mostrar. Se puede agregar una nueva lista mediante el botón de la esquina.
					</Typography>
					<AppBar
						color='primary'
						sx={{
							top: 'auto',
							bottom: 0
						}}
					>
						<Toolbar />
					</AppBar>	
				</Box>
			</Box>
		)
	} else {
		view = (
			<Box style={{ display: 'flex' }}>
				<InvoiceSelector />
				<Box
					sx={{
						flexGrow: 1
					}}
				>
					<InvoiceHeader />
					<ItemsTable />
					<AppBar
						color='primary'
						sx={{
							top: 'auto',
							bottom: 0,
							width: { md: `calc(100% - ${selectorWidth}px)` },
							ml: { md: `${selectorWidth}px` }
						}}
					>
						<Toolbar sx={{ display: 'flex', justifyContent: 'center' }}>
							Total:
							<div style={{ marginLeft: '15px' }}>
								<span style={{ display: 'block', textAlign: 'center' }}>$ { total.usd }</span>
								<span>Bs { total.bs }</span>
							</div>
							<Fab
								color='secondary'
								sx={{ position: 'absolute', top: -30, right: '35px' }}
								onClick={ () => setShowItemHandler(true) }
							>
								<AddIcon />
							</Fab>
						</Toolbar>
					</AppBar>
					<ItemHandler
						open={ showItemHandler }
						onClose={ () => setShowItemHandler(false) }
					/>
				</Box>
			</Box>
		)
	}

	return view
}

export default InvoiceView
