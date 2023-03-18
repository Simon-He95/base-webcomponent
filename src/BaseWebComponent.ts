import type { Mode } from './types'
import { toArray } from './utils'
export class BaseWebComponent extends HTMLElement {
  shadowRoot: ShadowRoot
  constructor(mode: Mode = 'open') {
    super()
    this.shadowRoot = this.attachShadow({ mode })
    this.render()
  }

  render() {
    this.renderHtml()
    this.renderCss()
  }

  renderTemplate(templateStr: string): any {
    const div = document.createElement('div')
    div.innerHTML = templateStr
    return [...div.children as any]
  }

  renderHtml() {
    this.shadowRoot.append(...toArray(this.html()))
  }

  renderCss() {
    const stylesheet: CSSStyleSheet = new CSSStyleSheet()
    stylesheet.replaceSync(this.css())
    this.shadowRoot.adoptedStyleSheets = [stylesheet]
  }

  css(): string {
    throw new Error('必须重写父类 css 方法')
  }

  html(): any {
    return this.renderTemplate(this.template())
  }

  template(): string {
    throw new Error('必须重写父类 html 或者 template 方法')
  }
}
