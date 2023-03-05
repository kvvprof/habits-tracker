module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			colors: {
				'black-rgba': 'rgba(0, 0, 0, 0.6)',
				'c-white': 'var(--c-white)',
				'c-white-2': 'var(--c-white-2)',
				'c-gray': 'var(--c-gray)',
				'c-gray-2': 'var(--c-gray-2)',
				'c-gray-3': 'var(--c-gray-3)',
				'c-gray-4': 'var(--c-gray-4)',
				'c-gray-5': 'var(--c-gray-5)',
				'c-pink': 'var(--c-pink)',
				'c-green': 'var(--c-green)',
				'c-carrot': 'var(--c-carrot)',
				'c-yellow': 'var(--c-yellow)',
				'c-black': 'var(--c-black)',
				'c-blue': 'var(--c-blue)'
			}
		},
		screens: {
			xs: { max: '345px' },
			sm: { max: '576px' },
			md: { max: '768px' },
			lg: { max: '992px' },
			xl: { max: '1200px' },
			xxl: { max: '1400px' }
		}
	},
	plugins: [],
	darkMode: 'class'
};
