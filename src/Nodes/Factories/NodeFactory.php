<?php

namespace DataStory\Nodes\Factories;

use DataStory\Port;

class NodeFactory
{
    public function __construct($nodeClass)
    {
        $this->nodeClass = $nodeClass;
    }

    public static function make($nodeClass)
    {
        return new static($nodeClass);
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
        $desc = $this->nodeClass::describe();
        
        $inPorts = collect($desc->inPorts)->map(function($name) {
            return new Port($name, $in = true);
        });
        $outPorts = collect($desc->outPorts)->map(function($name) {
            return new Port($name, $in = false);
        });        

        return new $this->nodeClass(
            $inPorts->concat($outPorts)->toArray()
        );
    }
}