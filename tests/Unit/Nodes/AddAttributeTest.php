<?php

use DataStory\Diagram;
use DataStory\Nodes\AddAttribute;
use DataStory\Tests\TestCase;

class AddAttributeTest extends TestCase
{
    /** @test */
    public function works_on_arrays()
    {
        Diagram::test()
            ->node(AddAttribute::class)
            ->input(collect([[]]))
            ->assertOutput(collect([[
                '_new_attribute' => '' // Default parameters
            ]]));
    }

    /** @test */    
    public function works_on_objects()
    {
        $this->markTestIncomplete();
        Diagram::test()
            ->node(AddAttribute::class)
            ->input(collect([new stdClass]))
            ->assertOutput(collect([(object) [
                '_new_attribute' => '' // Default parameters
            ]]));
    }    
}