import {defineConfig} from 'vitepress';
import {createRequire} from 'node:module';

const require: NodeRequire = createRequire(import.meta.url);

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'QR Code Generator',
  description: 'Simple, fast QR Code Generator powered by Angular',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      {text: 'Home', link: '/'},
      {text: 'Examples', link: '/markdown-examples'},
    ],

    sidebar: [
      {
        text: 'Examples',
        items: [
          {text: 'Markdown Examples', link: '/markdown-examples'},
          {text: 'Runtime API Examples', link: '/api-examples'},
        ],
      },
    ],

    socialLinks: [{icon: 'github', link: 'https://github.com/vuejs/vitepress'}],
  },

  base: `/${require('git-repo-name').sync()}/`,
});
