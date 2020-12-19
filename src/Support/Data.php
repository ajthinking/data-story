<?php

namespace DataStory\Support;

use Exception;

class Data
{
    public $raw;

    public function __construct($entity)
    {
        $this->raw = $entity;
    }

    public static function of($entity)
    {
        return new static($entity);
    }

    public function type()
    {
        return gettype($this->raw);
    }

    public function set($key, $value)
    {
        $type = $this->type();

        if($type === 'object') {
            $this->raw->$key = $value;
        }

        if($type === 'array') {
            $this->raw[$key] = $value;
        }

        if($type != 'object' && $type != 'array') {
            //throw new Exception("Can not set property on type $type");
        }

        return $this->raw;
    }
}