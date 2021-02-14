<?php

namespace DataStory\Parameters;

class Where extends Input
{
    public $fieldType = 'Where';

    public $attribute = '';

    public $operator = '=';

    public $value = '';
}