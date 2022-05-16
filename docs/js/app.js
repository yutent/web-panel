/**
 *
 * @author yutent<yutent.io@gmail.com>
 * @date 2022/05/16 00:38:48
 */

import Anot from '//unpkg.yutent.top/anot/dist/anot.js'
import fetch from '//unpkg.yutent.top/@bytedo/fetch/dist/index.js'
import '//localhost/@bytedo/wcui/dist/layer/index.js'
import '//localhost/@bytedo/wcui/dist/form/switch.js'
import '//localhost/@bytedo/wcui/dist/form/radio.js'
import '//localhost/@bytedo/wcui/dist/form/button.js'

fetch.inject.response(r => r.json())

Anot({
  $id: 'app',

  state: {
    version: '1.10.0',
    navs: ['代理', '规则', '连接', '订阅', '设置'],
    tab: +Anot.ls('tab') || 0,
    contrl: {
      host: '//127.0.0.1:',
      port: Anot.ls('web_port'),
      key: ''
    },
    rules: [],
    remote: {
      link: Anot.ls('remote_link') || '',
      list: []
    },
    configs: {
      proxy: 'rule',
      http: 0,
      socks5: 0,
      mixed: 7890,
      allowLan: false
    }
  },

  mounted() {
    if (this.contrl.port) {
      fetch.BASE_URL = this.contrl.host + this.contrl.port
    } else {
      return layer
        .prompt('请输入Clash本地管理端口', (v, done) => {
          let n = +v.trim()
          if (n === n) {
            done()
          }
        })
        .then(v => {
          Anot.ls('web_port', v)
          location.reload()
        })
        .catch(e => {
          location.reload()
        })
    }
    this.getVersion()
    this.getConfig()
    this.getRule()
  },

  methods: {
    changeTab(idx) {
      this.tab = idx
      Anot.ls('tab', idx)
    },
    getVersion() {
      fetch('/version').then(r => {
        this.version = r.version
      })
    },

    getConfig() {
      fetch('/configs').then(r => {
        console.log(r)
        Object.assign(this.configs, {
          proxy: r.mode,
          http: r.port,
          socks5: r['socks-port'],
          mixed: r['mixed-port'],
          allowLan: r['allow-lan']
        })
        // this.version = r.version
      })
    },

    getRule() {
      fetch('/rules').then(r => {
        console.log(r)
        this.rules = r.rules
      })
    },

    updateRemote() {
      if (this.remote.link) {
        if (!/^(https?:)?\/\//.test(this.remote.link)) {
          return layer.toast('订阅地址格式不正确', 'error')
        }
        Anot.ls('remote_link', this.remote.link)
      } else {
        return
      }
      // let r = Anot.ss('temp')

      // this.remote.list = r.split('\n').map(it => {
      //   let tmp = decodeURIComponent(it).split('#')
      //   return [tmp.pop(), tmp[0]?.split('://').shift()]
      // })

      // return
      window
        .fetch(this.remote.link)
        .then(r => r.text())
        .then(r => {
          r = atob(r).trim()
          Anot.ss('temp', r)
          layer.toast('订阅更新成功', 'success')
          this.remote.list = r.split('\n').map(it => {
            let tmp = decodeURIComponent(it).split('#')
            return [tmp.pop(), tmp[0]?.split('://').shift()]
          })
        })
    }
  }
})
