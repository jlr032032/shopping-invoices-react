import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import MenuIcon from '@mui/icons-material/Menu'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import Box from '@mui/material/Box'
import EditDialog from './utils/EditDialog'
import DatePicker from './utils/DatePicker'
import { formatDate } from '../helpers'
import {
	getSelectorWidth,
	setShowSelector,
	getSupplierName,
	setSupplierName,
	getDate,
	setDate,
	getUsdValuation,
	setUsdValuation,
	addInvoice,
	deleteInvoice
} from '../state/invoicesSlice'

function InvoiceHeader() {
	const dispatch = useDispatch()
	const selectorWidth = useSelector(getSelectorWidth)
	const supplierName = useSelector(getSupplierName)
	const invoiceDate = useSelector(getDate)
	const usdValuation = useSelector(getUsdValuation)
	const [ menuAnchor, setMenuAnchor ] = useState(null)
	const openMenu = Boolean(menuAnchor)

	function handleAddInvoice() {
		setMenuAnchor(null)
		dispatch(addInvoice())
	}

	function handleDeleteInvoice() {
		setMenuAnchor(null)
		dispatch(deleteInvoice())
	}

	return (
		<>
			<AppBar
				sx={{
					width: { md: `calc(100% - ${selectorWidth}px)` },
					ml: { md: `${selectorWidth}px` }
				}}
			>
				<Toolbar style={{ justifyContent: 'space-between' }}>
					<div>
						<div style={{
							display: 'flex',
							alignItems: 'center'
						}}>
							<EditDialog
								value={ supplierName }
								onChange={ name => dispatch(setSupplierName(name)) }
							>
								<Typography variant='subtitle1'>{ supplierName }</Typography>
							</EditDialog>
							<DatePicker
								value={ new Date(invoiceDate) }
								onChange={ date => dispatch(setDate(date.getTime())) }
							>
								<span style={{ marginLeft: '6px' }}>({ formatDate(invoiceDate) })</span>
							</DatePicker>

						</div>
						<EditDialog
							value={ usdValuation }
							onChange={ valuation => dispatch(setUsdValuation(valuation)) }
							inputType='number'
						>
							<Typography variant='subtitle2'> { usdValuation } Bs / $ </Typography>
						</EditDialog>
					</div>
					<div style={{ flexShrink: 0 }}>
						<Box sx={{
							display: { xs: 'inline', sm: 'none' }
						}}>
							<IconButton
								style={{ color: 'white' }}
								onClick={ event => setMenuAnchor(event.currentTarget) }
							>
								<MoreVertIcon />
							</IconButton>
							<Menu
								anchorEl={ menuAnchor }
								open={ openMenu }
								onClose={ () => setMenuAnchor(null) }
							>
								<MenuItem onClick={ handleAddInvoice }>
									<ListItemIcon>
										<AddIcon />
									</ListItemIcon>
									Agregar lista
								</MenuItem>
								<MenuItem onClick={ handleDeleteInvoice }>
									<ListItemIcon>
										<DeleteIcon />
									</ListItemIcon>
									Eliminar lista actual
								</MenuItem>
							</Menu>
						</Box>
							<IconButton
								sx={{
									display: { xs: 'none', sm: 'inline' },
									color: 'white'
								}}
								onClick={ handleDeleteInvoice }
							>
								<DeleteIcon />
							</IconButton>
							<IconButton
								sx={{
									display: { xs: 'none', sm: 'inline' },
									color: 'white'
								}}
								onClick={ () => dispatch(addInvoice()) }
							>
								<AddIcon />
							</IconButton>
							<IconButton
								sx={{
									display: { xs: 'inline', md: 'none' },
									color: 'white'
								}}
								onClick={ () => dispatch(setShowSelector(true)) }
							>
								<MenuIcon />
							</IconButton>
					</div>
				</Toolbar>
			</AppBar>
			<Toolbar />
		</>
	)
}

export default InvoiceHeader
