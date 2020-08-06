# tv-maze-app
It's a pretty small project to search tv shows based on the TVMAze API. Also we can get more information of show in detail.
This project is developed using Vue (CLI 2) as the framework.
- This project is bootstrapped with VUE CLI 2(vue Create).
- VUEX is used For global state management
- Axios is used for REST calls.
- Single Search API is used for search input. [http://www.tvmaze.com/api](http://www.tvmazecom/api)
- Added some custom CSS.
- Jest is used for unit test

## Project structure

```
src/
    components - Reusable vue components.
    router - Configuration for routes.
    views - Components that represent different pages.
    store - Configuration of VueX store (Getters, Mutations and Actions).
    assets - Assets folder for static images.
```

## Dependencies

```
axios
core-js
vue
vue-router
vuex
```

## Dev Dependencies

```
@vue/cli-plugin-babel
@vue/cli-plugin-eslint
@vue/cli-plugin-router
@vue/cli-plugin-unit-jest
@vue/cli-plugin-vuex
@vue/cli-service
@vue/test-utils
babel-eslint
flush-promises
less
less-loader
vue-template-compiler
```

# How to run the project

1) Install the dependencies
    ```
    npm install
    ```
2) Run the server
    ```
    npm run serve
    ```

3) - Goto `http://localhost:8080/` on your browser.
   - Click on one of the show in list will navigate to details page
     *e.g.* [http://localhost:8080/details/1](http://localhost:8080/details/1)

### Run unit tests
    ```
    npm run test:unit
    ```
