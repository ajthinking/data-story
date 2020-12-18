<?php

namespace DataStory\Parameters;

abstract class BaseParameter
{
    public $default;

    public $name;

    public $value;

    public function __construct($name)
    {
        $this->name = $name;
    }

    public static function make($name)
    {
        return new static($name);
    }

    public function default($value)
    {
        $this->default = $value;
        $this->value = $value;

        return $this;
    }
}