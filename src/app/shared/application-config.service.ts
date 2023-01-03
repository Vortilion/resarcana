import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class ApplicationConfigService {
    private _useLuxEtTenebrae = false;
    private _usePerlaeImperii = false;

    constructor() { }


    public get useLuxEtTenebrae() {
        return this._useLuxEtTenebrae;
    }

    public get usePerlaeImperii() {
        return this._usePerlaeImperii;
    }

}
