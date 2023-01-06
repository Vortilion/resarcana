import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { TranslocoService } from '@ngneat/transloco';
import { PlaceOfPowerSide } from '../models/place-of-power-side.model';
import { PlayerCountOption } from '../models/player-count-option.model';
import { ApplicationConfigService } from '../shared/application-config.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
    title = 'Res Arcana - Setup Randomizer';
    useLuxEtTenebrae!: boolean;
    usePerlaeImperii!: boolean;
    monumentCount!: number;
    playerCount!: number;
    placesCount!: number;
    mobileQuery!: MediaQueryList;
    playerCountList!: PlayerCountOption[];
    randomPlacesOfPower!: PlaceOfPowerSide[];
    playerLabel!: string;

    private _mobileQueryListener: () => void;

    constructor(
        private applicationConfigService: ApplicationConfigService,
        private translocoService: TranslocoService,
        changeDetectorRef: ChangeDetectorRef,
        media: MediaMatcher
    ) {
        this.mobileQuery = media.matchMedia('(max-width: 600px)');
        this._mobileQueryListener = () => changeDetectorRef.detectChanges();
        this.mobileQuery.addEventListener('change', this._mobileQueryListener);
    }

    ngOnInit(): void {
        this.useLuxEtTenebrae = false;
        this.usePerlaeImperii = false;
        this.monumentCount = 10;
        this.placesCount = 5;
        this.playerCount = 2;

        this.playerCountList = [
            {
                label: '2',
                value: 2,
            }, {
                label: '3',
                value: 3,
            }, {
                label: '4',
                value: 4,
            },
        ];

        this.applicationConfigService.useLuxEtTenebrae.subscribe(
            (useLuxEtTenebrae: boolean) => {
                this.useLuxEtTenebrae = useLuxEtTenebrae;
            }
        );

        this.applicationConfigService.usePerlaeImperii.subscribe(
            (usePerlaeImperii: boolean) => {
                this.usePerlaeImperii = usePerlaeImperii;
            }
        );

        this.applicationConfigService.playerCount.subscribe(
            (playerCount: number) => {
                this.playerCount = playerCount;
            }
        );

        this.applicationConfigService.monumentCount.subscribe(
            (monumentCount: number) => {
                this.monumentCount = monumentCount;
            }
        );

        this.applicationConfigService.placesCount.subscribe(
            (placesCount: number) => {
                this.placesCount = placesCount;
            }
        );
    }

    ngOnDestroy(): void {
        this.mobileQuery.removeEventListener(
            'change',
            this._mobileQueryListener
        );
    }

    onExpansionChange(event: MatSlideToggleChange) {
        if (event.source.name === 'useLuxEtTenebrae') {
            this.applicationConfigService.useLuxEtTenebrae.emit(event.checked);
        } else if (event.source.name === 'usePerlaeImperii') {
            this.applicationConfigService.usePerlaeImperii.emit(event.checked);
        }

        this.randomPlacesOfPower = [];

        let isExpansionSelected: boolean =
            this.useLuxEtTenebrae || this.usePerlaeImperii;
        this.updatePlayerCountSelection(isExpansionSelected);

        this.setPlacesCountAndMonumentCountForPlayerCountAndExpansionsSelected(
            this.playerCount,
            isExpansionSelected
        );
    }

    onPlayerCountChange(event: MatSelectChange) {
        this.applicationConfigService.playerCount.emit(event.value);

        this.randomPlacesOfPower = [];
        this.setPlacesCountAndMonumentCountForPlayerCountAndExpansionsSelected(
            this.playerCount,
            this.useLuxEtTenebrae || this.usePerlaeImperii
        );
    }

    getAndSetRandomPlacesOfPower() {
        this.randomPlacesOfPower =
            this.applicationConfigService.getRandomPlacesForExpansionAndNumber(
                this.useLuxEtTenebrae,
                this.usePerlaeImperii,
                this.placesCount
            );
    }

    private updatePlayerCountSelection(isExpansionSelected: boolean) {
        if (isExpansionSelected) {
          if (this.playerCountList.length < 4) {
              this.playerCountList.push({
                  label: '5',
                  value: 5,
              });
          }
        } else {
            this.playerCountList.pop();
        }
    }

    private setMonumentCountForPlayerCountAndExpansionsSelected(
        playerCount: number,
        expansionSelected: boolean
    ) {
        if (expansionSelected) {
            if (playerCount === 2) {
                this.applicationConfigService.monumentCount.emit(7);
            } else if (playerCount === 3) {
                this.applicationConfigService.monumentCount.emit(10);
            } else if (playerCount === 4) {
                this.applicationConfigService.monumentCount.emit(12);
            } else if (playerCount === 5) {
                this.applicationConfigService.monumentCount.emit(14);
            }
        } else {
            this.applicationConfigService.monumentCount.emit(10);
        }
    }

    private setPlacesOfPowerCountForPlayerCountAndExpansionsSelected(
        playerCount: number,
        isExpansionSelected: boolean
    ) {
        if (isExpansionSelected) {
            if (playerCount === 2) {
                this.applicationConfigService.placesCount.emit(4);
            } else if (playerCount === 3) {
                this.applicationConfigService.placesCount.emit(5);
            } else if (playerCount === 4) {
                this.applicationConfigService.placesCount.emit(6);
            } else if (playerCount === 5) {
                this.applicationConfigService.placesCount.emit(7);
            }
        } else {
            this.applicationConfigService.placesCount.emit(5);
        }
    }

    private setPlacesCountAndMonumentCountForPlayerCountAndExpansionsSelected(
        playerCount: number,
        isExpansionSelected: boolean
    ) {
        this.setPlacesOfPowerCountForPlayerCountAndExpansionsSelected(
            playerCount,
            isExpansionSelected
        );
        this.setMonumentCountForPlayerCountAndExpansionsSelected(
            playerCount,
            isExpansionSelected
        );
    }
}
