const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

const monthsShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

// return how many day in the target month
export const getDays = (year: number, month: number): number => (
	new Date(year, month, 0).getDate()
)

// return a number represents which day is first day of the month
export const getDayOfFirst = (year: number, month: number): number => (
	new Date(year, month, 1).getDay()
)

export const getDayName = (index: number): string => (
	days[index]
)

export const getMonthName = (index: number): string => (
	months[index]
)

export const getShortMonthName = (index: number): string => (
	monthsShort[index]
)

// return formatted date string. yyyy-mm-dd
export const convertDayToString = (date: Date): string => {
	const fullDate = date.toLocaleDateString().split("/")
	return `${fullDate[2]}-${fullDate[0]}-${fullDate[1]}`
} 