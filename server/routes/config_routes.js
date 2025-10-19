import userR from "./user_routes.js";

export const routesInit = (app) => {
    app.use("/api/users", userR);
};
