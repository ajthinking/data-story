<?php

use DataStory\Diagram;
use DataStory\Nodes\Pass;
use DataStory\Tests\TestCase;

class PassTest extends TestCase
{
    public function test_that_in_and_out_features_matches()
    {
        Diagram::test()
            ->node(Pass::class)
            ->input(collect([1,2,3]))
            ->assertOutput(collect([1,2,3]));
    }
    
    public function test_that_in_and_out_features_matches_explicit_test()
    {
        Diagram::test()
            ->node(Pass::class)
            ->input(collect([1,2,3]))
            ->assertOutput(collect([1,2,3]));
    }    
}