<?php

use DataStory\Diagram;

use DataStory\Nodes\Create;
use DataStory\Tests\TestCase;

class CreateTest extends TestCase
{
    public function test_create()
    {
        Diagram::test()
            ->node(Create::class)
            ->assertOutputCount(10);
    }

    public function test_create_with_parameters()
    {
        Diagram::test()
            ->node(Create::class)
            ->parameters(['number_of_features_to_create' => 3])
            ->assertOutputCount(3);
    }    
}