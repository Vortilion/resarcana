import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MediaMatcher } from '@angular/cdk/layout';
import { ApplicationConfigService } from './shared/application-config.service';
import { MatSelectChange } from '@angular/material/select';
import { PlayerCountOption } from './models/player-count-option.model';
import { PlaceOfPowerSide } from './models/place-of-power-side.model';
import { TranslocoService } from '@ngneat/transloco';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    constructor() {}
        
}
