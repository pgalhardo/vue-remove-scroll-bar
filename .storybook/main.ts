import type { StorybookConfig } from '@storybook/vue3-vite'

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  core: {
		builder: {
			name: '@storybook/builder-vite',
			options: {
				viteConfigPath: '.storybook/vite.config.ts'
			}
		}
	},
  framework: {
    name: '@storybook/vue3-vite',
    options: {},
  },
}
export default config
