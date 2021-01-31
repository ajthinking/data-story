<?php

namespace DataStory;

use Illuminate\Support\Collection;
use Spatie\DataTransferObject\DataTransferObject;

class NodeDescription extends DataTransferObject
{
    public string $name;
    public string $category;
    public string $summary;
    public string $key;
    public string $nodePhp;
    public string $nodeReact;
    public array $inPorts;
    public array $outPorts;
    public bool $editableInPorts;
    public bool $editableOutPorts;
    public array $parameters;
}