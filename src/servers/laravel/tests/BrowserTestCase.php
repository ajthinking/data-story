<?php

namespace DataStory\Tests;

use DataStory\Support\SimpleFile;

class BrowserTestCase extends \Orchestra\Testbench\Dusk\TestCase
{
    protected static $baseServeHost = '127.0.0.1';
    protected static $baseServePort = 9000;

    protected function getPackageProviders($app)
    {
        return [
            'DataStory\DataStoryServiceProvider'
        ];
    }

    protected function setUp(): void
    {
        parent::setUp();

        // refactor to ./vendor/bin/testbench-dusk vendor:publish

        $assetsPath = $this->getBasePath() . '/public/vendor/data-story';
        SimpleFile::put(
            $assetsPath . '/js/app.js',
            file_get_contents(__DIR__ . '/../../../../dist/js/app.js')
        );

        SimpleFile::put(
            $assetsPath . '/css/app.css',
            file_get_contents(__DIR__ . '/../../../../dist/css/app.css')
        );        

        $this->loadLaravelMigrations();
        
    }

    protected function getPackageAliases($app)
    {
        return [
            'App\Models\User' => 'DataStory\Tests\Fakes\User',
            'Database\Factories\UserFactory'     => 'DataStory\Tests\Fakes\UserFactory',
        ];
    }    
    
    protected function getEnvironmentSetUp($app)
    {
        // Setup default database to use sqlite :memory:
        $app['config']->set('database.default', 'testbench');
        $app['config']->set('database.connections.testbench', [
            'driver'   => 'sqlite',
            'database' => ':memory:',
            'prefix'   => '',
        ]);
    }
    
    /**
    * Make sure all integration tests use the same Laravel "skeleton" files.
    * This avoids duplicate classes during migrations.
    *
    * Overrides \Orchestra\Testbench\Dusk\TestCase::getBasePath
    *       and \Orchestra\Testbench\Concerns\CreatesApplication::getBasePath
    *
    * @return string
    */
    protected function getBasePath()
    {
        // Adjust this path depending on where your override is located.
        return __DIR__.'/../../../../vendor/orchestra/testbench-dusk/laravel'; 
    }    
}