<?php

namespace DataStory\Nodes;

use DataStory\Categories\Eloquent;
use DataStory\NodeModel;
use DataStory\Parameters\String_;

class EloquentQuery extends NodeModel
{
    const IN_PORTS = [];

    const CATEGORY = Eloquent::class;

    public function run()
    {
        $this->output(
            $this->getQueryResults()            
        );
    }

    protected function getQueryResults()
    {
        // Get QueryBuilder
        $query = app($this->data->options->parameters->target_model->value)->query();

        // Apply scopes
        $query = collect([])->reduce(function($query, $scope) {
            $name = $scope->name;
            $args = $scope->args;
            return $query->$name(...$args);
        }, $query);

        // Apply where statements
        $query = collect([])->reduce(function($query, $whereStatement) {
            return $query->where(...$whereStatement->args);
        }, $query);

        // Apply take/limit
        // TODO
        
        // Return results
        return $query->get();
    }

    public static function describe(array $variation = [])
    {
        $variation['shortModel'] = class_basename($variation['model']);
        $variation['shortModelPlural'] = (string) \Illuminate\Support\Str::of($variation['shortModel'])->plural();

        return parent::describe($variation);
    }

    public static function parameters($variation = [])
    {
        return [
            String_::make('node_name')->default($variation['shortModelPlural']),
            String_::make('target_model')->default($variation['model']),
            String_::make('scopes')->default('no scopes available'),
            String_::make('where_statements')->default(''),
            String_::make('limit')->default('')->placeholder('no limit'),
            String_::make('run get()')->default('yes'),
        ];
    }
    
    public static function variations()
    {
        $models = [
            \App\Models\User::class,
        ];

        return [
            ...collect($models)->map(function($model) {
                return static::describe([
                    'model' => $model
                ]);
            })->toArray()
        ];
    }
}

// class NodeAbstract ??????
// {
//     function describe() {}
//     function parameters() {}
//     function variations() {} // Move to NodeCatalouge
//     function run() {}
// }