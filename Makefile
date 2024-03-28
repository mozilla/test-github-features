.PHONY: default
default: help

.PHONY: up
up: ## Build and start containers
	mkdir -p node_modules
	mkdir -p dist
	docker compose up -d --build

.PHONY: build
build: ## Build the app container
	docker compose build --no-cache --progress=plain

.PHONY: down
down: ## Stop and remove containers, networks, images, and volumes
	docker compose down $(ARGS)

.PHONY: clean
clean: ## Remove all containers, networks, images, and volumes
	make down ARGS="--rmi all --volumes"
	docker builder prune -af

.PHONY: shell
shell: ## Access to the shell of the app docker container
	docker compose exec app /bin/bash

.PHONY: install
install: ## Install dependencies
	docker compose exec app npm install $(ARGS) --loglevel=verbose

.PHONY: help
help:
	@echo "Please use 'make <target>' where <target> is one of the following commands.\n"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' Makefile | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

