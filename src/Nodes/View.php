<?php

namespace DataStory\Nodes;

use DataStory\Categories\Laravel;
use DataStory\NodeModel;
use DataStory\Parameters\String_;

class View extends NodeModel
{
    const CATEGORY = Laravel::class;

    const OUT_PORTS = [];
    
    const EDITABLE_IN_PORTS = true;    

    public static function parameters($data = [])
    {
        return [
            String_::make('node_name')->default('View'),
            String_::make('view')->default('welcome'),
        ];
    }

    public function run()
    {
        $view = view($this->getParameter('view'))
            ->with(
                $this->getViewData()                
            );

        $this->diagram()->setResult(
            $view
        );
    }

    protected function getViewData()
    {
        return collect($this->ports)->where('name', '!=', 'Input')
            ->flatMap(function($port) {
                return [
                    $port->name => $this->getDataAtPortNamed($port->name)
                ];
            })->all();
    }
}