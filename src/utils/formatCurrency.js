const numberFormat = new Intl.NumberFormat(undefined, {
	style: 'currency',
	currency: 'USD'
});

export default function formatCurrency(value) {
    return numberFormat.format(value);
}