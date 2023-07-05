## DataStory :dizzy:

Visual Programming | Data Transformation | ETL | Process design

![ds_readme_gif](https://user-images.githubusercontent.com/3457668/229267838-b8dcc5cc-9639-4f95-962b-48eae8250d4e.gif)

> Under construction.


### Features
* Design executable flowcharts in a simple web interface
* Load, create or fetch data from any API
* Flexible JSON transformations
* Deploy and run headless on a schedule or on events
* Create custom nodes for your business case or software
* Embeddable within ReactJS apps

### Development installation
```bash
# Install
git clone git@github.com:ajthinking/data-story.git
cd data-story
yarn

# Start the server
nodemon server/socket.ts

# Start the client (in a new tab)
yarn dev
```

### React Component
Until organized into npm packages, *everything* lives in a NextJs app. Later, we will export a React component as well as a server lib.

### Commands
```bash
# Add a custom node
yarn make:node YourNewNode

# Run tests
yarn test
```

### Thank you
Built with [React Flow](https://reactflow.dev/)

### License
To be decided