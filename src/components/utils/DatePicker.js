import { useState } from 'react'
import Menu from '@mui/material/Menu'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import StaticDatePicker from '@mui/lab/StaticDatePicker'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'

function DatePicker(props) {
	const [anchorEl, setAnchorEl] = useState(null)
	const [value, setValue] = useState(props.value)
	const [changeDisabled, setChangeDisabled] = useState(false)
	const onChange = props.onChange || ( () => {} )
	const open = Boolean(anchorEl)

	function handleOpen(event) {
		setValue(props.value)
		changeDisabled && setChangeDisabled(false)
		setAnchorEl(event.currentTarget)
	}

	function handleClose(change) {
		change && onChange(value)
		setAnchorEl(null)
	}

	return (
		<div style={{ cursor: 'pointer' }}>
			<div onClick={ handleOpen }>
				{ props.children }
			</div>
			<Menu
				anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
				transformOrigin={{ vertical: 'top', horizontal: 'left' }}
				anchorEl={ anchorEl }
				open={ open }
				onClose={ () => handleClose(false) }
			>
				<div style={{ padding: '0 10px 0 10px' }}>

					<LocalizationProvider dateAdapter={AdapterDateFns}>
						<StaticDatePicker
							displayStaticWrapperAs="desktop"
							openTo="day"
							value={ value }
							onChange={ newValue => setValue(newValue) }
							renderInput={ params => <TextField {...params} /> }
						/>
					</LocalizationProvider>

					<div style={{ marginTop: '8px', display: 'flex', justifyContent: 'end' }}>
						<Button onClick={ () => handleClose(false) }> Cancelar </Button>
						<Button
							disabled={ changeDisabled }
							onClick={ () => handleClose(true) }
						>
							Aceptar
						</Button>
					</div>
				</div>
			</Menu>
		</div>
	)
}

export default DatePicker
