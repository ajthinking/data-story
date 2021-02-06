<?php

use DataStory\Diagram;

use DataStory\Nodes\Map;
use DataStory\Tests\TestCase;

class MapTest extends TestCase
{
    public function test_create()
    {
        Diagram::test()
            ->node(Map::class)
            ->input([(object) [
                'cash' => 100
            ]])
            ->parameters(['property' => 'cash'])
            ->assertOutput([100]);
    }  
}