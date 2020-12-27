<?php

use DataStory\Nodes\Create;
use DataStory\Tests\DiagramFactory;
use DataStory\Tests\TestCase;

class CreateTest extends TestCase
{
    public function test_that_it_can_create_features()
    {
        $this->markTestIncomplete('How to new up a Diagram? We need executionOrder, data etc from frontend?');

        $diagram = DiagramFactory::make()
            ->withNode(Create::class)
            ->recievingInputs([
                //
            ])->get();

        $diagram->run();
    }
}