<?php

use DataStory\Diagram;

use DataStory\Nodes\Evaluate;
use DataStory\Tests\TestCase;

class EvaluateTest extends TestCase
{
    public function test_create()
    {
        Diagram::test()
            ->node(Evaluate::class)
            ->input([1,2,3])
            ->parameters(['code' => '$feature *= 2;'])
            ->assertOutput([2,4,6]);
    }  
}