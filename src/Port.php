<?php

namespace DataStory;

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
    public $in;
    public $label;

    public function __construct()
    {
        
    }

    public static function hydrate($serialized)
    {
        $instance = new static;

        foreach($serialized as $key => $value) {
            $instance->$key = $value;
        }

        return $instance;
    }
}