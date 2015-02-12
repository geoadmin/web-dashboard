# This Makefile enable the make commands for web-dashboard

.PHONY: help
help:
	@echo "Usage: make <target>"
	@echo 
	@echo "Possible targets:"
	@echo
	@echo "- all            Build the project"
	@echo "- clean          Clean some files"
	@echo "- start          Start the daemon"
	@echo "- stop           Stop the daemon"
	@echo "- status         Daemon status"
	@echo "- restart				Restart the dashboard"
	@echo "- deploydev			Deploy the dashboard on dev"
	@echo "- deployint			Deploy the dashboard on int"

.PHONY: all
all: package.json
	npm install
	node src/prestart.js

.PHONY: clean                                              
clean:
	rm -rf apache/web-dashboard.conf 
	rm -rf node_modules

.PHONY: start
start:
	node src/dashboardctrl.js start

.PHONY: stop
stop:
	node src/dashboardctrl.js stop

.PHONY: status
status:
	node src/dashboardctrl.js status

.PHONY: restart
restart: stop start

.PHONY: reboot
reboot: stop clean all start

.PHONY: deploydev
deploydev: 
	@ if test "$(SNAPSHOT)" = "true"; then \
			./scripts/deploydev.sh -s; \
		else \
			./scripts/deploydev.sh; \
		fi 

.PHONY: deployint
deployint:
	./scripts/deploysnapshot.sh $(SNAPSHOT) int


