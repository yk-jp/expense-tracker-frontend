build:
	docker-compose build

build-prod:
	docker build -t expense-tracker-frontend-prod -f Dockerfile.prod .

run:
	docker-compose -f docker-compose.yml up

run-prod:
	docker-compose -f docker-compose.prod.yml up

stop:
	docker-compose -f docker-compose.yml down

# clean container 
clean-c:
	docker rm expense-tracker-frontend

# clean image
clean-i:
	docker rmi expense-tracker-frontend

# clean image forcefully
clean-if:
	docker rmi -f expense-tracker-frontend

# clean all
clean-all:
	$(MAKE) clean-c ; $(MAKE) clean-i

