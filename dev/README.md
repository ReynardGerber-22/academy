# Local development and deployment

The Laravel 13 API lives in `api/`, with API routes in `api/routes/api.php`.
Sanctum is installed; login/logout endpoints and the React auth integration
still need implementing. `/up` checks Laravel startup and `/api/health` returns
JSON. `/api/user` requires authentication.

## Resource isolation

Development uses the Compose project `academy-dev`; production uses
`academy-prod`. Each gets its own database volume and network. Production
also gets a persistent Laravel storage volume for uploads and file sessions.
Do not override these names with a shared `-p` or `COMPOSE_PROJECT_NAME` value.
Use a different project name for each additional deployment.

No existing volumes are migrated or deleted by these changes. If you previously
started this project with its directory-based name, the new name selects a new,
empty database volume; migrate existing data deliberately if needed.
Avoid `docker compose down -v` when you want to keep database/storage data.

## Development

Copy `.env.example` to `.env`. Set LOCAL_UID and LOCAL_GID to the results of
`id -u` and `id -g` on your Linux development machine.

```sh
docker compose up -d --build
# On a fresh checkout, before serving the API:
docker compose run --rm --no-deps php composer install
# Copy api/.env.example to api/.env if it does not exist, then:
docker compose exec php php artisan key:generate
docker compose exec php php artisan migrate
```

The API is published at `http://127.0.0.1:8080`; MySQL is internal only.
The passwords in development Compose are local development credentials only.

## Production

Copy `.env.production.example` to `.env.production`. Supply a Laravel APP_KEY,
the application's HTTPS APP_URL, and distinct strong database passwords.
Keep the APP_KEY stable across deployments. These files are ignored by Git.

```sh
docker compose --env-file .env.production -f docker-compose.prod.yml config --quiet
docker compose --env-file .env.production -f docker-compose.prod.yml up -d --build
docker compose --env-file .env.production -f docker-compose.prod.yml exec php php artisan migrate --force
```

Use the production file alone, rather than merging it with the development file.
Back up both production volumes. Changing environment passwords does not change
credentials in an already initialized MySQL database.

Production uses file sessions, file cache, synchronous jobs, and stderr logs.
If the application later needs queue workers or scheduled tasks, configure those
services explicitly. Laravel must trust the internal reverse proxy for forwarded
HTTPS headers; configure that in the backend when it is created.

## Sharing a droplet

The frontend binds to `127.0.0.1:8081` by default. Choose a different FRONTEND_PORT
if that host port is already used. A host-level reverse proxy owns ports 80/443
and forwards this application's domain to `http://127.0.0.1:8081`.

For example, with a host-installed Caddy, add this block to its existing
configuration, replacing the example domain with your own:

```caddyfile
academy.example.com {
    reverse_proxy 127.0.0.1:8081
}
```

Point the real domain at the droplet and let the shared proxy manage TLS.
If an existing application currently publishes ports 80/443 directly, migrating
those ports to the shared proxy is a separate deployment step. Do not start a
second proxy on those ports alongside it. A containerized shared proxy requires
separate networking configuration; its own loopback is not the host loopback.

The old project's domain, certificates, and Certbot mounts are not used by this
stack. Nothing here changes the other project's deployment or the host proxy.

## Build contexts

The frontend has a `.dockerignore`. Production PHP and API Nginx use Dockerfile-
specific ignore files under `dev/`, which apply to their `api/` build context.
These exclude local dependencies, environment files, and generated caches.
Keep required Laravel storage directories in the application scaffold.

## Backend development

The local `api/.env` is already configured and has an application key. Do not
regenerate it on each startup. PHPUnit uses an in-memory SQLite database,
independent of MySQL and other projects.

```sh
docker compose run --rm --no-deps php php artisan test
docker compose run --rm --no-deps php php artisan route:list --path=api
```

Vite proxies `/api` to `http://127.0.0.1:8080`, so React can call
`fetch('/api/health')`. Update that proxy if you change DEV_API_PORT.

If Docker reports a missing Buildx plugin, install/repair that plugin. For the
current development image, the legacy-builder fallback used during setup is:

```sh
DOCKER_BUILDKIT=0 docker build -t academy-dev-php -f dev/php/Dockerfile .
docker compose up -d --no-build
```
