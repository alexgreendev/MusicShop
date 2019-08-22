install:
	npm --prefix ./nodejs install
build:
	docker-compose build
test:
	npm --prefix ./nodejs test
start:
	docker-compose up
stop:
	docker-compose down