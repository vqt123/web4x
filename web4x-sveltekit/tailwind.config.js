/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				'terminal-green': '#00ff00',
				'terminal-bg': '#0a0a0a',
				'terminal-border': '#333',
			},
			fontFamily: {
				'mono': ['Courier New', 'monospace'],
			}
		}
	},
	plugins: []
};