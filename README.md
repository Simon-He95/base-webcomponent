## BaseWebComponent
提炼一个BaseWebComponent的class，提供了一些常用的方法基于class快速的生成新的webcomponent组件

## 安装
npm install @simon_he/base-webcomponent

## 使用
- 通过html返回原生的dom节点渲染

``` ts
export class UserCard extends BaseWebComponent {
  css() {
    return `:host {
      display: flex;
      align-items: center;
    }
   `
  }

  html(): string {
    const image = document.createElement('img')
    image.src = 'https://semantic-ui.com/images/avatar2/large/kristy.png'
    return image
  }
}
// 注册
export function registerComponent(name: string) {
  window.customElements.define(name, UserCard)
}
```

- 通过template返回原生html的字符串渲染
``` ts
export class UserCard extends BaseWebComponent {
  css() {
    return `:host {
      display: flex;
      align-items: center;
    }
   `
  }

  template(): string {
    return `
    <img src="https://semantic-ui.com/images/avatar2/large/kristy.png" class="image">
    `
  }
}

// 注册
export function registerComponent(name: string) {
  window.customElements.define(name, UserCard)
}
```

## Todo
- [ ] 支持slot
- [ ] 支持props


## License
[MIT](./LICENSE) License © 2022 [Simon He](https://github.com/Simon-He95)

<a href="https://github.com/Simon-He95/sponsor" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/default-orange.png" alt="Buy Me A Coffee" style="height: 51px !important;width: 217px !important;" ></a>


<span><div align="center">![sponsors](https://www.hejian.club/images/sponsors.jpg)</div></span>
