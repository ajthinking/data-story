<?php

namespace DataStory\Nodes;

use DataStory\NodeModel;
use DataStory\Parameters\String_;

class PortMap extends NodeModel
{
    const OUT_PORTS = [];

    const SHORT_DESCRIPTION  = 'Map properties into ports';

    const EDITABLE_OUT_PORTS = true;

    public static function parameters($variation = [])
    {
        return [
            String_::make('node_name')->default('PortMap'),
        ];
    }

    public function run()
    {
        foreach($this->getOutPorts() as $port)
        {
            $this->output(
                $this->input()->pluck($port->name),
                $port->name
            );
        }
    }
}