import { EventEmitter, Injectable } from '@angular/core';
import { PlaceOfPowerSide } from '../models/place-of-power-side.model';
import { PlaceOfPowerTile } from '../models/place-of-power-tile.model';

@Injectable({
    providedIn: 'root'
})
export class ApplicationConfigService {
    useLuxEtTenebrae = new EventEmitter<boolean>();
    usePerlaeImperii = new EventEmitter<boolean>();
    monumentCount = new EventEmitter<number>();
    playerCount = new EventEmitter<number>();
    placesCount = new EventEmitter<number>();

    coreGamePlacesOfPower: PlaceOfPowerTile[] = [{
        orange: "Heiliger Hain", 
        blue: "Alchemistenturm"
    }, {
        orange: "Katakomben der Toten", 
        blue: "Opfergrube"
    }, {
        orange: "Verfluchte Schmiede", 
        blue: "Zwergenmine"
    }, {
        orange: "Korallenschloss", 
        blue: "Versunkenes Schiff"
    }, {
        orange: "Drachenhorst", 
        blue: "Bestarium"
    }];  
    
    luxEtTenebraePlacesOfPower: PlaceOfPowerTile[] = [{
        orange: "Drachennest", 
        blue: "Kristallpalast"
    }, {
        orange: "Temple des Abgrunds", 
        blue: "Tor zur Hölle"
    }];  

    perlImperiiPlacesOfPower: PlaceOfPowerTile[] = [{
        orange: "Magische Menagerie", 
        blue: "Alchemistenwerkstatt"
    }, {
        orange: "Blutinsel", 
        blue: "Perlenriff"
    }]; 

    private getRandomCorePlaceTiles(count: number): PlaceOfPowerTile[] {
        let returnArray = [];
        let shuffledCorePlaces = this.shuffleArray(this.coreGamePlacesOfPower);

        for (let i = 0; i < count; i++) {
            returnArray.push(shuffledCorePlaces.pop());
        }

        return returnArray;
    }

    getRandomCorePlaces(count: number): any[] {
        let tilesSelection = this.getRandomCorePlaceTiles(count);
        let returnArray: any[] = [];

        tilesSelection.forEach((tile) => {
            returnArray.push(this.getRandomProperty(tile));
        });

        return returnArray;
    }

    private getRandomProperty(obj: any): any {
        let keys = Object.keys(obj);

        let returnVal: PlaceOfPowerSide = {
            color: '',
            name: ''
        };

        let randomKey = keys[ keys.length * Math.random() << 0];
        returnVal['color'] = randomKey; // blue or orange;

        returnVal['name'] = obj[randomKey];

        return returnVal;
    };   

    private shuffleArray(inArray: any[]): any[] { 
        let returnArray = inArray.slice();

        for(var j, x, i = returnArray.length; i; j = Math.floor(Math.random() * i), x =returnArray[--i], returnArray[i] = returnArray[j], returnArray[j] = x);
        return returnArray;
    };
}
