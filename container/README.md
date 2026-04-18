# Container Configuration

This folder contains all container-related files for the MM Admin Frontend.

## Files

- **Dockerfile** - Multi-stage build configuration
- **.dockerignore** - Files to exclude from Docker build context
- **nginx.conf** - Nginx web server configuration
- **README.md** - This file

## Building the Container

```bash
# Build the container from the project root
docker build -f container/Dockerfile -t mm-admin-frontend:latest .

# Or use the specific tag
docker build -f container/Dockerfile -t mm-admin-frontend:v0.3.0 .
```

## Running the Container

```bash
# Run the container
docker run -d -p 8080:80 --name mm-admin-frontend mm-admin-frontend:latest

# Access the application at http://localhost:8080
```

## Container Features

- **Multi-stage build** - Optimized image size
- **Nginx server** - Production-ready web server
- **Gzip compression** - Reduced bandwidth usage
- **Security headers** - Enhanced security
- **Health check** - Container health monitoring
- **Optimized caching** - Static assets cached for 1 year

## Environment Variables

Currently no environment variables are required. The application uses:
- Default language: German (de)
- Supported languages: German (de), English (en)

## Health Check

The container includes a health check endpoint:
```bash
curl http://localhost:8080/health
```

## Image Size

The final image is approximately 50-60MB (nginx:alpine + built Angular app).

## GitHub Actions

The container is automatically built and pushed to GitHub Container Registry (ghcr.io) when:
- Code is pushed to `main` branch (production releases)
- Code is pushed to `develop` branch (RC releases)

Tags:
- `ghcr.io/herfortt/mm-admin-frontend:latest` - Latest production build
- `ghcr.io/herfortt/mm-admin-frontend:v0.3.0` - Specific version
- `ghcr.io/herfortt/mm-admin-frontend:v0.3.0-rc` - Release candidate
