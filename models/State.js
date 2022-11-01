"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.State = void 0;
/** State instance */
class State {
    /**
     *
     * @param name Name of State
     * @param routes Array of possible displacements
     * @param stateValidation Array with validations
     * @param inState Array with current state callbacks
     * @param afterState Array with afterstate callbacks
     */
    constructor(name, routes, routeRules, stateValidation, beforeState, inState, afterState) {
        /** All states to possible to shift next */
        this.routes = [];
        /** Array with validations */
        this.stateValidation = [];
        /** Array with current state callbacks */
        this.inState = [];
        /** Array with current state callbacks */
        this.beforeState = [];
        /** Array with afterstate callbacks */
        this.afterState = [];
        this.routeRules = [];
        if (!name || !routes)
            throw "name & routes arguments required";
        this.name = name;
        this.routes = routes;
        if (stateValidation !== undefined)
            this.stateValidation.push(stateValidation);
        if (inState !== undefined)
            this.inState.push(inState);
        if (afterState !== undefined)
            this.afterState.push(afterState);
        if (routeRules !== undefined)
            this.routeRules.push(routeRules);
        if (beforeState !== undefined)
            this.beforeState.push(beforeState);
    }
    /** Add special route for current state */
    checkRoute(stateName) {
        if (!stateName || typeof stateName !== "string")
            throw "stateName required";
        if (this.routes.indexOf(stateName) >= 0) {
            return true;
        }
        else {
            return false;
        }
    }
    /** Add special route for current state */
    addRoute(stateName) {
        if (!stateName || typeof stateName !== "string")
            throw "stateName required";
        if (this.routes.indexOf(stateName) >= 0)
            return false;
        this.routes.push(stateName);
        return true;
    }
    /** Remove route for current state */
    removeRoute(stateName) {
        if (!stateName || typeof stateName !== "string")
            throw "stateName required";
        const ind = this.routes.indexOf(stateName);
        if (ind < 0)
            return false;
        this.routes.splice(ind, 1);
        return true;
    }
    async runStateValidation(data) {
        let error;
        for await (let layerstateValidation of this.stateValidation) {
            await layerstateValidation(data, (e) => {
                if (e)
                    error = e;
            });
            if (error)
                break;
        }
        if (error)
            throw error;
    }
    async runBeforeState(data) {
        let error;
        for await (let layerRunBeforeState of this.beforeState) {
            await layerRunBeforeState(data, (e) => {
                if (e)
                    error = e;
            });
            if (error)
                break;
        }
        if (error)
            throw error;
    }
    async runInState(data) {
        let error;
        for await (let layerRunInState of this.inState) {
            await layerRunInState(data, (e) => {
                if (e)
                    error = e;
            });
            if (error)
                break;
        }
        if (error)
            throw error;
    }
    async runAfterState(data) {
        let error;
        for await (let layerRunAfterState of this.afterState) {
            await layerRunAfterState(data, (e) => {
                if (e)
                    error = e;
            });
            if (error)
                break;
        }
        if (error)
            throw error;
    }
    async getNextState(data) {
        let nextState;
        if (this.routes.length === 1) {
            return this.routes[0];
        }
        for await (let layerRunAfterState of this.routeRules) {
            await layerRunAfterState(data, (ns) => {
                if (ns)
                    nextState = ns;
            });
            if (nextState)
                break;
        }
        if (nextState)
            return nextState;
    }
}
exports.State = State;
