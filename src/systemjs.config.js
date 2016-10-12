(function(global) {
    System.config({
        paths: {
            'npm:': 'node_modules/'
        },
        map: {
            app: 'app',
            // angular bundles
            '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
            '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
            '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
            '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
            '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
            '@angular/http': 'npm:@angular/http/bundles/http.umd.js',
            '@angular/router': 'npm:@angular/router/bundles/router.umd.js',
            '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',
            // other libraries
            'rxjs': 'npm:rxjs',
            'angular2-in-memory-web-api': 'npm:angular2-in-memory-web-api',
            'angular2-moment': 'npm:angular2-moment',
            'moment': 'npm:moment/min',
            '@vaadin/angular2-polymer': 'npm:@vaadin/angular2-polymer',
            'linq-es2015': 'npm:linq-es2015',
            
        },
        packages: {
            app: {
                main: './main.js',
                defaultExtension: 'js'
            },
            rxjs: {
                defaultExtension: 'js'
            },
            'angular2-in-memory-web-api': {
                main: './index.js',
                defaultExtension: 'js'
            },
            'moment': {
                main: 'moment.min.js',
                defaultExtension: 'js'
            },
            'angular2-moment': {
                main: './index.js',
                defaultExtension: 'js'
            },
            'linq-es2015': {
                main: 'dist/linq.js',
                defaultExtension: 'js'
            }
        }
    });
})(this);