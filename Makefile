# This Makefile enable the commands for web-dashboard

.PHONY: help
help:
			@echo "Usage: make <target>"
			@echo 
			@echo "Possible targets:"
			@echo
			@echo "- start					Start the daemon"
			@echo "- stop						Stop the daemon"
			@echo "- status					Daemon status"
			@echo "- build					Build dashboard config"
			@echo "- clean					Clean some files"
			@echo "- cleanall				Clean all node_modules"
			@echo "- buildnpm				Install all node_modules referenced in package.json"


.PHONY: start
start: 
				node src/dashboardctrl.js start

.PHONY: stop
stop: 
				node src/dashboardctrl.js stop

.PHONY: status
status: 
				node src/dashboardctrl.js status

.PHONY: build
build: 
				node src/prestart.js

.PHONY: cleanall
cleanall: clean
				rm -rf node_modules

.PHONY: clean
clean: 	
				rm -rf apache/web-dashboard.conf

.PHONY: buildnpm
buildnpm: package.json 
				npm install

