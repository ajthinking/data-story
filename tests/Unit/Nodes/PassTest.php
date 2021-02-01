<?php

use DataStory\Diagram;
use DataStory\Nodes\Pass;
use DataStory\Tests\TestCase;

class CreateTest extends TestCase
{
    public function test_that_it_can_create_features()
    {
        $this->markTestIncomplete('WIP'); 

        Diagram::test()
            ->node(Pass::class)
            ->input(collect([1,2,3]))
            ->assertOutput(collect([1,2,3]));
    }
}