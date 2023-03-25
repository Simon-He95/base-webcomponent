import type { EventName, Mode } from './types'
import { sugarReg, toArray } from './utils'
export class BaseWebComponent extends HTMLElement {
  props: Record<string, string> = {}
  shadowRoot: ShadowRoot
  mounted = false
  sideEffects: (() => void)[] = []
  constructor(mode: Mode = 'open') {
    super()
    this.shadowRoot = this.attachShadow({ mode })
    this.render()
  }

  initialProps() {
    const mutationObserver = new MutationObserver(() => this.setProps())
    mutationObserver.observe(this, {
      attributes: true,
    })
    // 如果没有props，也需要渲染
    Promise.resolve().then(() =>
      !this.mounted && this.setProps(),
    )
  }

  setProps() {
    this.mounted = true
    this.props = [...this.attributes as any].reduce((result, item) => {
      const { name, value } = item
      result[name] = value
      return result
    }, {} as Record<string, string>)

    // render propsTemplate
    const html = this.renderTemplate(this.getPropsTemplate())
    this.renderHtml(html)
    this.renderCss()
  }

  getPropsTemplate() {
    let _template = this.template()
    for (const match of _template.matchAll(sugarReg) || []) {
      const sugar = match[2]
      // eslint-disable-next-line no-new-func
      const value = new Function(`const props = ${JSON.stringify(this.props)}\n return ${sugar}`)() ?? ''

      _template = _template.replace(match[0], value)
    }
    return _template
  }

  getPropsValue(sugar: string) {
    try {
      return sugar.split('.').slice(1).reduce((props, key) => props[key], this.props as any)
    }
    catch (error) {
      return undefined
    }
  }

  render() {
    this.initialProps()
    // this.renderHtml(this.html())
  }

  renderTemplate(templateStr: string): any {
    const div = document.createElement('div')
    div.innerHTML = templateStr

    return [...div.childNodes as any]
  }

  renderHtml(html: Node[] | Node) {
    this.shadowRoot.innerHTML = ''
    this.shadowRoot.append(...toArray(html))
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

  registerEvent(emitName: string, selector: string, eventName: EventName = 'click') {
    // 绑定事件
    const event = new CustomEvent(emitName) as Event
    const effect = (e: Event) => {
      e.preventDefault()
      e.stopPropagation()
      e.stopImmediatePropagation()
      // mouseenter存在一定问题获取不到真正的元素
      const targets = e.composedPath() as Element[]
      if (targets.some((target) => {
        const className = target.className
        if (!className)
          return false
        return className.split(' ').includes(selector)
      }))
        this.dispatchEvent(event)
      return false
    }
    this.addEventListener(
      eventName,
      effect,
      false,
    )
    this.sideEffects.push(() => this.removeEventListener(eventName, effect, false))
    this.sideEffects.push(() => this.removeEventListener(emitName as EventName, event as any))
  }

  disconnectedCallback() {
    // 销毁事件
    this.sideEffects.forEach(effect => effect())
    this.sideEffects.length = 0
  }

  percent(n: number | string) {
    return `${(+n / 24) * 100}%`
  }
}
