<?php

namespace DataStory\Nodes\Factories;

class EloquentNodeFactory extends NodeFactory
{
    public function variations()
    {
        return $this->getAppModels()->map(function($model) {
                return $this->nodeClass::describe([
                    'model' => $model
                ]);
            })->toArray();
    }
    
    protected function getAppModels()
    {
		$models = collect();

        $finder = new \Symfony\Component\Finder\Finder();
        $finder->files()->name('*.php')->in(
            config('data-story.models-dir')
        );

        foreach ($finder as $file) {
            $namespace = config('data-story.models-namespace');

            if ($relativePath = $file->getRelativePath()) {
                $namespace .= strtr($relativePath, '/', '\\') . '\\';
            }

            $class = $namespace . $file->getBasename('.php');

            try {
                $r = new \ReflectionClass($class);

                if ($r->isSubclassOf('Illuminate\\Database\\Eloquent\\Model')) {
                  $models->push($class);
                }
            } catch (\Throwable $e) {
                //
            }
        }
		return collect($models);        
    }    
}