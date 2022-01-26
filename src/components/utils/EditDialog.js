import { useState } from 'react'
import Menu from '@mui/material/Menu'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

function InvoiceHeader(props) {
	const [anchorEl, setAnchorEl] = useState(null)
	const [value, setValue] = useState(initValue())
	const [changeDisabled, setChangeDisabled] = useState(false)
	const onChange = props.onChange || ( () => {} )
	const inputType = props.inputType || 'text'
	const open = Boolean(anchorEl)

	function initValue() {
		const { value } = props
		return value===undefined || value===null ? '' : value
	}

	function handleOpen(event) {
		setValue(initValue())
		changeDisabled && setChangeDisabled(false)
		setAnchorEl(event.currentTarget)
	}

	function handleClose(change) {
		change && onChange(value)
		setAnchorEl(null)
	}

	function handleInputChange(event) {
		const newValue = event.target.value
		const trimmedValue = newValue.trim()
		Boolean(trimmedValue)!==Boolean(value) && setChangeDisabled(!trimmedValue)
		setValue(newValue)
	}

	return (
		<>
			<div
				style={{ cursor: 'pointer' }}
				onClick={ handleOpen }
			>
				{ props.children || <>&nbsp;</> }
			</div>
			<Menu
				anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
				transformOrigin={{ vertical: 'top', horizontal: 'left' }}
				anchorEl={ anchorEl }
				open={ open }
				onClose={ () => handleClose(false) }
			>
				<div style={{ padding: '0 10px 0 10px' }}>
					&#8288;
					<TextField
						variant="standard"
						type={ inputType }
						value={ value }
						onChange={ handleInputChange }
					/>
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
		</>
	)
}

export default InvoiceHeader
