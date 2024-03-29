/// <reference types="vitest" />
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import type { UserConfig as VitestUserConfigInterface } from 'vitest/config';
import wasm from 'vite-plugin-wasm';
import topLevelAwait from 'vite-plugin-top-level-await';

const vitestConfig: VitestUserConfigInterface = {
	test: {
		globals: true,
		environment: 'jsdom',
		coverage: {
			// or 'istanbul'
			provider: 'c8',
			reporter: ['text', 'lcov']
		}
	}
};
export default defineConfig(({ mode }) => {
	// https://cn.vitejs.dev/config/#using-environment-variables-in-config
	const env = loadEnv(mode, process.cwd(), '');
	console.log(env.BASE_URL, 'env.BASE_URL');
	return {
		plugins: [react(), wasm(), topLevelAwait()],
		base: env.BASE_URL,
		resolve: {
			alias: {
				'@': resolve(__dirname, 'src')
			}
		},
		test: vitestConfig.test
	};
});
