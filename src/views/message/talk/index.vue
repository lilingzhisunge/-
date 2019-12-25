<template>
  <div style="height:460px;" >

    <a-card style="height:360px;" id="card">
      <happy-scroll color="rgba(51,51,51,0.2)" hide-horizontal hide-vertical :scroll-top="scrollTop">
        <div style="height:290px;width:990px;" >
          <template v-for="item in messageList[0]">
            <div :key="item.index" >
              <a-row style="margin-top:10px;" v-if="!item.me">
                <chat :noshow="noshow" :ownkey="ownkey" :content="item.content" :avatar="'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'"></chat>
              </a-row>
              <a-row style="margin-top:10px;" v-if="item.me">
                <me
                  :noshow="noshow"
                  :ownkey="ownkey"
                  :key="item.index"
                  :content="item.content"
                  :housedetal="item.housedetal"
                  :avatar="'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'"></me>
              </a-row>
            </div>
          </template>
        </div>
      </happy-scroll>
    </a-card>

    <div
      :style="{
        position: 'absolute',
        bottom: 0,
        height:'100px',
        width: '100%',
        zIndex:'100',
        borderTop: '1px solid #e8e8e8',
        padding: '10px 0px 0px 0px',
        textAlign: 'right',
        left: 0,
        background: '#fff',
        borderRadius: '0 0 4px 4px',
      }"
    >
      <a-textarea
        style="resize:none;height:88px;"
        placeholder="请输入"
        :rows="3.5"
        v-model="inputValue"
        @keyup.enter="send()"
        :value="inputValue.replace(/\#[\u4E00-\u9FA5]{1,3}\;/gi, emotion)">

      </a-textarea>

      <div
        style="margin-top:-41px;margin-right:10px"
      >
        <a-button-group>
          <a-popover trigger="click">
            <template slot="content">
              <emotion @emotion="handleEmotion" :height="280" style="width:400px;border:none"></emotion>
            </template>
            <a-button icon="smile">
            </a-button>
          </a-popover>
          <a-popover trigger="hover">
            <template slot="content">
              发送房源信息
            </template>
            <a-button icon="home" @click="housedetal">
            </a-button>
          </a-popover>
          <a-button icon="video-camera">
          </a-button>
          <a-button icon="phone">
          </a-button>
          <a-button @click="send()" type="primary">
            发送
          </a-button>
        </a-button-group></div>
    </div>
  </div>
