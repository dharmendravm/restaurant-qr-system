import debug from "debug";

global.logDB = debug("server:db");
global.logServer = debug("server:startup");
global.logAuth = debug("server:auth");
global.logTest = debug("server:testing");
global.logMenu = debug("server:menu");
global.logController = debug("server:controllers");