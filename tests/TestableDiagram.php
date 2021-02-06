<?php

namespace DataStory\Tests;

use DataStory\Diagram;
use DataStory\Link;
use DataStory\Nodes\Factories\NodeFactory;
use DataStory\Port;
use PHPUnit\Framework\Assert as PHPUnit;

class TestableDiagram extends Diagram
{
    public $node;

    public $hasRun = false;

    public function __construct()
    {
        $this->links([]);

        $this->nodes([]);        
    }

    public function node($nodeClass, array $options = [])
    {
        $this->node = NodeFactory::make($nodeClass)->instance();

        return $this;
    }

    public function input($features)
    {
        $provider = new ProviderNode($features);
        
        $this->addNode($this->node);
        $this->addNode($provider);
        $this->executionOrder = [
            $this->node->id
        ];
        
        $link = new Link(
            $provider->portNamed('InputProviderPort')->id,
            $this->node->portNamed('Input')->id,           
        );        
        
        $this->addLink($link);

        return $this;
    }

    public function inputs($inputs)
    {
        return $this;
    }

    public function assertOutput($data, $port = 'Output')
    {
        $this->runOnce();

        PHPUnit::assertEquals(
            $data,
            $this->node->portNamed($port)->features
        );

        return $this;
    }    

    public function assertOutputs($outputs)
    {
        // TODO

        return $this;
    }

    public function runOnce()
    {
        if(!$this->hasRun) $this->registerGlobal()->run();
        $this->hasRun = true;
    }
}