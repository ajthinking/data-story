<?php

use DataStory\Diagram;
use DataStory\Nodes\AddAttribute;
use DataStory\Tests\TestCase;

class AddAttributeTest extends TestCase
{
    public function test_that_it_wont_work_with_numbers()
    {
        $this->markTestIncomplete('The options/parameters object needs refactoring');

        Diagram::test()
            ->node(AddAttribute::class, [
                // options here
            ])
            ->input(collect([1,2,3]))
            ->assertOutput(collect([1,2,3]));
    }
}