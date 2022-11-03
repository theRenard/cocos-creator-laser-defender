import { math, director } from "cc";
import { scoreManager } from "./scoreManager";

export class enemyPool {

    private static _instance: enemyPool;

    private _pool: Node[] = [];

    static get instance () {
        if (this._instance) {
            return this._instance;
        }

        this._instance = new enemyPool();
        return this._instance;
    }

    addEnemyToPool(enemy: Node) {
        this._pool.push(enemy);
    }

    getEnemyFromPool() {
        if (this._pool.length > 0) {
            return this._pool.pop();
        }

        return null;
    }



}