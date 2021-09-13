import express from "express";
import chatbotController from "../controllers/chatbotController";

let router = express.Router();

let initWebRoutes = (app) => {
    router.get("/", chatbotController.getHomePage);


    //setup get started button, whitelisted domain
    router.post("/setup-profile", chatbotController.setupProfile);

    //setup persistent menu
    router.post("/setup-persistent-menu", chatbotController.setupPersistentMenu);

    router.get("/webhook", chatbotController.getWebhook);
    router.post("/webhook", chatbotController.postWebhook);

    router.get("/reserve-table", chatbotController.handleReserveTable);
    router.post("/reserve-table-ajax", chatbotController.handlePostReserverTable);


    return app.use("/", router);
};

module.exports = initWebRoutes;