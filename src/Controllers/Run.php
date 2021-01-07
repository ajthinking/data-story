<?php

namespace DataStory\Controllers;

use DataStory\Diagram;

class Run
{
    public function __invoke()
    {
        $diagram = Diagram::deserialize(
            json_decode(request()->input('model'))
        );
    
        $diagram->registerGlobal()->run();
    
        return [
            'status'        => 200,
            'diagram'       => $diagram
        ];      
    }
}