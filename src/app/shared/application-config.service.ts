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
        sides: [{
            color: 'orange',
            name: 'Heiliger Hain'

        }, {
            color: 'blue',
            name: 'Alchemistenturm'
        }],
        set: 'base'
    }, {
        sides: [{
            color: 'orange',
            name: 'Katakomben der Toten'

        }, {
            color: 'blue',
            name: 'Opfergrube'
        }],
        set: 'base'
    }, {
        sides: [{
            color: 'orange',
            name: 'Verfluchte Schmiede'

        }, {
            color: 'blue',
            name: 'Zwergenmine'
        }],
        set: 'base'
    }, {
        sides: [{
            color: 'orange',
            name: 'Korallenschloss'

        }, {
            color: 'blue',
            name: 'Versunkenes Schiff'
        }],
        set: 'base'
    }, {
        sides: [{
            color: 'orange',
            name: 'Drachenhorst'

        }, {
            color: 'blue',
            name: 'Bestarium'
        }],
        set: 'base'
    }];
    
    luxEtTenebraePlacesOfPower: PlaceOfPowerTile[] = [{
        sides: [{
            color: 'orange',
            name: 'Drachennest'

        }, {
            color: 'blue',
            name: 'Kristallpalast'
        }],
        set: 'lux'
    }, {
        sides: [{
            color: 'orange',
            name: 'Tempel des Abgrunds'

        }, {
            color: 'blue',
            name: 'Tor zur Hölle'
        }],
        set: 'lux'
    }];  

    perlImperiiPlacesOfPower: PlaceOfPowerTile[] = [{
        sides: [{
            color: 'orange',
            name: 'Magische Menagerie'

        }, {
            color: 'blue',
            name: 'Alchemistenwerkstatt'
        }],
        set: 'perl'
    }, {
        sides: [{
            color: 'orange',
            name: 'Blutinsel'

        }, {
            color: 'blue',
            name: 'Perlenriff'
        }],
        set: 'perl'
    }]; 
            
    getRandomCorePlaces(count: number): any[] {
        let tilesSelection = this.getRandomCorePlaceTiles(count);
        let returnArray: PlaceOfPowerSide[] = [];

        tilesSelection.forEach((tile) => {
            returnArray.push(this.getRandomPlaceOfPowerSideForTile(tile));
        });

        return returnArray;
    }

    getRandomCoreAndLuxPlaces(count: number): any[] {
        let tilesSelection = this.getRandomCoreAndLuxPlaceTiles(count);
        let returnArray: PlaceOfPowerSide[] = [];

        tilesSelection.forEach((tile) => {
            returnArray.push(this.getRandomPlaceOfPowerSideForTile(tile));
        });

        return returnArray;
    }    

    getRandomCoreAndPerlPlaces(count: number): any[] {
        let tilesSelection = this.getRandomCoreAndPerlPlaceTiles(count);
        let returnArray: PlaceOfPowerSide[] = [];

        tilesSelection.forEach((tile) => {
            returnArray.push(this.getRandomPlaceOfPowerSideForTile(tile));
        });

        return returnArray;
    }   
    
    getRandomCoreAndLuxAndPerlPlaces(count: number): any[] {
        let tilesSelection = this.getRandomCoreAndLuxAndPerlPlaceTiles(count);
        let returnArray: PlaceOfPowerSide[] = [];

        tilesSelection.forEach((tile) => {
            returnArray.push(this.getRandomPlaceOfPowerSideForTile(tile));
        });

        return returnArray;
    }

    private getRandomCorePlaceTiles(count: number): PlaceOfPowerTile[] {
        let returnArray = [];
        let shuffledCorePlaces = this.shuffleArray(this.coreGamePlacesOfPower);

        for (let i = 0; i < count; i++) {
            returnArray.push(shuffledCorePlaces.pop());
        }

        return returnArray;
    } 

    private getRandomCoreAndLuxPlaceTiles(count: number): PlaceOfPowerTile[] {
        let returnArray = [];
        let mergedPlaceTiles:PlaceOfPowerTile[] = [];

        mergedPlaceTiles = [...this.coreGamePlacesOfPower, ...this.luxEtTenebraePlacesOfPower];

        let shuffledCoreAndLuxPlaces = this.shuffleArray(mergedPlaceTiles);

        for (let i = 0; i < count; i++) {
            returnArray.push(shuffledCoreAndLuxPlaces.pop());

        }

        return returnArray;
    }

    private getRandomCoreAndPerlPlaceTiles(count: number): PlaceOfPowerTile[] {
        let returnArray = [];
        let mergedPlaceTiles:PlaceOfPowerTile[] = [];

        mergedPlaceTiles = [...this.coreGamePlacesOfPower, ...this.perlImperiiPlacesOfPower];

        let shuffledCoreAndPerlPlaces = this.shuffleArray(mergedPlaceTiles);

        for (let i = 0; i < count; i++) {
            returnArray.push(shuffledCoreAndPerlPlaces.pop());
            
        }

        return returnArray;
    }

    private getRandomCoreAndLuxAndPerlPlaceTiles(count: number): PlaceOfPowerTile[] {
        let returnArray = [];
        let mergedPlaceTiles:PlaceOfPowerTile[] = [];

        mergedPlaceTiles = [...this.coreGamePlacesOfPower, ...this.luxEtTenebraePlacesOfPower, ...this.perlImperiiPlacesOfPower];

        let shuffledCoreAndLuxAndPerlPlaces = this.shuffleArray(mergedPlaceTiles);

        for (let i = 0; i < count; i++) {
            returnArray.push(shuffledCoreAndLuxAndPerlPlaces.pop());
        }

        return returnArray;
    }

    private getRandomPlaceOfPowerSideForTile(tile: PlaceOfPowerTile): PlaceOfPowerSide {
        let placesOfPowerShuffled = this.shuffleArray(tile.sides);
        return placesOfPowerShuffled[0];
    } 

    private shuffleArray(inArray: any[]): any[] { 
        let returnArray = inArray.slice();

        for(var j, x, i = returnArray.length; i; j = Math.floor(Math.random() * i), x =returnArray[--i], returnArray[i] = returnArray[j], returnArray[j] = x);
        return returnArray;
    };
}
