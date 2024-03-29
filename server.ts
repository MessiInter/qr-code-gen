/**
 * @license
 * Copyright MessiInter and contributors All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE.md file at https://github.com/MessiInter/qr-code-gen/blob/master/LICENSE.md
 */

/**
 * @fileoverview
 * This file will be used to start the server for hosting
 */

import {dirname, join, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';

import {APP_BASE_HREF} from '@angular/common';
import {CommonEngine} from '@angular/ssr';
import express from 'express';

import bootstrap from './src/main.server';

// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
  const server: express.Express = express();
  const serverDistFolder: string = dirname(fileURLToPath(import.meta.url));
  const browserDistFolder: string = resolve(serverDistFolder, '../browser');
  const indexHtml: string = join(serverDistFolder, 'index.server.html');

  const commonEngine: CommonEngine = new CommonEngine();

  server.set('view engine', 'html');
  server.set('views', browserDistFolder);

  // Example Express Rest API endpoints
  // server.get('/api/**', (req, res) => { });
  // Serve static files from /browser
  server.get(
    '*.*',
    express.static(browserDistFolder, {
      maxAge: '1y',
    })
  );

  // All regular routes use the Angular engine
  server.get(
    '*',
    (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      const {protocol, originalUrl, baseUrl, headers} = req;

      commonEngine
        .render({
          bootstrap,
          documentFilePath: indexHtml,
          url: `${protocol}://${headers.host}${originalUrl}`,
          publicPath: browserDistFolder,
          providers: [{provide: APP_BASE_HREF, useValue: baseUrl}],
        })
        .then(html => res.send(html))
        .catch(err => next(err));
    }
  );

  return server;
}

function run(): void {
  const port: string | number = process.env['PORT'] || 4000;

  // Start up the Node server
  const server: express.Express = app();
  server.listen(port, () =>
    console.log(`Node Express server listening on http://localhost:${port}`)
  );
}

run();
