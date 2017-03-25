import 'angular2-meteor-polyfills';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './imports/app/app.module';

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/css/bootstrap-theme.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'

const platform = platformBrowserDynamic();
platform.bootstrapModule(AppModule);