<?php

namespace DataStory\Tests\Unit;

use DataStory\Diagram;
use DataStory\Tests\TestCase;
use App\Models\User;

class DiagramTest extends TestCase
{
    public function test_basic_execution()
    {
        $diagram = $this->sampleDiagram();

        $diagram->registerGlobal()->run();

        $this->assertInstanceOf(Diagram::class, $diagram);

        $this->assertTrue(true);
    }

    protected function sampleDiagram()
    {
        return Diagram::hydrate(
                file_get_contents(__DIR__ . '/sampleDiagram.json')
        );
    }
}