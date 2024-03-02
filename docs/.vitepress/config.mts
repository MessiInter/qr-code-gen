/**
 * @license
 * Copyright MessiInter and contributors All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE.md file at https://github.com/MessiInter/qr-code-gen/blob/master/LICENSE.md
 */

/**
 * @fileoverview
 * This file exports configuration for VitePress
 */

/* eslint-disable node/no-unsupported-features/es-syntax */

import {createRequire} from 'node:module';

import {defineConfig} from 'vitepress';

const require: NodeRequire = createRequire(import.meta.url);

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'QR Code Generator',
  description: 'Simple, fast QR Code Generator powered by Angular',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      {text: 'Home', link: '/'},
      {text: 'App', link: '/app'},
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

    socialLinks: [
      {icon: 'github', link: 'https://github.com/MessiInter/qr-code-gen'},
    ],
  },

  base: `/${require('git-repo-name').sync()}/`,
});
