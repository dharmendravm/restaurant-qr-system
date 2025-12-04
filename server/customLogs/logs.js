import debug from 'debug';

export const logDB = debug("server:db");
export const logServer = debug("server:startup");
export const logAuth = debug("server:auth");
export const logOrders = debug("server:orders");
export const logPayment = debug("server:payment");
export const logMenu = debug("server:menu");