</template>
<script>
import { HappyScroll } from 'vue-happy-scroll'
import 'vue-happy-scroll/docs/happy-scroll.css'
import Emotion from '../Emotion/index'
import moment from 'moment'
import chat from '../chat'
import me from '../me'
export default {
  components: {
    chat,
    me,
    HappyScroll,
    Emotion
  },
  props: ['noshow', 'ownkey', 'messageList'],
  data () {
    return {
      inputValue: '',
      meList: [],
      scrollTop: '',
      n: 1,
      content: '',
      comment: '',
      emo: '',
      showEmo: false
    }
  },
  mounted () {
    setTimeout(() => {
      this.showbottom()
    }, 0)
  },
  beforeMount () {

  },
  watch: {
    $route: {
      handler: function (val, oldVal) {
        setTimeout(() => {
          this.showbottom()
        }, 0)
      }
    },
    emo (value) {
      console.log(value)
    },
    scrollTop (value) {
      this.scrollTop = value
    },
    messageList (value) {
      setTimeout(() => {
        this.showbottom()
      }, 0)
    }
  },
  methods: {
    moment,
    housedetal () {
      this.messageList[0].push({ me: true, housedetal: true })
      setTimeout(() => {
        this.showbottom()
      }, 0)
    },
    handleEmotion (i) {
      this.inputValue += i
    },
    // 将匹配结果替换表情图片
    emotion (res) {
      const word = res.replace(/\#|\;/gi, '')
      const list = ['微笑', '撇嘴', '色', '发呆', '得意', '流泪', '害羞', '闭嘴', '睡', '大哭', '尴尬', '发怒', '调皮', '呲牙', '惊讶', '难过', '酷', '冷汗', '抓狂', '吐', '偷笑', '可爱', '白眼', '傲慢', '饥饿', '困', '惊恐', '流汗', '憨笑', '大兵', '奋斗', '咒骂', '疑问', '嘘', '晕', '折磨', '衰', '骷髅', '敲打', '再见', '擦汗', '抠鼻', '鼓掌', '糗大了', '坏笑', '左哼哼', '右哼哼', '哈欠', '鄙视', '委屈', '快哭了', '阴险', '亲亲', '吓', '可怜', '菜刀', '西瓜', '啤酒', '篮球', '乒乓', '咖啡', '饭', '猪头', '玫瑰', '凋谢', '示爱', '爱心', '心碎', '蛋糕', '闪电', '炸弹', '刀', '足球', '瓢虫', '便便', '月亮', '太阳', '礼物', '拥抱', '强', '弱', '握手', '胜利', '抱拳', '勾引', '拳头', '差劲', '爱你', 'NO', 'OK', '爱情', '飞吻', '跳跳', '发抖', '怄火', '转圈', '磕头', '回头', '跳绳', '挥手', '激动', '街舞', '献吻', '左太极', '右太极']
      const index = list.indexOf(word)
      return `<img src="https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/${index}.gif" align="middle">`
    },
    send () {
      const obj = {}
      obj.content = this.inputValue
      obj.me = true
      obj.time = moment()
      obj.avatar = 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
      if (this.inputValue === '') {

      } else {
        this.messageList[0].push(obj)
      }

      this.inputValue = ''
      setTimeout(() => {
        this.showbottom()
      }, 0)
    },
    showbottom () {
      this.n++
      this.scrollTop = (this.n + 2000) * 30
    }
  }
}
</script>
<style lang="less" scoped>
.ant-card-body{
  height:260px !important
}
.happy-scroll-container{
  height:330px !important;
}
#card .happy-scroll-container {
    width: 1070px;

  }
  .emotion-box{
    border:none !important
  }
  .name {
  font-size: 14px;
  // font-weight: bold;
  color: rgba(0, 0, 0, 0.65);
}
.ant-carousel .slick-dots {
  height: auto;
}
.ant-carousel .slick-slide img {
  border: 5px solid #fff;
  display: block;
  margin: auto;
  max-width: 100%;
}
.ant-carousel .slick-thumb {
  bottom: -45px;
}
.ant-carousel .slick-thumb li {
  width: 60px;
  height: 45px;
}
.account-center-avatarHolder {
  text-align: center;
  margin-bottom: 24px;
  width: 100px;
  & > .avatar {
    margin: 0 auto;
    width: 104px;
    height: 104px;
    margin-bottom: 20px;
    border-radius: 50%;
    overflow: hidden;
    img {
      height: 100%;
      width: 100%;
    }
  }
  .account-center-tags {
    .ant-tag {
      margin-bottom: 8px;
    }
  }

  .username {
    color: rgba(0, 0, 0, 0.85);
    font-size: 20px;
    line-height: 28px;
    font-weight: 500;
    margin-bottom: 4px;
  }
}

.account-center-detail {
  p {
    margin-bottom: 8px;
    padding-left: 26px;
    position: relative;
  }

  i {
    position: absolute;
    height: 14px;
    width: 14px;
    left: 0;
    top: 4px;
    background: url(https://gw.alipayobjects.com/zos/rmsportal/pBjWzVAHnOOtAUvZmZfy.svg);
  }

  .title {
    background-position: 0 0;
  }
  .group {
    background-position: 0 -22px;
  }
  .address {
    background-position: 0 -44px;
  }
}

.ant-carousel .slick-thumb li img {
  width: 60px;
  height: 100%;
  margin-top: 10px;
  filter: grayscale(100%);
}
.ant-carousel .slick-thumb li.slick-active img {
  filter: grayscale(0%);
}
</style>
