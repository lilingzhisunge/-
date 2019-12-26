<template>
  <a-card>
    <a-tabs v-model="activeKey" type="editable-card" hideAdd @edit="onEdit">
      <a-tab-pane
        tab="消息列表"
        :key="1"
        :closable="false"
        style="height:460px;width:1060px"
        id="listcard"
      >
        <!-- <a-card > -->
        <happy-scroll color="rgba(51,51,51,0.2)" hide-horizontal>
          <div style="height:460px;width:1030px;">
            <a-list :dataSource="list" style="margin-bottom:15px">
              <a-list-item slot="renderItem" slot-scope="item, index" @click="talk(index)">
                <a slot="actions" style="margin-left:-370px">
                  <a-badge :count="item.count" :numberStyle="{backgroundColor: '#52c41a'} " />
                </a>
                <a-list-item-meta :description="item.lastMessage">
                  <a slot="title" :href="item.href">{{ item.name }}</a>
                  <a-avatar slot="avatar" :src="item.avatar" />
                </a-list-item-meta>
              </a-list-item>
            </a-list>
          </div>
          <!-- </a-card>  -->
        </happy-scroll>
      </a-tab-pane>

      <a-tab-pane v-for="pane in panes" :tab="pane.title" :key="pane.key" :closable="pane.closable">
        <talk :noshow="activeKey" :ownkey="pane.key" :messageList="messageList"></talk>
      </a-tab-pane>
    </a-tabs>
  </a-card>
</template>

<script>
import reqwest from 'reqwest'
import talk from './talk'
import { HappyScroll } from 'vue-happy-scroll'
import 'vue-happy-scroll/docs/happy-scroll.css'
const fakeDataUrl = 'https://randomuser.me/api/?results=5&inc=name,gender,email,nat&noinfo'
export default {
  directives: { HappyScroll },
  components: {
    talk
  },
  data () {
    const panes = []
    const allMessage = [
      {
        userId: 1,
        message: [
          {
            content: '你好',
            time: '1',
            me: false,
            avatar: ''
          },
          {
            content: '我是大连理工大学的邓伦',
            time: '2',
            me: false,
            avatar: ''
          },
          {
            content: '你好',
            time: '3',
            me: true,
            avatar: ''
          },
          {
            content: '我是邓伦，你好，看了你发布的房源，跟我理想的居住地点很符合',
            time: '4',
            me: false,
            avatar: ''
          }
        ]
      }
    ]
    const list = [
      {
        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        name: '邓伦',
        userId: 1,
        lastMessage: '我是邓伦，你好，看了你发布的房源，跟我理想的居住地点很符合',
        count: '1',
        lastTime: '10:20'
      },
      {
        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        name: '秦尚城',
        userId: 2,
        lastMessage: 'Hi！能聊一聊么。',
        count: '1',
        lastTime: '10:20'
      },
      {
        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        name: '炎亚纶',
        userId: 3,
        lastMessage: '好的，期待与你的互换之旅',
        count: '0',
        lastTime: '10:20'
      },
      {
        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        name: '丁子珊',
        userId: 4,
        lastMessage: 'Hi！能聊一聊么。',
        count: '1',
        lastTime: '10:20'
      },
      {
        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        name: '李若瑶',
        userId: 5,
        lastMessage: '好的，期待与你的互换之旅',
        count: '0',
        lastTime: '10:20'
      },
      {
        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        name: '李沁',
        userId: 6,
        lastMessage: '好的，期待与你的互换之旅',
        count: '0',
        lastTime: '10:20'
      },
      {
        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        name: '范闲',
        userId: 7,
        lastMessage: '好的，期待与你的互换之旅',
        count: '0',
        lastTime: '10:20'
      },
      {
        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        name: '钱大有',
        userId: 8,
        lastMessage: '好的，期待与你的互换之旅',
        count: '0',
        lastTime: '10:20'
      }
    ]
    return {
      activeKey: 1,
      panes,
      newTabIndex: 0,
      data: [],
      visible: false,
      loading: false,
      busy: false,
      list: list,
      index: 0,
      allMessage,
      messageList: []
    }
  },
  beforeMount () {
    this.fetchData(res => {
      this.data = res.results
    })
  },
  watch: {
    activeKey (value) {
      setTimeout(() => {
        this.messageList = []
        if (this.panes.length >= 1 && value !== 1) {
          const Id = this.panes[value - 2].userId
          for (let i = 0; i < this.allMessage.length; i++) {
            if (this.allMessage[i].userId === Id) {
              this.messageList.push(this.allMessage[i].message)
            }
          }
        }
      }, 0)
    }
  },
  beforeDestroy () {
    clearTimeout()
  },
  methods: {
    callback (key) {
      // console.log(key)
    },
    onEdit (targetKey, action) {
      this[action](targetKey)
    },
    add () {
      const panes = this.panes
      const activeKey = `newTab${this.newTabIndex++}`
      panes.push({ title: 'New Tab', content: 'Content of new Tab', key: activeKey })
      this.panes = panes
      this.activeKey = activeKey
    },
    remove (targetKey) {
      let activeKey = this.activeKey
      let lastIndex
      this.panes.forEach((pane, i) => {
        if (pane.key === targetKey) {
          lastIndex = i - 1
        }
      })
      const panes = this.panes.filter(pane => pane.key !== targetKey)
      if (panes.length && activeKey === targetKey) {
        if (lastIndex >= 0) {
          activeKey = panes[lastIndex].key
        } else {
          activeKey = panes[0].key
        }
      }
      this.panes = panes
      this.activeKey = activeKey
      if (this.panes.length === 0) {
        this.activeKey = 1
      }
    },
    fetchData (callback) {
      reqwest({
        url: fakeDataUrl,
        type: 'json',
        method: 'get',
        contentType: 'application/json',
        success: res => {
          callback(res)
        }
      })
    },
    talk (index) {
      const obj = {}
      let have = -1
      obj.title = this.list[index].name
      obj.key = this.panes.length + 2
      obj.userId = this.list[index].userId
      for (let i = 0; i < this.panes.length; i++) {
        if (obj.title === this.panes[i].title) {
          have = i
        } else {
          have = -1
        }
      }
      if (have > -1) {
        this.activeKey = have + 2
        this.list[index].count = 0
      } else {
        this.panes.push(obj)
        this.activeKey = obj.key
        this.list[index].count = 0
      }
    },
    handleInfiniteOnLoad () {
      const data = this.data
      this.loading = true
      if (data.length > 14) {
        this.$message.warning('Infinite List loaded all')
        this.busy = true
        this.loading = false
        return
      }
      this.fetchData(res => {
        this.data = data.concat(res.results)
        this.loading = false
      })
    }
  }
}
</script>
<style>

.demo-infinite-container {
  border: 1px solid #e8e8e8;
  border-radius: 4px;
  overflow: auto;
  padding: 8px 24px;
  height: 460px;
}
.demo-loading-container {
  position: absolute;
  bottom: 40px;
  width: 100%;
  text-align: center;
}
#listcard .happy-scroll-container {
  width: 1090px;
  height: 460px;
}
.ant-list-item-meta-content {
  width: 1090px !important;
}
</style>
