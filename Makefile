develop:
	npx webpack serve

install :
	npm ci

build:
	rm -rf dist
	NODE_ENV=production npx webpack

publish :
	npm publish --dry-run

make lint:
	npx eslint .

make test:
	npx jest

make coverage:
	npx jest --coverage
