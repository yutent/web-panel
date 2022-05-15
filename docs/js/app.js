/**
 *
 * @author yutent<yutent.io@gmail.com>
 * @date 2022/05/16 00:38:48
 */

import Anot from '//unpkg.yutent.top/anot/dist/anot.js'
import fetch from '//unpkg.yutent.top/@bytedo/fetch/dist/index.js'

const BASE_API = '//127.0.0.1:6767'

fetch.BASE_URL = BASE_API

fetch.inject.response(r => r.json())

Anot({
  $id: 'app',

  state: {
    title: '策略组',
    version: '1.10.0',
    navs: ['代理', '规则', '连接', '设置'],
    tab: 0
  },

  mounted() {
    this.getVersion()
  },

  methods: {
    changeTab(idx) {
      this.tab = idx
    },
    getVersion() {
      fetch('/version').then(r => {
        this.version = r.version
      })
    }
  }
})
