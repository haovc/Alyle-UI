import { Pipe, PipeTransform } from '@angular/core';
const Prism = require('prismjs');

@Pipe({
  name: 'prism'
})
export class PrismPipe implements PipeTransform {

  transform(value: any, args?: string): string {
    if (value === null ) {
      return;
    }
    if (args === 'ts') {
      return `<code class="language-javascript">${Prism.highlight(`${value}`, Prism.languages.javascript)}</code>`;
    } else if (args === 'html') {
      return `<code class="language-html">${Prism.highlight(`${value}`, Prism.languages.html)}</code>`;
    } else if (args === 'css') {
      return `<code class="language-css">${Prism.highlight(`${value}`, Prism.languages.css)}</code>`;
    } else {
      return value;
    }

  }

}
