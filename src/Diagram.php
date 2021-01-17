<?php

namespace DataStory;

class Diagram
{
    public array $nodes;

    public array $links;

    public array $executionOrder = [];

    public $result = null;

    public function __invoke()
    {
        dd("YOOO???");
    }

    public function find($id)
    {
        return collect(
            array_merge($this->links(), $this->nodes(), $this->ports())
        )->where('id', $id)->first();
    }

    public function links($links = null)
    {
        if ($links === null) return $this->links;

        $this->links = $links;

        return $this;
    }

    public function nodes($nodes = null)
    {
        if ($nodes === null) return $this->nodes;

        $this->nodes = $nodes;

        return $this;
    }

    public function ports()
    {
        return collect($this->nodes)->pluck('ports')->flatten()->toArray();
    }

    public static function deserialize($serialized)
    {
        $data = json_decode($serialized);

        $diagram = new Diagram();

        $diagram->links(
            collect(
                array_values((array)$data->layers[0]->models)
            )->toArray()
        );

        $diagram->nodes(
            collect(
                array_values((array) $data->layers[1]->models)
            )->map(function ($serializedNode) {
                $nodeType = $serializedNode->options->nodePhp;
                return $nodeType::deserialize($serializedNode);
            })->toArray()
        );

        $diagram->executionOrder = $data->executionOrder;

        return $diagram;
    }

    public function registerGlobal()
    {
        return app()->instance('Diagram', $this);
    }

    public function run()
    {
        foreach ($this->executionOrder as $nodeId) {

            $node = $this->find($nodeId);

            $node->run();
        }

        return $this;
    }

    public function setResult($result)
    {
        $this->result = $result;
        
        return $this;
    }

    public function getResult()
    {
        return $this->result;
    }

    public static function capabilities()
    {
        return [
            'availableNodes' => NodeCatalogue::make()->toArray()
        ];
    }

    public function publishes()
    {
        return collect($this->nodes)->map(function($node) {
            if(!method_exists($node, 'publishes')) return;

            return $node->publishes();
        })->filter();
    }
}