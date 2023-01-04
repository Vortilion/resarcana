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
        }]
    }, {
        sides: [{
            color: 'orange',
            name: 'Katakomben der Toten'

        }, {
            color: 'blue',
            name: 'Opfergrube'
        }]
    }, {
        sides: [{
            color: 'orange',
            name: 'Verfluchte Schmiede'

        }, {
            color: 'blue',
            name: 'Zwergenmine'
        }]
    }, {
        sides: [{
            color: 'orange',
            name: 'Korallenschloss'

        }, {
            color: 'blue',
            name: 'Versunkenes Schiff'
        }]
    }, {
        sides: [{
            color: 'orange',
            name: 'Drachenhorst'

        }, {
            color: 'blue',
            name: 'Bestarium'
        }]
    }];
    
    luxEtTenebraePlacesOfPower: PlaceOfPowerTile[] = [{
        sides: [{
            color: 'orange',
            name: 'Drachennest'

        }, {
            color: 'blue',
            name: 'Kristallpalast'
        }],
    }, {
        sides: [{
            color: 'orange',
            name: 'Tempel des Abgrunds'

        }, {
            color: 'blue',
            name: 'Tor zur Hölle'
        }]
    }];  

    perlImperiiPlacesOfPower: PlaceOfPowerTile[] = [{
        sides: [{
            color: 'orange',
            name: 'Magische Menagerie'

        }, {
            color: 'blue',
            name: 'Alchemistenwerkstatt'
        }],
    }, {
        sides: [{
            color: 'orange',
            name: 'Blutinsel'

        }, {
            color: 'blue',
            name: 'Perlenriff'
        }]
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
        let returnArray: PlaceOfPowerSide[] = [];

        tilesSelection.forEach((tile) => {
            returnArray.push(this.getRandomPlaceOfPowerSideForTile(tile));
        });

        return returnArray;
    }

    private getRandomPlaceOfPowerSideForTile(tile: PlaceOfPowerTile): PlaceOfPowerSide {
        let placesOfPowerShuffled = this.shuffleArray(tile.sides);
        return placesOfPowerShuffled[0];
    }

    private getRandomProperty(obj: any): any {
        let keys = Object.keys(obj);

        let returnVal: PlaceOfPowerSide = {
            color: '',
            name: ''
        };

        let randomKey = keys[ keys.length * Math.random() << 0];
        returnVal['color'] = randomKey;
        returnVal['name'] = obj[randomKey];

        return returnVal;
    };   

    private shuffleArray(inArray: any[]): any[] { 
        let returnArray = inArray.slice();

        for(var j, x, i = returnArray.length; i; j = Math.floor(Math.random() * i), x =returnArray[--i], returnArray[i] = returnArray[j], returnArray[j] = x);
        return returnArray;
    };
}
