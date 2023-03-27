export const getSpent = (budget) => {
    const spent = budget.transactions.reduce((acc, cur) => acc + cur.amount, 0)
    return spent
}

export const getRemain = (budget) => {
    const spent = getSpent(budget)
    return budget.amount - spent
}

export const getState = (budget) => {
    const spent = getSpent(budget)
    const remain = budget.amount - spent
    if (remain < 0) return 'overdrafted'
    if (remain > 0) return 'great'
    if (remain === 0) return 'caution'
}

export const isActive = (budget) => {
    const today = new Date().toISOString()
    const startDate = new Date(budget.startDate).toISOString()
    const endDate = new Date(budget.endDate).toISOString()
    return today >= startDate && today <= endDate
}