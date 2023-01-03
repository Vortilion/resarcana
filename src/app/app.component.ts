import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { BreakpointObserver, Breakpoints, MediaMatcher } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { ApplicationConfigService } from './shared/application-config.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
    title = 'Res Arcana - Setup Randomizer';
    useLuxEtTenebrae!: boolean;
    usePerlaeImperii!: boolean;
    monumentCount!: number;
    mobileQuery!: MediaQueryList;

    private _mobileQueryListener: () => void;

    constructor(
        private applicationConfigService: ApplicationConfigService,
        changeDetectorRef: ChangeDetectorRef, 
        media: MediaMatcher
    ) {
      this.mobileQuery = media.matchMedia('(max-width: 600px)');
      this._mobileQueryListener = () => changeDetectorRef.detectChanges();
      this.mobileQuery.addListener(this._mobileQueryListener);
    }

    

    ngOnInit(): void {
        this.useLuxEtTenebrae = false;
        this.usePerlaeImperii = false;
        this.monumentCount = 10;

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
    }

    ngOnDestroy(): void {
        this.mobileQuery.removeListener(this._mobileQueryListener);
    }

    onExpansionChange(event: MatSlideToggleChange) {
        if (event.source.name === 'useLuxEtTenebrae') {
            this.applicationConfigService.useLuxEtTenebrae.emit(event.checked);
        } else if (event.source.name === 'usePerlaeImperii') {
            this.applicationConfigService.usePerlaeImperii.emit(event.checked);
        }
    }
}
