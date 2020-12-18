<?php

namespace DataStory\Nodes;

use DataStory\Categories\Eloquent;
use DataStory\NodeModel;

class EloquentReader extends NodeModel
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
        $query = app($this->data->options->targetEloquentModel)->query();

        // Apply scopes
        $query = collect($this->data->options->scopes)->reduce(function($query, $scope) {
            $name = $scope->name;
            $args = $scope->args;
            return $query->$name(...$args);
        }, $query);

        // Apply where statements
        $query = collect($this->data->options->whereStatements)->reduce(function($query, $whereStatement) {
            return $query->where(...$whereStatement->args);
        }, $query);
        
        // Return results
        return $query->get();
    }

    public static function describe($data = [])
    {
        $shortCategory = class_basename(static::CATEGORY);
        $data['shortModel'] = class_basename($data['model']);
        $data['shortModelPlural'] = (string) \Illuminate\Support\Str::of($data['shortModel'])->plural();

        return [
            'nodePhp' => static::class,
            'nodeReact' => static::NODE_MODEL_REACT,
            'key' => $shortCategory . static::class . (string) $data['shortModelPlural'],
            'name' => (string) $data['shortModelPlural'],
            'category' => $shortCategory,
            'summary' => $data['shortModel'] . '::where(...)',
            'inPorts' => static::IN_PORTS,
            'outPorts' => static::OUT_PORTS,
            'parameters' => [],
            'targetEloquentModel' => $data['model'],
            'scopes' => [],
            'whereStatements' => [],
            'parameters' => parent::describeParameters($data),            
        ];
    }

    // public static function describeParameters($data = [])
    // {
    //     return [
    //         'node_name' => String_::make()->default('Clone'),
    //     ];
    // }
    
    public static function describeVariations($data = [])
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