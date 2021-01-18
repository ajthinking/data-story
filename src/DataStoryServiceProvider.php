<?php

namespace DataStory;

use DataStory\Commands\NodeCommand;
use DataStory\Controllers\Reduce;
use DataStory\Repositories\RouteRepository;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\ServiceProvider;
use stdClass;

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
        RouteRepository::all()->each(function(stdClass $route) {
            // Tell DataStory which story to bind to which route
            RouteRepository::register($route->uri, $route->story);
            // The Laravel Route. The Reduce class will resolve the associated story
            Route::get($route->uri, Reduce::class);
        });
    }
}
