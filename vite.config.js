import path from 'path'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import babel from 'vite-plugin-babel'
//  const path = require('path')

// https://vitejs.dev/config/
export default defineConfig({
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
			components: path.resolve(__dirname, './src/components'),
			composables: path.resolve(__dirname, './src/composables'),
			assets: path.resolve(__dirname, './src/assets'),
		},
	},

	plugins: [
		// Babel will try to pick up Babel config files (.babelrc or .babelrc.json)
		babel(),
		vue(),
	],
})

