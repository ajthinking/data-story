<?php

namespace DataStory\Parameters;

abstract class BaseParameter
{
    public $default;

    public $fieldType = 'String_';    

    public $name;

    public $value;

    public $placeholder = '';

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

    public function placeholder($placeholder)
    {
        $this->placeholder = $placeholder;

        return $this;
    }    
}