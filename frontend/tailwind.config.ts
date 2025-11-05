import type { Config } from 'tailwindcss'

const config: Config = {
	content: [
		'./app/**/*.{ts,tsx}',
		'./components/**/*.{ts,tsx}',
		'./pages/**/*.{ts,tsx}',
	],
	theme: {
		extend: {
			colors: {
				primary: {
					DEFAULT: '#111827',
					fg: '#FFFFFF',
				},
				accent: '#6366F1',
			}
		}
	},
	plugins: [],
}
export default config




