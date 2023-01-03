import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ApplicationConfigService {
    useLuxEtTenebrae = new EventEmitter<boolean>();
    usePerlaeImperii = new EventEmitter<boolean>();
    monumentCount = new EventEmitter<number>();
    
    corePlaces = [
        ["Heiliger Heinz", "Alchemistenturm"],
        ["Katakomben der Toten", "Opfergrube"],
        ["Verfluchte Schmiede", "Zwergenmine"],
        ["Korallenschloss", "Versunkenes Schiff"],
        ["Drachenhorst", "Bestarium"]
    ];
      
    luxPlaces = [
        ["Drachennest", "Kristallpalast"],
        ["Temple des Abgrunds", "Tor zur Hölle"]
    ];
      
    perlPlaces = [
        ["Magische Menagerie", "Alchemistenwerkstatt"],
        ["Blutinsel", "Perlenriff"],
    ];
}
