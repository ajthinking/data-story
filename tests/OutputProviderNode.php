<?php

namespace DataStory\Tests;

use DataStory\Node;

class OutputProviderNode extends Node
{
    public function __construct($features, $requestingPort = 'Input')
    {
        $this->ports = [];

        $this->id = $requestingPort . 'ProviderNode';

        $this->name = $requestingPort . 'ProviderPort';

        $this->ports = [
            (object) [
                'id'        => $requestingPort . 'ProviderPort',
                'name'      => $requestingPort . 'ProviderPort',
                'features'  => $features,
                'links'     => [],
            ]
        ];
    }
}