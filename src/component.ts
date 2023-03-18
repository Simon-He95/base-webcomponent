import { BaseWebComponent } from './BaseWebComponent'

class UserCard extends BaseWebComponent {
  css() {
    return `:host {
      display: flex;
      align-items: center;
      width: 450px;
      height: 180px;
      background-color: #d4d4d4;
      border: 1px solid #d5d5d5;
      box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.1);
      border-radius: 3px;
      overflow: hidden;
      padding: 10px;
      box-sizing: border-box;
      font-family: 'Poppins', sans-serif;
    }
    .image {
      flex: 0 0 auto;
      width: 160px;
      height: 160px;
      vertical-align: middle;
      border-radius: 5px;
    }
    .container {
      box-sizing: border-box;
      padding: 20px;
      height: 160px;
    }
    .container > .name {
      font-size: 20px;
      font-weight: 600;
      line-height: 1;
      margin: 0;
      margin-bottom: 5px;
    }
    .container > .email {
      font-size: 12px;
      opacity: 0.75;
      line-height: 1;
      margin: 0;
      margin-bottom: 15px;
    }
    .container > .button {
      padding: 10px 25px;
      font-size: 12px;
      border-radius: 5px;
      text-transform: uppercase;
    }`
  }

  html() {
    const image = document.createElement('img')
    image.src = 'https://semantic-ui.com/images/avatar2/large/kristy.png'
    image.classList.add('image')

    const container = document.createElement('div')
    container.classList.add('container')

    const name = document.createElement('p')
    name.classList.add('name')
    name.innerText = 'User Name'

    const email = document.createElement('p')
    email.classList.add('email')
    email.innerText = 'yourmail@some-email.com'

    const button = document.createElement('button')
    button.classList.add('button')
    button.innerText = 'Follow'

    container.append(name, email, button)
    return [image, container]
  }
}

export function registerComponent(name: string) {
  window.customElements.define(name, UserCard)
}

// todo: 尝试提供原生html的方式生成
