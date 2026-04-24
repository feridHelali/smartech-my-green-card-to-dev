# Docker Cheat Sheet

## Core Concepts
```
Image  → Blueprint (read-only, layered filesystem)
Container → Running instance of an image
Registry → Image store (Docker Hub, GHCR, ECR)
Volume → Persistent storage outside container lifecycle
Network → Virtual network connecting containers
```

## Images
```bash
docker images                       # list local images
docker pull node:20-alpine          # download image
docker build -t myapp:1.0 .         # build from Dockerfile
docker tag myapp:1.0 user/myapp:1.0 # tag for push
docker push user/myapp:1.0          # push to registry
docker rmi myapp:1.0                # remove image
```

## Containers
```bash
docker run node:20-alpine node -e "console.log('hi')"  # run and exit
docker run -d -p 3000:3000 --name api myapp            # detached, port mapping
docker run -it ubuntu bash                             # interactive shell
docker ps                         # running containers
docker ps -a                      # all containers (including stopped)
docker stop <id|name>             # graceful stop
docker kill <id|name>             # force kill
docker rm <id|name>               # remove stopped container
docker exec -it <id> bash         # shell into running container
docker logs -f <id>               # follow logs
```

## Dockerfile (Node.js example)
```dockerfile
FROM node:20-alpine

WORKDIR /app

# Copy dependency files first (caching layer)
COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 3000
USER node

CMD ["node", "src/index.js"]
```

## Dockerfile (React build)
```dockerfile
# Build stage
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Serve stage
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
```

## Docker Compose
```yaml
# docker-compose.yml
version: '3.9'

services:
  api:
    build: ./backend
    ports:
      - "9000:9000"
    environment:
      - MONGODB_URI=mongodb://mongo:27017/myapp
      - JWT_SECRET=secret
    depends_on:
      - mongo
    volumes:
      - ./backend:/app
      - /app/node_modules

  webapp:
    build: ./webapp
    ports:
      - "5173:5173"
    volumes:
      - ./webapp:/app
      - /app/node_modules

  mongo:
    image: mongo:7
    ports:
      - "27017:27017"
    volumes:
      - mongo_data:/data/db

volumes:
  mongo_data:
```

```bash
docker compose up -d              # start all services
docker compose down               # stop + remove containers
docker compose down -v            # also remove volumes
docker compose logs -f api        # follow api logs
docker compose exec api bash      # shell into api service
docker compose build --no-cache   # rebuild images
```

## Volumes
```bash
docker volume create mydata       # named volume
docker volume ls                  # list volumes
docker volume inspect mydata      # volume details
docker run -v mydata:/app/data ... # mount named volume
docker run -v $(pwd):/app ...      # bind mount (dev)
```

## Networking
```bash
docker network ls                 # list networks
docker network create mynet       # create bridge network
docker run --network mynet ...    # attach container
# Containers on same network: resolve by service name
# mongo → connects to mongodb://mongo:27017
```

## .dockerignore
```
node_modules
.env
.git
dist
*.log
```

## Useful Commands
```bash
# Remove all stopped containers
docker container prune

# Remove all unused images
docker image prune -a

# System-wide cleanup
docker system prune -a --volumes

# Inspect resource usage
docker stats

# Copy file from container
docker cp <id>:/app/file.txt ./file.txt
```
