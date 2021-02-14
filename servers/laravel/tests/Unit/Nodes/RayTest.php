<?php

use DataStory\Diagram;
use DataStory\Nodes\Ray;
use DataStory\Tests\TestCase;

class RayTest extends TestCase
{
    /** @test */
    public function the_ray_node_requires_spaties_tool_but_wont_crash_if_its_missing()
    {
        Diagram::test()
            ->node(Ray::class)
            ->input(collect(['hi']))
            ->assertCanRun();
    }   
}