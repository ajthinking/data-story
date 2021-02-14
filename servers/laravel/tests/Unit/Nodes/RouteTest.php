<?php

use DataStory\Diagram;

use DataStory\Nodes\Route;
use DataStory\Tests\TestCase;

class RouteTest extends TestCase
{
    public function test_that_route_returns_only_one_feature()
    {
        Diagram::test()
            ->node(Route::class)
            ->assertOutputCount(1);
    }
}