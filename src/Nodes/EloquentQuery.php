<?php

namespace DataStory\Nodes;

use DataStory\Categories\Model;
use DataStory\Node;
use DataStory\Nodes\Factories\EloquentNodeFactory;
use DataStory\Parameters\Number;
use DataStory\Parameters\String_;
use DataStory\Parameters\Where;
use Illuminate\Support\Str;

class EloquentQuery extends Node
{
    const FACTORY = EloquentNodeFactory::class;

    const SHORT_DESCRIPTION  = 'Run query on a Eloquent Model';

    const IN_PORTS = [];

    const CATEGORY = Model::class;

    public function run()
    {
        $this->output(
            $this->getQueryResults()            
        );
    }

    protected function getQueryResults()
    {
        

        // Get QueryBuilder 
        $query = app($this->getParameter('target_model')->value)->query();
        
        // Apply scopes // TODO
        $this->getScopes()->reduce(function($query, $scope) {
            $name = $scope->name;
            $args = $scope->args;
            return $query->$name(...$args);
        }, $query);

        // Apply where statement // TODO ALLOW MULTIPLE
        $this->getWhereStatements()->reduce(function($query, $whereStatement) {
            return $query->where(...$whereStatement);
        }, $query);

        // Apply take/limit
        $query->take($this->getLimit());
        
        // Return results
        return $query->get();
    }

    public static function describe(array $variation = [])
    {        
        $description = parent::describe($variation);
        $description->name = $variation['shortModel'];
        $description->summary = $variation['shortModel'] . '::query()->where(...)';
        
        return $description;
    }

    public static function parameters($variation = [])
    {
        return [
            String_::make('node_name')->default($variation['shortModelPlural']),
            String_::make('target_model')->default($variation['model']),
            Where::make('where_statement'),
            Number::make('limit')->default('')->placeholder('no limit'),
        ];
    }

    protected function getScopes()
    {
        return collect(); // TODO
    }

    protected function getLimit()
    {
        $limit = $this->getParameter('limit')->value;

        if(is_numeric($limit)) {
            return $limit;
        }

        return PHP_INT_MAX;
    }

    protected function getWhereStatements()
    {
        $data = $this->getParameter('where_statement');

        if(!$data->attribute) return collect();

        return collect([
            [
                $data->attribute,
                $data->operator,
                // TODO
                is_numeric($data->value) ? (int) $data->value : $data->value,
            ]
        ]);
    }
}