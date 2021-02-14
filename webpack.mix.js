const mix = require('laravel-mix');

const tailwindcss = require('tailwindcss')

/**
 * The normal build
 */
let pipe = mix.ts('client/js/app.js', 'dist/js')
    .react()
    .sass('client/sass/app.scss', 'dist/css')
    .options({
        processCssUrls: false,
        postCss: [ tailwindcss('tailwind.config.js') ],
    })

/**
 * Extra dev build into a host app dsh1 to avoid having to publish all the time
 */
if(process.env.MIX_DATASTORY_DEV_MODE_AUTO_PUBLISH) {
    pipe.copy('dist', '../dsh1/public/vendor/data-story')
    pipe.copy('dist', 'docs') // github pages
}