<?php

namespace DataStory;

use DataStory\Commands\NodeCommand;
use DataStory\Models\Story;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\ServiceProvider;
use Throwable;

class DataStoryServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        $this->mergeConfigFrom(
            __DIR__ . '/config/defaults.php', 'data-story'
        );

        $this->commands([
            NodeCommand::class
        ]);
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        $this->loadViewsFrom(__DIR__ . '/resources/views', 'data-story');

        $this->publishes([
            __DIR__ . '/dist' => public_path('vendor/data-story'),
        ], 'public');

        $this->publishes([
            __DIR__ . '/config/defaults.php' => config_path('data-story.php'),
        ], 'config');

        require __DIR__ . '/routes/web.php';
        require __DIR__ . '/routes/api.php';

        $this->publishStoryRoutes();
    }

    /**
     * @return mixed
     */
    public static function isInDevelopment()
    {
        return config('data-story.dev-mode');
    }

    protected function publishStoryRoutes()
    {
        if(!config('data-story.enable-story-routes')) return;

        $routes = Story::all()->flatMap(function($story) {
            try {
                $diagram = Diagram::deserialize($story->content);
                $routes = $diagram->publishes();
                $routes->each(function($route) use($diagram) {
                    try {
                        Route::get($route->uri, $diagram);
                    } catch(Throwable $e) {
                        //dd($e);
                    }
                });

                return $routes;
            } catch(Throwable $e) {

            }
        })->filter();

        //dd($routes);
    }
}
