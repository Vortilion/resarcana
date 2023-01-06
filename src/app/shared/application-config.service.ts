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
            name: 'sacred-grove'

        }, {
            color: 'blue',
            name: 'alchemists-tower'
        }],
        set: 'base'
    }, {
        sides: [{
            color: 'orange',
            name: 'catacombs-of-the-dead'

        }, {
            color: 'blue',
            name: 'sacrificial-pit'
        }],
        set: 'base'
    }, {
        sides: [{
            color: 'orange',
            name: 'cursed-forge'

        }, {
            color: 'blue',
            name: 'dwarven-mines'
        }],
        set: 'base'
    }, {
        sides: [{
            color: 'orange',
            name: 'coral-castle'

        }, {
            color: 'blue',
            name: 'sunken-reef'
        }],
        set: 'base'
    }, {
        sides: [{
            color: 'orange',
            name: 'dragons-lair'

        }, {
            color: 'blue',
            name: 'sorcerers-bestiary'
        }],
        set: 'base'
    }];
    
    luxEtTenebraePlacesOfPower: PlaceOfPowerTile[] = [{
        sides: [{
            color: 'orange',
            name: 'dragon-aerie'

        }, {
            color: 'blue',
            name: 'crystal-keep'
        }],
        set: 'lux'
    }, {
        sides: [{
            color: 'orange',
            name: 'temple-of-the-abyss'

        }, {
            color: 'blue',
            name: 'gate-of-hell'
        }],
        set: 'lux'
    }];  

    perlImperiiPlacesOfPower: PlaceOfPowerTile[] = [{
        sides: [{
            color: 'orange',
            name: 'mystical-menagerie'

        }, {
            color: 'blue',
            name: 'alchemical-workshop'
        }],
        set: 'perl'
    }, {
        sides: [{
            color: 'orange',
            name: 'blood-isle'

        }, {
            color: 'blue',
            name: 'pearl-bed'
        }],
        set: 'perl'
    }]; 
            
    getRandomCorePlaces(count: number): any[] {
        return this.getRandomPlacesForExpansionAndNumber(false, false, count);
    }

    getRandomCoreAndLuxPlaces(count: number): any[] {
        return this.getRandomPlacesForExpansionAndNumber(true, false, count);
    }    
    

    getRandomCoreAndPerlPlaces(count: number): any[] {
        return this.getRandomPlacesForExpansionAndNumber(false, true, count);
    }   
    
    getRandomCoreAndLuxAndPerlPlaces(count: number): any[] {
        return this.getRandomPlacesForExpansionAndNumber(true, true, count);
    }

    getRandomPlacesForExpansionAndNumber(useLuxEtTenebrae: boolean, usePerlaeImperii: boolean, count: number) {
        let tilesSelection: PlaceOfPowerTile[] = [];

        if(!(useLuxEtTenebrae || usePerlaeImperii)) {
            tilesSelection = this.getRandomCorePlaceTiles(count);
        } else if (useLuxEtTenebrae && !usePerlaeImperii) {
            tilesSelection = this.getRandomCoreAndLuxPlaceTiles(count);
        } else if (!useLuxEtTenebrae && usePerlaeImperii) {
            tilesSelection = this.getRandomCoreAndPerlPlaceTiles(count);
        } else {
            tilesSelection = this.getRandomCoreAndLuxAndPerlPlaceTiles(count);
        }

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
