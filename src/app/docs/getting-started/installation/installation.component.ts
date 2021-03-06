import { Component } from '@angular/core';

@Component({
  selector: 'aui-installation',
  templateUrl: './installation.component.html'
})
export class InstallationComponent {
  code: string;
  iconAndFont = `<link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500|Material+Icons" rel="stylesheet">`;
  constructor() {
    this.code = `...
/** Import animations */
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

/** Import Alyle UI */
import {
  LyThemeModule,
  LY_THEME
} from '@alyle/ui';

/** Import the component modules */
import { LyButtonModule } from '@alyle/ui/button';
import { LyToolbarModule } from '@alyle/ui/toolbar';
import { LyResizingCroppingImageModule } from '@alyle/ui/resizing-cropping-images';
...

/** Import themes */
import { MinimaLight, MinimaDark } from '@alyle/ui/themes/minima';

@NgModule({
  ...
  imports: [
    ...
    // Animations
    BrowserAnimationsModule,
    // Set theme
    LyThemeModule.setTheme('minima-light'),
    // Add components
    LyButtonModule,
    LyToolbarModule,
    LyResizingCroppingImageModule
    ...
  ],
  /** Add themes */
  providers: [
    { provide: LY_THEME, useClass: MinimaLight, multi: true }, // name: \`minima-light\`
    { provide: LY_THEME, useClass: MinimaDark, multi: true } // name: \`minima-dark\`
  ]
  ...
})
export class AppModule { }`;
  }

  toJson(val: any) {
    // /** Custom theme */
    // const configAlyleUI = ${this.toJson(this.palette)};
    val = JSON.stringify(val, undefined, 2);
    val = (<string>val).replace(/\s\s\"/g, '  ');
    return (<string>val).replace(/\"\:\s/g, ': ');
  }

}
