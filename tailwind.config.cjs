/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				'yale-blue': {
					DEFAULT: "#3C91E6",
					dark: "#2685E3",
					darker: "#1A70C7",
				},
				'raisin-black': {
					DEFAULT: '#2B2A33',
					dark: '#1C1C22',
					darker: '#09090B',
				}
			}
		},
	},
	plugins: [],
}
