import { Router as RouterExpress } from "express";

abstract class Router {
    public router: RouterExpress;

    constructor() {
        this.router = RouterExpress();
        this.setRoutes();
    }

    /**
     * Método abstrato para definir as rotas, que será implementado nas classes filhas
     */
    protected abstract setRoutes(): void;

    /**
     * Getter do router com as rotas definidas
     * @returns Retorna o router criado internamente
     */
    public getRoutes(): RouterExpress {
        return this.router;
    }
}

export default Router;
