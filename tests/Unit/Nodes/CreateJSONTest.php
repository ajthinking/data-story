<?php

use DataStory\Diagram;

use DataStory\Nodes\CreateJSON;
use DataStory\Tests\TestCase;

class CreateJSONTest extends TestCase
{
    public function test_create()
    {
        Diagram::test()
            ->node(CreateJSON::class)
            ->parameters(['json' => '[{"name": "ajthinking"}]'])
            ->assertOutputCount(1)
            ->assertOutput([
                (object) ['name' => 'ajthinking']
            ]);
    }  
}