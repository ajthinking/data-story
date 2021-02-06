const mix = require('laravel-mix');

const tailwindcss = require('tailwindcss')

/**
 * The normal build
 */
let pipe = mix.js('src/resources/js/app.js', 'src/dist/js')
    .react()
    .sass('src/resources/sass/app.scss', 'src/dist/css')
    .options({
        processCssUrls: false,
        postCss: [ tailwindcss('tailwind.config.js') ],
    })

/**
 * Extra dev build into a host app dsh1 to avoid having to publish all the time
 */
if(process.env.MIX_DATASTORY_DEV_MODE_AUTO_PUBLISH) {
    pipe.copy('src/dist', '../dsh1/public/vendor/data-story')
    pipe.copy('src/dist', 'docs') // github pages
}