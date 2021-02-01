<?php

namespace DataStory\Tests\Feature;

use DataStory\Tests\TestCase;

class RenderTest extends TestCase
{
    public function test_that_it_can_render_the_workbench()
    {
        $this->get('/datastory')->assertStatus(200);
    }
}