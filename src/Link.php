<?php

namespace DataStory;

class Link
{
    public function __construct()
    {
        // TODO
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