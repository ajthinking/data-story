<?php

namespace DataStory\Tests\Feature;

use DataStory\Tests\TestCase;

class WorkbenchTest extends TestCase
{
    public function test_that_it_can_render_the_workbench()
    {
        $this->get('/datastory')->assertStatus(200);
    }

    public function test_that_the_laravel_server_can_boot()
    {
        $this->post('/datastory/api/boot')->assertStatus(200);
    }
}