<?php

namespace DataStory\Nodes\Factories;

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
}