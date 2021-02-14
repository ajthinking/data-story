<?php

namespace DataStory\Nodes\Factories;

use DataStory\Port;

class NodeFactory
{
    public $variation = [];

    public function __construct($nodeClass, $variation = [])
    {
        $this->nodeClass = $nodeClass;
        $this->variation = $variation;
    }

    public static function make($nodeClass, $variation = [])
    {
        return new static($nodeClass, $variation);
    }

    public function variations()
    {
        return [
            // Most nodes have only one variation
            // If they have more they need to implement their own factory
            $this->nodeClass::describe()
        ];
    }

    public function instance()
    {
        $desc = $this->nodeClass::describe($this->variation);

        $inPorts = collect($desc->inPorts)->map(function($name) {
            return new Port($name, $in = true);
        });
        $outPorts = collect($desc->outPorts)->map(function($name) {
            return new Port($name, $in = false);
        });        

        $instance = new $this->nodeClass(
            $inPorts->concat($outPorts)->toArray()
        );

        $instance->options((object) [
            'parameters' => $desc->parameters
        ]);

        return $instance;
    }
}