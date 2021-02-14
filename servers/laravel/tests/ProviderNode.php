<?php

namespace DataStory\Tests;

use DataStory\Node;
use DataStory\Port;

class ProviderNode extends Node
{
    public function __construct($features, $requestingPort = 'Input')
    {
        $this->id = $requestingPort . 'ProviderNode';

        $this->ports = [
            (new Port(
                $requestingPort . 'ProviderPort',
                false                
            ))->features($features)
        ];
    }
}