export const useConvertToArabicNumerals = (input) => {
	const arabicNumerals = {
		'0': '٠',
		'1': '۱',
		'2': '٢',
		'3': '٣',
		'4': '٤',
		'5': '٥',
		'6': '٦',
		'7': '٧',
		'8': '۸',
		'9': '٩'
	}

  return input
	.toString()
	.split('')
	.map(char => arabicNumerals[char] || char)
	.join('')
}