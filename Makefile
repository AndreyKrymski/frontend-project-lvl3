install :
	npm ci
publish :
	npm publish --dry-run
make lint:
	npx eslint .
make test:
	NODE_OPTIONS=--experimental-vm-modules npx jest
make coverage:
	npm test -- --coverage