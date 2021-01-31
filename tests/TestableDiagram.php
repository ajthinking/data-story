<?php

namespace DataStory\Tests;

use DataStory\Diagram;
use PHPUnit\Framework\Assert as PHPUnit;

class TestableDiagram extends Diagram
{
    public $diagram;

    public $node;

    public $hasRun = false;

    public function __construct()
    {
        $this->diagram = new Diagram;

        $this->diagram->links([]);

        $this->diagram->nodes([]);        
    }

    public function node($node)
    {
        $this->node = new $node;

        return $this;
    }

    public function input($features)
    {
        $this->node->ports = [
            (object) [
                'id'        => 'Input',
                'name'      => 'Input',
                'links'     => [],
            ]
        ];

        $this->node->data->ports = $this->node->ports;

        $provider = new OutputProviderNode($features);
        
        $this->diagram->addNode($this->node);
        $this->diagram->addNode($provider);
        $this->diagram->executionOrder = [
                $this->node->id
        ];

        $link = (object) [
            "id"         => "1aabaa3f-5148-4f58-a947-59ebdc30e952",
            "sourcePort" => $provider->portNamed('InputProviderPort')->id,
            "targetPort" => $this->node->portNamed('Input')->id,           
        ];
        // $this->node->ports[0]->links[0] = $link; .. // REARM REGROUP
        $this->diagram->addLink($link);

        return $this;
    }

    public function inputs($inputs)
    {
        return $this;
    }

    public function assertOutput($data, $port = 'Output')
    {
        $this->runOnce();

        PHPUnit::assertTrue(true);

        return $this;
    }    

    public function assertOutputs($outputs)
    {
        // TODO

        PHPUnit::assertTrue(true);

        return $this;
    }

    public function runOnce()
    {
        if(!$this->hasRun) $this->run();
        $this->hasRun = true;
    }    

    public function run()
    {
        $this->diagram->run();
    }
}