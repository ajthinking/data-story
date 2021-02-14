<?php

namespace DataStory;

//use DataStory\Commands\ContributeCommand;
use DataStory\Commands\NodeCommand;
use DataStory\Controllers\Reduce;
use DataStory\Repositories\RouteRepository;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\ServiceProvider;
use stdClass;
use Illuminate\Support\Str;

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
            //ContributeCommand::class, // A mess
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
            __DIR__ . '/../../dist' => public_path('vendor/data-story'),
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
        app()->instance(RouteRepository::class, new RouteRepository);

        app(RouteRepository::class)->all()->each(function(stdClass $route) {
            // Tell DataStory which story to bind to which route
            app(RouteRepository::class)->register($route->uri, $route->story);
            // The Laravel Route. The Reduce class will resolve the associated story
            Route::get($route->uri, Reduce::class);
        });
    }
}
