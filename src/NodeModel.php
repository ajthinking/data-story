<?php

namespace DataStory;

use DataStory\Parameters\String_;
use DataStory\Support\ParameterBag;
use Illuminate\Support\Collection;
use stdClass;
use DeepCopy\DeepCopy;

abstract class NodeModel
{
    const IN_PORTS = ['Input'];

    const OUT_PORTS = ['Output'];

    const EDITABLE_IN_PORTS = false;

    const EDITABLE_OUT_PORTS = false;

    const CATEGORY = 'Custom';

    const NODE_MODEL_REACT = 'NodeModel';

    const SHORT_DESCRIPTION = 'This node is not documented yet. Add a class const SHORT_DESCRIPTION or implement a static method shortDescription() to fix that.';

    public string $id;

    public stdClass $data;

    public function __construct()
    {
        $this->ports = [];

        $this->id = substr(str_shuffle(str_repeat($x='0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', ceil(10/strlen($x)) )),1,10);

        $this->data = (object) [
            'id'        => $this->id,
            'ports'     => [],
            'options'   => (object) [
                // 'parameters' => static ...
            ]
        ];
    }

    public static function deserialize(stdClass $serialized)
    {
        $node = new static;

        $node->id = $serialized->id;

        $node->ports = $serialized->ports;

        $node->data = $serialized;
        
        return $node;
    }

    public static function parameters($data = [])
    {
        return collect([
            String_::make('node_name')->default(class_basename(static::class))
        ]);
    }

    public function portNamed($name)
    {
        return collect($this->ports)->where('name', $name)->first();
    }

    public function getDataAtPortNamed($name)
    {
        $port = $this->portNamed($name);

        $collection = collect($port->links)->map(function($linkId) {
            $link = $this->diagram()->find($linkId);
            $source = $this->diagram()->find($link->sourcePort);
            return $source->features;
        })->flatten();

        $copier = new DeepCopy();
        return $copier->copy($collection);
    }

    public function diagram()
    {
        return app('Diagram');
    }

    public function run()
    {

    }

    public static function describe(array $variation = [])
    {
        $description                    = new stdClass;
        $description->name              = class_basename(static::class);
        $description->category          = class_basename(static::CATEGORY);
        $description->summary           = static::SHORT_DESCRIPTION;
        $description->key               = class_basename(static::CATEGORY) . class_basename(static::class);
        $description->nodePhp           = static::class;
        $description->nodeReact         = static::NODE_MODEL_REACT;
        $description->inPorts           = static::IN_PORTS;
        $description->outPorts          = static::OUT_PORTS;
        $description->editableInPorts   = static::EDITABLE_IN_PORTS;
        $description->editableOutPorts  = static::EDITABLE_OUT_PORTS;
        $description->parameters        = static::parameters($variation);

        return $description;

        return [
            'name' => class_basename(static::class),
            'category' => class_basename(static::CATEGORY),
            'summary' => 'This node is not documented yet. Add a class const SHORT_DESCRIPTION or implement a static method shortDescription() to fix that.',
            'key' => class_basename(static::CATEGORY) . class_basename(static::class),
            'nodePhp' => static::class,
            'nodeReact' => static::NODE_MODEL_REACT,
            'inPorts' => static::IN_PORTS,
            'outPorts' => static::OUT_PORTS,
            'parameters' => static::parameters(),
        ];
    }
    
    public static function variations()
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
        $this->portNamed($portName)->features = $features;
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