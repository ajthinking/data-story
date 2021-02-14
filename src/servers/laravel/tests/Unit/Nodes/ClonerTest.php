<?php

use DataStory\Diagram;
use DataStory\Nodes\Cloner;
use DataStory\Tests\TestCase;

class ClonerTest extends TestCase
{
    public function test_object_clone()
    {
        Diagram::test()
            ->node(Cloner::class)
            ->input([new stdClass])
            ->assertOutputCount(10);
    }

    public function test_primitive_clone()
    {
        Diagram::test()
            ->node(Cloner::class)
            ->parameters(['number_of_clones' => 3])
            ->input([1337])
            ->assertOutput([1337, 1337, 1337]);
    }


}