<?php

namespace DataStory\Tests;

class TestCase extends \Orchestra\Testbench\TestCase
{
    protected function getPackageProviders($app)
    {
        return [
            'DataStory\DataStoryServiceProvider'
        ];
    }

    protected function setUp(): void
    {
        parent::setUp();
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
        return __DIR__.'/../../../vendor/orchestra/testbench-dusk/laravel'; 
    }    
}