<?php

use DataStory\Diagram;
use DataStory\Nodes\Ray;
use DataStory\Tests\TestCase;

class RayTest extends TestCase
{
    public function the_ray_node_requires_spaties_tool()
    {
        Diagram::test()
            ->node(Ray::class)
            ->input(collect(['hi']))
            ->assertCanRun();
    }   
}