const mix = require('laravel-mix');

const tailwindcss = require('tailwindcss')

// bundle into dist/
mix.ts('src/core/app.tsx', 'dist/js').react()
    .sass('src/core/sass/app.scss', 'dist/css').options({
        processCssUrls: false,
        postCss: [ tailwindcss('tailwind.config.js') ],
    })
	.copy('dist', 'public') // easy dev access
	.copy('dist', 'docs').copy('public/index.html', 'docs/index.html') // github pages requires dir 'docs'