DOCKER_COMPOSE=docker-compose --project-name shorturl --project-directory container

config:
	$(DOCKER_COMPOSE) config

build:
	$(DOCKER_COMPOSE) build

down:
	$(DOCKER_COMPOSE) down

logs:
	$(DOCKER_COMPOSE) logs

ls:
	$(DOCKER_COMPOSE) ls

port:
	$(DOCKER_COMPOSE) port

restart:
	$(DOCKER_COMPOSE) restart

rm:
	$(DOCKER_COMPOSE) rm

top:
	$(DOCKER_COMPOSE) top

dev:
	$(DOCKER_COMPOSE) up dev

test:
	$(DOCKER_COMPOSE) up test

prod:
	$(DOCKER_COMPOSE) up prod
