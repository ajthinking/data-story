<?php

namespace DataStory;

use DataStory\Support\Id;

class Port
{
    public $id;
    public $type;
    public $x;
    public $y;
    public $name;
    public $alignment;
    public $parentNode;
    public $links;
    public $features;    
    public $in;
    public $label;

    public function __construct($name, $in = true)
    {
        $this->id = Id::make();
        $this->name = $name;
        $this->in = $in;
        $this->links = [];
    }

    public static function hydrate($serialized)
    {
        $instance = new static(1,2);

        foreach($serialized as $key => $value) {
            $instance->$key = $value;
        }

        return $instance;
    }

    public function features($features = null)
    {
        if(!$features) return $this->features;
        
        $this->features = $features;

        return $this;
    }
}