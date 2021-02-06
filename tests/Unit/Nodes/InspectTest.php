<?php

use DataStory\Diagram;
use DataStory\Nodes\Inspect;
use DataStory\Tests\TestCase;

class InspectTest extends TestCase
{
    public function test_create()
    {
        Diagram::test()
            ->node(Inspect::class)
            ->input([1,2,3])
            ->assertItCouldRun();
            // TODO WHAT ASSERT HERE? IT DOES NOT OUTPUT
    }  
}