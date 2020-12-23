<?php

namespace DataStory\Tests;

use DataStory\DiagramModel;

class DiagramFactory
{
    public $diagram;

    public $node;

    public function __construct()
    {
        $this->diagram = new DiagramModel;
    }

    public static function make()
    {
        return new static;
    }

    public function withNode($node)
    {
        $this->node = $node;

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