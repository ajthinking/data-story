<?php

namespace DataStory\Tests\Unit;

use DataStory\DiagramModel;
use DataStory\Tests\TestCase;
use App\Models\User;

class DiagramModelTest extends TestCase
{
    public function test_basic_execution()
    {
        $diagram = $this->sampleDiagram();

        $diagram->registerGlobal()->run();

        $this->assertInstanceOf(DiagramModel::class, $diagram);

        $this->assertTrue(true);
    }

    protected function sampleDiagram()
    {
        return DiagramModel::deserialize(
            json_decode(
                file_get_contents(__DIR__ . '/sampleDiagram.json')
            )
        );
    }
}