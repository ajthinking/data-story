<?php

namespace DataStory;

use stdClass;

class DiagramModel
{
    public array $nodes;

    public array $links;

    public function find($id)
    {
        return collect(
            array_merge($this->links(), $this->nodes(), $this->ports())
        )->where('id', $id)->first();
    }

    public function links($links = null) 
    {
        if($links === null) return $this->links;

        $this->links = $links;

        return $this;
    }

    public function nodes($nodes = null) 
    {
        if($nodes === null) return $this->nodes;

        $this->nodes = $nodes;

        return $this;
    }

    public function ports() 
    {
        return collect($this->nodes)->pluck('ports')->flatten()->toArray();
    }

    public function bindDataToPort($portId, $data)
    {
        //
    }

    public static function deserialize($serialized)
    {
        $diagram = new DiagramModel();

        $diagram->links(
            collect(
                array_values((array) $serialized->layers[0]->models)
            )->toArray()
        );

        $diagram->nodes(
            collect(
                array_values((array) $serialized->layers[1]->models)
            )->map(function($serializedNode) {
                $nodeType = $serializedNode->options->nodePhp;
                return $nodeType::deserialize($serializedNode);
            })->toArray()
        );

        $diagram->data = $serialized;

        return $diagram;        
    }

    public function registerGlobal()
    {
        return app()->instance('DiagramModel', $this);
    }

    public function run()
    {
        foreach($this->data->executionOrder as $nodeId) {
            
            $node = $this->find($nodeId);

            $node->run();
        }

        return $this;
    }

    public static function capabilities()
    {
        return [
            'availableNodes' => NodeCatalogue::make()->toArray()
        ];
    }
}