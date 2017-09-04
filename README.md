Instructions
============

1. Download and start Docker:
    - For [Mac](https://docs.docker.com/docker-for-mac/install/)
    - For [Windows](https://docs.docker.com/docker-for-windows/install/)

2. Place provided `.env` file in the main (root) folder. Alternatively, create API Keys for GoodReads and TMDB APIs and place them in a newly created .env file:

    ```bash
    GOODREADS_KEY=<<YOUR_API>>
    TMDB_KEY=<<YOUR_API>>
    ```

3. Create a local image from main (root) folder:

    ```bash
    docker image build -t app .
    ```

    or

    ```bash
    npm run docker:build
    ```

4. Run docker image pointing to app files

    ```bash
    docker container run -it --rm -p 3000:3000 app
    ```

    or

    ```bash
    npm run docker:start
    ```

------

Development
-----------

Run the container binding the local folder for getting changes

```bash
docker container run -it --rm -p 3000:3000 -v $(pwd)/app:/usr/src/app -e "nodeCmd=dev" app
```

or

```bash
npm run docker:dev
```
