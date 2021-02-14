<?php

namespace DataStory;

use DataStory\Nodes\Factories\NodeFactory;
use DataStory\Parameters\String_;
use DataStory\Support\Id;
use Illuminate\Support\Collection;
use stdClass;
use DeepCopy\DeepCopy;

abstract class Node
{
    const FACTORY = NodeFactory::class;

    const IN_PORTS = ['Input'];

    const OUT_PORTS = ['Output'];

    const EDITABLE_IN_PORTS = false;

    const EDITABLE_OUT_PORTS = false;

    const CATEGORY = 'Custom';

    const NODE_MODEL_REACT = 'Node';

    const SHORT_DESCRIPTION = 'This node is not documented yet. Add a class const SHORT_DESCRIPTION or implement a static method shortDescription() to fix that.';

    public string $id;

    public function __construct(array $ports = [])
    {
        $this->id = Id::make();

        $this->ports = $ports;
    }

    public static function factory()
    {
        $factory = static::FACTORY;

        return $factory::make(static::class);
    }

    public function options($options = null)
    {
        if(!$options) return $this->options;

        $this->options = $options;

        return $this;
    }

    public function setParameters($parameters)
    {
        $this->parameters = $parameters;

        return $this;
    }    

    public static function hydrate(stdClass $serialized)
    {
        $node = new static;

        $node->id = $serialized->id;

        $node->ports = collect($serialized->ports)->map(function($port) {
            return Port::hydrate($port);
        })->toArray();

        $node->options = $serialized->options;

        return $node;
    }

    public static function parameters($data = [])
    {
        return [
            String_::make('node_name')->default(class_basename(static::class))
        ];
    }

    public function portNamed($name)
    {
        return collect($this->ports)->where('name', $name)->first();
    }

    public function getDataAtPortNamed($name)
    {
        
        $port = $this->portNamed($name);
        
        $collection = collect($port->links)->map(function ($linkId) {
            $link = $this->diagram()->find($linkId);
            $source = $this->diagram()->find($link->sourcePort);

            return $source->features;
        })->flatten(1);

        $copier = new DeepCopy();
        return $copier->copy($collection);
    }

    public function getInPorts()
    {
        return collect($this->ports)->filter(function($port) {
            return $port->in;
        })->toArray();
    }

    public function getOutPorts()
    {
        return collect($this->ports)->filter(function($port) {
            return !$port->in;
        })->toArray();
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
        return new NodeDescription([
            'name' => class_basename(static::class),
            'category' => class_basename(static::CATEGORY),
            'summary' => static::SHORT_DESCRIPTION,
            'key' => class_basename(static::CATEGORY) . class_basename(static::class),
            'nodePhp' => static::class,
            'nodeReact' => static::NODE_MODEL_REACT,
            'inPorts' => static::IN_PORTS,
            'outPorts' => static::OUT_PORTS,
            'editableInPorts' => static::EDITABLE_IN_PORTS,
            'editableOutPorts' => static::EDITABLE_OUT_PORTS,
            'parameters' => static::parameters($variation),
        ]);
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
        return collect($this->options->parameters)->where('name', $name)->first();
    }

    public function getParameters()
    {
        return $this->options->parameters;
    }
}