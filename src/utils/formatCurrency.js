const numberFormat = new Intl.NumberFormat('en-US', {
	style: 'currency',
	currency: 'USD'
});

export default function formatCurrency(value) {
    return numberFormat.format(value);
}