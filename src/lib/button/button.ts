import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  Renderer2,
  NgZone,
  OnDestroy,
  OnInit,
  ViewChild,
  AfterViewInit,
  OnChanges
} from '@angular/core';
import {
  Platform,
  toBoolean,
  LyTheme2,
  ThemeVariables,
  mixinDisabled,
  mixinColor,
  mixinBg,
  mixinShadowColor,
  mixinOutlined,
  mixinElevation,
  mixinRaised,
  mixinDisableRipple,
  mixinStyleUpdater,
  LyRippleService,
  LyFocusState
} from '@alyle/ui';
import { styles } from './button.style';
const DEFAULT_SIZE = 'medium';
const DEFAULT_DISABLE_RIPPLE = false;
const STYLE_PRIORITY = -2;

export type LyButtonSize = 'small' | 'medium' | 'large';

/** @docs-private */
export class LyButtonBase {
  constructor(
    public _theme: LyTheme2,
    public _ngZone: NgZone
  ) { }
}

/** @docs-private */
export const LyButtonMixinBase = mixinStyleUpdater(
mixinBg(
    mixinColor(
      mixinRaised(
        mixinDisabled(
          mixinOutlined(
            mixinElevation(
              mixinShadowColor(
                mixinDisableRipple(LyButtonBase)))))))));

@Component({
  selector: 'button[ly-button]',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'button.html',
  inputs: [
    'bg',
    'color',
    'raised',
    'disabled',
    'outlined',
    'elevation',
    'shadowColor',
    'disableRipple'
  ],
  host: {
    '[disabled]': 'disabled'
  }
})
export class LyButton extends LyButtonMixinBase implements OnChanges, OnInit, AfterViewInit, OnDestroy {
  /**
   * Style
   * @docs-private
   */
  readonly classes = this._theme.addStyleSheet(styles, STYLE_PRIORITY);
  private _rippleSensitive = false;
  private _size: LyButtonSize;
  private _sizeClass: string;
  private _appearance: string;
  private _appearanceClass: string;
  private _onFocusByKeyboardState: boolean;

  @ViewChild('rippleContainer') _rippleContainer: ElementRef;

  /** @docs-private */
  @Input('sensitive')
  get rippleSensitive(): boolean {
    return this._rippleSensitive;
  }
  set rippleSensitive(value: boolean) {
    const newVal = this._rippleSensitive = toBoolean(value);
    this._rippleConfig.sensitive = newVal;
  }

  /** Button size */
  @Input()
  get size(): LyButtonSize {
    return this._size;
  }
  set size(val: LyButtonSize) {
    if (val !== this.size) {
      this._size = val;
      this._sizeClass = this._theme.addStyle(
        `lyButton.size:${val}`,
        (theme: ThemeVariables) => theme.button.size[val],
        this._el.nativeElement,
        this._sizeClass,
        STYLE_PRIORITY
      );
    }
  }

  /** Button appearance */
  @Input()
  get appearance(): string { return this._appearance; }
  set appearance(val: string) {
    if (val !== this.appearance) {
      if (val === 'icon' && !this._rippleConfig.centered) {
        this._rippleConfig.centered = true;
      }
      this._appearance = val;
      this._appearanceClass = this._theme.addStyle(
        `lyButton.appearance:${val}`,
        (theme: ThemeVariables) => (theme.button.appearance[val]),
        this._el.nativeElement,
        this._appearanceClass,
        STYLE_PRIORITY + 1);
    }
  }

  constructor(
    protected _el: ElementRef,
    protected _renderer: Renderer2,
    _theme: LyTheme2,
    _ngZone: NgZone,
    public _rippleService: LyRippleService,
    private _focusState: LyFocusState,
  ) {
    super(_theme, _ngZone);
    this.setAutoContrast();
    this._triggerElement = _el;
    if (Platform.FIREFOX) {
      this._theme.addStyle('button-ff', {
        '&::-moz-focus-inner,&::-moz-focus-inner,&::-moz-focus-inner,&::-moz-focus-inner': {
          border: 0
        }
      }, this._el.nativeElement, undefined, STYLE_PRIORITY);
    }
  }
  ngOnChanges() {
    this.updateStyle(this._el);
  }

  ngOnInit() {
    this._renderer.addClass(this._el.nativeElement, this.classes.root);
    if (!this.size && !this.appearance) {
      this.size = DEFAULT_SIZE;
    }
    // set default disable ripple
    if (this.disableRipple == null) {
      this.disableRipple = DEFAULT_DISABLE_RIPPLE;
    }
  }

  ngAfterViewInit() {
    this._renderer.addClass(this._el.nativeElement, this.classes.animations);

    const focusState = this._focusState.listen(this._el);
    if (focusState) {
      focusState.subscribe((event) => {
        if (this._onFocusByKeyboardState === true) {
          this._renderer.removeClass(this._el.nativeElement, this.classes.onFocusByKeyboard);
          this._onFocusByKeyboardState = false;
        }
        if (event === 'keyboard') {
            this._onFocusByKeyboardState = true;
            this._renderer.addClass(this._el.nativeElement, this.classes.onFocusByKeyboard);
        }
      });
    }
  }

  focus() {
    this._el.nativeElement.focus();
  }

  ngOnDestroy() {
    this._focusState.unlisten(this._el);
    this._removeRippleEvents();
  }
}

@Component({
  selector: 'a[ly-button]',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'button.html',
  inputs: [
    'bg',
    'color',
    'raised',
    'disabled',
    'outlined',
    'elevation',
    'shadowColor',
    'disableRipple'
  ]
})
export class LyAnchor extends LyButton {
  constructor(
    _el: ElementRef,
    _renderer: Renderer2,
    _theme: LyTheme2,
    _ngZone: NgZone,
    _rippleService: LyRippleService,
    _focusState: LyFocusState,
  ) {
    super(_el, _renderer, _theme, _ngZone, _rippleService, _focusState);
  }
}
