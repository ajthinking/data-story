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
            'App\Models\User'                        => 'DataStory\Tests\Fake\App\Models\User',
            'Database\Factories\Models\UserFactory'  => 'DataStory\Tests\Fake\Database\Factories\UserFactory'
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
}