import { Router as RouterExpress } from "express";

class Router {
    public router: RouterExpress;

    constructor() {
        this.router = RouterExpress();
        this.setRoutes();
    }

    protected setRoutes(): void {
    }

    public getRoutes(): RouterExpress {
        return this.router;
    }
}

export default Router;
