<?php

namespace DataStory\Nodes;

use DataStory\NodeModel;
use DataStory\Parameters\String_;

class Filter extends NodeModel
{
    const SHORT_DESCRIPTION  = 'Map features to output ports depending on feature attribute value';

    const IN_PORTS = ['Input'];

    const OUT_PORTS = ['Default'];

    const EDITABLE_OUT_PORTS = true;

    public static function parameters($variation = [])
    {
        return [
            String_::make('node_name')->default('Filter'),
            String_::make('filter_attribute')->default(''),
        ];
    }

    public function run()
    {
        $groups = $this->input()->groupBy(
            $this->getParameter('filter_attribute')
        );
        
        $unmatched = $groups->filter(function($features, $port) {
            // Is unmatched? Keep.
            if(!$this->portNamed($port)) return true;
            
            // Else output to explicit port and remove
            $this->output($features, $port);
            return false;    
        });

        $this->output($unmatched, 'Default');

    }
}