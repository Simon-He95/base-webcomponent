import { BaseWebComponent } from '@simon_he/base-webcomponent'
class UserCard extends BaseWebComponent {
  css() {
    return `
    :host {
      display:flex;
      height:200px;
    }
    `
  }

  template() {
    return '<img src="https://semantic-ui.com/images/avatar2/large/kristy.png" />'
  }
}
export function register(name: string) {
  window.customElements.define(name, UserCard)
}
