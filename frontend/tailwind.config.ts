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
			},
			boxShadow: {
				chunky: '6px 6px 0 0 rgba(0,0,0,0.25)'
			},
			borderRadius: {
				xl2: '20px'
			},
			transitionTimingFunction: {
				friendly: 'cubic-bezier(.2,.8,.2,1)'
			},
			keyframes: {
				shimmer: {
					'0%': { backgroundPosition: '-200% 0' },
					'100%': { backgroundPosition: '200% 0' }
				},
				'slide-fade-in': {
					from: { opacity: '0', transform: 'translateY(8px)' },
					to: { opacity: '1', transform: 'translateY(0)' }
				}
			},
			animation: {
				shimmer: 'shimmer 1.2s linear infinite',
				'slide-fade-in': 'slide-fade-in .25s var(--ease-friendly, cubic-bezier(.2,.8,.2,1)) both'
			}
		}
	},
	plugins: [],
}
export default config
