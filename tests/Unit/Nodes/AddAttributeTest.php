<?php

use DataStory\Diagram;
use DataStory\Nodes\AddAttribute;
use DataStory\Tests\TestCase;

class AddAttributeTest extends TestCase
{
    /** @test */
    public function can_handle_missing_input_features()
    {
        Diagram::test()
            ->node(AddAttribute::class)
            ->whenNoInput()
            ->assertNoOutput();
    }

    /** @test */
    public function it_will_let_primitive_features_pass_through_unchanged()
    {
        Diagram::test()
            ->node(AddAttribute::class)
            ->assertInputEqualsOutput(
                collect([1, 'two', '3.0', 4.0, '5', true, null, Dummy::class])
            );
    }       

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
        Diagram::test()
            ->node(AddAttribute::class)
            ->input(collect([new stdClass]))
            ->assertOutput(collect([(object) [
                '_new_attribute' => '' // Default parameters
            ]]));
    }    
}