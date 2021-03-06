import { Component } from '@angular/core';

@Component({
  selector: 'aui-dynamic-styles',
  templateUrl: './dynamic-styles.component.html'
})
export class DynamicStylesComponent {
  codeBasicStyle = `
const styles = (theme: ThemeVariables) => ({
  // Style name, is optional, this is used to add a prefix to all classes,
  // it will only be seen in dev mode
  $name: 'example',
  // this would be like the name of the class
  demo: {
    color: theme.primary.default,
    // support for direction rtl/ltr
    borderBefore: '2px solid',    // css-ltr: border-left, css-rtl: border-right
    paddingBefore: '.5em',        // css-ltr: padding-left, css-rtl: padding-right
    '&:hover': {                  // \`&\` is equal to \`demo\` and therefore it would be 'demo:hover'
      color: theme.accent.default
    }
  },
  buttonLink: {
    color: theme.primary.default,
    textDecoration: 'inherit',
    '&:hover': {
      textDecoration: 'underline'
    }
  }
});
`;
}
