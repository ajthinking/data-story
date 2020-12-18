<?php

namespace DataStory;

use DataStory\Parameters\String_;
use Illuminate\Support\Collection;
use stdClass;

abstract class NodeModel
{
    const IN_PORTS = ['Input'];

    const OUT_PORTS = ['Output'];

    const CATEGORY = 'Custom';

    const NODE_MODEL_REACT = 'NodeModel';

    public string $id;

    public stdClass $data;

    public static function deserialize(stdClass $serialized)
    {
        $node = new static($serialized->options);

        $node->id = $serialized->id;

        $node->ports = $serialized->ports;

        $node->data = $serialized;
        
        return $node;
    }

    public static function describeParameters($data = [])
    {
        return [
            String_::make('node_name')->default(class_basename(static::class)),
        ];
    }

    public function portNamed($name)
    {
        return collect($this->ports)->where('name', $name)->first();
    }

    public function getDataAtPortNamed($name)
    {
        $port = $this->portNamed($name);

        return collect($port->links)->map(function($linkId) {
            $link = $this->diagram()->find($linkId);
            $source = $this->diagram()->find($link->sourcePort);
            return $source->data;
        })->flatten();
    }

    public function diagram()
    {
        return app('DiagramModel');
    }

    public function run()
    {

    }

    public static function describe($data = [])
    {
        return [
            'name' => class_basename(static::class),
            'category' => class_basename(static::CATEGORY),
            'summary' => 'This node is not documented yet. Add a class const SHORT_DESCRIPTION or implement a static method shortDescription() to fix that.',
            'key' => class_basename(static::CATEGORY) . class_basename(static::class),
            'nodePhp' => static::class,
            'nodeReact' => static::NODE_MODEL_REACT,
            'inPorts' => static::IN_PORTS,
            'outPorts' => static::OUT_PORTS,
            'parameters' => static::describeParameters(),
        ];
    }
    
    public static function describeVariations($data = [])
    {
        return [
            static::describe()
        ];
    }

    public function input(string $portName = 'Input')
    {
        return $this->getDataAtPortNamed($portName);
    }

    public function output(Collection $features, string $portName = 'Output')
    {
        $this->portNamed($portName)->data = $features;
    }

    public function getParameter($name)
    {
        return $this->data->options->parameters->$name->value;
    }

    public function getParameters()
    {
        return $this->data->options->parameters;
    }
}