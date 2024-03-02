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

import {defineConfig} from 'vitepress';

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
});
