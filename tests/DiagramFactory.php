<?php

namespace DataStory\Tests;

use DataStory\Diagram;

class DiagramFactory
{
    public $diagram;

    public $node;

    public function __construct()
    {
        $this->diagram = new Diagram;

        $this->diagram->links([]);

        $this->diagram->nodes([]);

        $this->diagram->data = (object) [
            'executionOrder' => [
            ]
        ];        
    }

    public static function make()
    {
        return new static;
    }

    public function withNode($nodeClass)
    {
        $this->node = new $nodeClass;

        $this->diagram->nodes[] = $this->node;

        $this->diagram->data->executionOrder[] = $this->node->data->id;

        return $this;
    }

    public function recievingInputs(array $inputs)
    {
        return $this;
    }

    public function get()
    {
        return $this->diagram;
    }
}