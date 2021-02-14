<?php

namespace DataStory;

use DataStory\Support\Id;

class Link
{
    public function __construct(string $sourcePort, string $targetPort)
    {
        $this->id = Id::make();        
        $this->sourcePort = $sourcePort;
        $this->targetPort = $targetPort;
    }

    public static function hydrate($serialized)
    {
        $instance = new static(1,2);

        foreach($serialized as $key => $value) {
            $instance->$key = $value;
        }

        return $instance;
    }    
}