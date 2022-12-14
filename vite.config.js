import path from 'path'
import { defineConfig, splitVendorChunkPlugin, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import babel from 'vite-plugin-babel'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
	//const env = loadEnv(mode, process.cwd(), '')
	//console.log(env)
	return {
		clearScreen: true,
		base: mode !== 'development' ? '/vue-api/' : '/',
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
			splitVendorChunkPlugin(),
		],
	}
})

