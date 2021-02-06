<?php

use DataStory\Diagram;
use DataStory\Nodes\Ray;
use DataStory\Tests\TestCase;

class RayTest extends TestCase
{
    public function test_that_in_and_out_features_matches()
    {
        Diagram::test()
            ->node(Ray::class)
            ->input(collect([1,2,3]))
            ->assertFails();
    }   
}