export function formatDate(timestamp) {
	const date = new Date(timestamp)
	return date
		.toLocaleDateString('ES-MX')
		.replace(/\d+\//g, part => part.length===3 ? part : `0${part}` )
}
