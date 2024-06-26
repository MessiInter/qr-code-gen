/**
 * @license
 * Copyright MessiInter and contributors All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE.md file at https://github.com/MessiInter/qr-code-gen/blob/master/LICENSE.md
 */

/**
 * @fileoverview
 * This file will be used to bootstrap the app
 */

import {enableProdMode} from '@angular/core';
import {bootstrapApplication} from '@angular/platform-browser';

import {AppComponent} from './app/app.component';
import {appConfig} from './app/app.config';
import {environment} from './environments/environment';

if (environment.production) enableProdMode();

bootstrapApplication(AppComponent, appConfig).catch(err => console.error(err));
