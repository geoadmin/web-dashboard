var daemon = require("daemonize2").setup({
    main: "server.js",
    name: "web-dashboard",
    pidfile: "web-dashboard.pid",
    cwd: process.cwd()
});
    
switch (process.argv[2]) {
     
  case "start":
    daemon.start();
    break;
      
  case "stop":
    daemon.stop();
    break;

  case "status":
    if(daemon.status())
      console.log("Dashboard running with pid: " + daemon.status());
    else
      console.log("The dashboard is not running.");
    break;
      
  default:
    console.log("Usage: [start|stop|status]");
}
