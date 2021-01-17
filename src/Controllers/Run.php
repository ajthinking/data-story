<?php

namespace DataStory\Controllers;

use DataStory\Diagram;

class Run
{
    public function __invoke()
    {
        $diagram = Diagram::deserialize(
            request()->input('model')
        );
        
        $diagram->registerGlobal()->run();

        return [
            'status'        => 200,
            'diagram'       => $diagram
        ];      
    }
}