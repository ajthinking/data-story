<?php

namespace DataStory\Commands;

use DataStory\Support\SimpleFile;
use Illuminate\Console\Command;
use Illuminate\Support\Str;

class ContributeCommand extends Command
{
    protected $signature = 'story:contribute';

    protected $description = 'Setup for contributing to datastory';

    public function handle()
    {
        // dd("as");
        // // confirm path
        // $path = base_path('../dataxstory');
        // $this->confirm("Allow clone to $path?", true) || exit('Okay, aborting!');

        // // git clone
        // exec("git clone git@github.com:ajthinking/data-story.git $path", $output, $failed);
        // if($failed) exit('Could not clone!');
        // $this->info(PHP_EOL .'✅ Installed latest datastory code at ' . realpath($path) . PHP_EOL);

        // // add @dev repo to composer json
        // exec('composer config repositories path ' . realpath($path), $output, $failed);
        // if($failed) exit('Could not configure composer!');
        // $this->info('✅ Added the dev repository to composer.json' . PHP_EOL);

        // // remove production package
        // exec('composer remove ajthinking/data-story', $output, $failed);
        // //if($failed) exit('Could not remove packagist package!');
        // $this->info('✅ Removing the packagist package from composer.json' . PHP_EOL);
        
        // // require as @dev
        // exec('composer require ajthinking/data-story @dev', $output, $failed);
        // if($failed) exit('Could not require the dev package!');
        // $this->info('✅ Requiring the package with @dev' . PHP_EOL);

        // // wow!
        // $this->info("✅ Your all setup! Make your changes in $path");

        // return 0;
    }  
}

// USAGE
// laravel new host && cd host
// composer require ajthinking/data-story
// php artisan datastory:contribute

// This will do the following:
// Clone latest datastory code to a folder `data-story` alongside `host`
// Remove the datastory packagist repo
// Require the local version