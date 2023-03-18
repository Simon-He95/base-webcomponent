export class BaseWebComponent extends HTMLElement {
  shadowRoot: ShadowRoot
  constructor(mode: 'closed' | 'open' = 'open') {
    super()
    this.shadowRoot = this.attachShadow({ mode })
    this.render()
  }

  render() {
    this.renderHtml()
    this.renderCss()
  }

  renderHtml() {
    const html = Array.isArray(this.html()) ? this.html() : [this.html()]
    this.shadowRoot.append(...html)
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
    throw new Error('必须重写父类 html 方法')
  }
}
