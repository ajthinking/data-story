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

    public function node($nodeClass, $options = [])
    {
        $this->node = NodeFactory::make($nodeClass, $options)->instance();

        $this->addNode($this->node);

        $this->executionOrder = [
            $this->node->id
        ];        

        return $this;
    }

    public function parameters(array $parameterValues = [])
    {
        foreach($parameterValues as $key => $value) {
            $this->setParameterValue($key, $value);
        }

        return $this;
    }    

    public function input($features)
    {
        $features = collect($features);

        $provider = new ProviderNode($features);
                
        $this->addNode($provider);
        
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

    public function whenNoInput()
    {
        return $this->input(collect());
    }

    public function assertOutput($expected, $port = 'Output')
    {
        $this->runOnce();
        
        $expected = $this->collect($expected);

        PHPUnit::assertEquals(
            $expected,
            $this->node->portNamed($port)->features
        );

        return $this;
    }

    public function assertInputEqualsOutput($expected, $inPort = 'Input', $outPort = 'Output')
    {
        $expected = $this->collect($expected);

        $this->input($expected)->runOnce();

        PHPUnit::assertEquals(
            $expected,
            $this->node->portNamed($outPort)->features
        );

        return $this;
    }    
    
    public function assertNoOutput($port = 'Output')
    {
        $this->runOnce();

        PHPUnit::assertEquals(
            collect(),
            $this->node->portNamed('Output')->features
        );

        return $this;
    }

    public function assertOutputCount($count, $port = 'Output')
    {
        $this->runOnce();

        PHPUnit::assertCount(
            $count,
            $this->node->portNamed('Output')->features
        );

        

        return $this;        
    }

    public function setParameterValue($parameterName, $value)
    {
        $this->node->getParameter($parameterName)->value = $value;

        return $this;
    }

    public function assertOutputs($outputs)
    {
        // TODO

        return $this;
    }

    public function assertCanRun()
    {
        $this->runOnce();

        PHPUnit::assertTrue(true);

        return $this;
    }
    
    public function assertFails()
    {
        try {
            $this->runOnce();
        } catch(\Throwable $e) {
            PHPUnit::assertTrue(true);
            return $this;
        }
        
        PHPUnit::assertTrue(false);
    }    

    public function runOnce()
    {
        if(!$this->hasRun) $this->registerGlobal()->run();
        $this->hasRun = true;
    }

    protected function collect($data)
    {
        return $data instanceof \Illuminate\Support\Collection
            ? $data
            : collect($data);
    }
}