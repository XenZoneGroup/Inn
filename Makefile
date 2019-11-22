.PHONY: delint
delint:
	npx prettier --parser=typescript --write './src/**/*.{ts,tsx}'
	npx prettier --parser=css --write './src/**/*.css'

.DEFAULT_GOAL := help

help:
	@echo "Tasks for testing, building and packaging this repo as a docker file"
	@echo "Usage:"
	@echo "\tmake [target]"
	@echo "\te.g. test, deps, build, package, etc."

# Testing...
.PHONY: test
test:
	npm test

# Build tasks...
IMAGE_NAME ?= tavern
IMAGE_TAG ?= $$(git rev-parse HEAD)

.PHONY: deps
deps: ## Install node packages
	npm install

.PHONY: deps-ci
deps-ci: ## Install node packages on CI
	npm ci

.PHONY: build
build:
	rm -rf ./dist && npx parcel build index.html --public-url='/SOME_PARTNER/sign-up'

.PHONY: package
package: build ## Build docker image
	docker build . -f ./distribution/Dockerfile -t $(IMAGE_NAME):$(IMAGE_TAG)
	docker tag $(IMAGE_NAME):$(IMAGE_TAG) latest

.PHONY: bake
bake: deps-ci test build package # Run tests, compile Typescript and build dockerfile

.PHONY: publish
publish: # Publish docker image to GCR
	gcloud auth configure-docker -q
	docker tag $(IMAGE_NAME):$(IMAGE_TAG) gcr.io/xzg-support-gcr/$(IMAGE_NAME):$(IMAGE_TAG)
	docker push gcr.io/xzg-support-gcr/$(IMAGE_NAME):$(IMAGE_TAG)

.PHONY: check-k8s-args
check-k8s-args:
	@if [[ "$(environment)" == "" ]]; then \
	  echo 'Usage: make package-k8s environment=<name>'; \
	  exit 1; \
	fi

.PHONY: package-all-k8s
package-all-k8s:
	@for k in $$(find ./distribution -name overlays -d -print0 | xargs -0 -I{} find '{}' -name kustomization.yaml | sort); do \
	  $(MAKE) package-k8s environment=$$(basename $$(dirname $$k));\
	done

.PHONY: package-k8s
package-k8s: check-k8s-args
	mkdir -p ./dist/k8s
	cd ./distribution/base && ../../ci/kustomize edit set image gcr.io/xzg-support-gcr/$(IMAGE_NAME):latest=gcr.io/xzg-support-gcr/$(IMAGE_NAME):$(IMAGE_TAG)
	kubectl kustomize ./distribution/overlays/$(environment) > ./dist/k8s/$(IMAGE_NAME).$(environment).k8s.yaml

.PHONY: validate-k8s
validate-k8s:
	mkdir -p ./dist
	kubectl kustomize ./distribution/overlays/well-line-unstable > ./dist/$(IMAGE_NAME).k8s.yaml
	kubectl create -f ./dist/$(IMAGE_NAME).k8s.yaml --dry-run=true

.PHONY: what-do
what-do:
	@ack 'TODO' . --ignore-dir='node_module' --ignore-file='match:Makefile'
