<template>
  <div>
    <!-- <a-row>
      <a-col :span="1"> -->
    <a-avatar
      style="float:left"
      :src="avatar"
    ></a-avatar>
    <div class="bubbleleft" v-html="content.replace(/\#[\u4E00-\u9FA5]{1,3}\;/gi, emotion)"></div>
  </div>
</template>
<script>
import Emotion from '../Emotion/index'
export default {
  components: {
    Emotion
  },
  props: ['noshow', 'ownkey', 'content', 'avatar'],
  watch: {
    noshow (value) {
      if (value === this.ownkey && this.$route.path === '/dashboard/message') {
        this.vi = true
      } else {
        this.vi = false
      }
    },
    $route: {
      handler: function (val, oldVal) {
        if (val.path !== '/dashboard/message') {
          this.vi = false
          console.log()
        } else {
          this.vi = true
        }
      },
      // 深度观察监听
      deep: true
    }
  },
  data () {
    return {
      vi: true,
      router: ''
    }
  },
  mounted () {
  },
  methods: {
    emotion (res) {
      const word = res.replace(/\#|\;/gi, '')
      const list = ['微笑', '撇嘴', '色', '发呆', '得意', '流泪', '害羞', '闭嘴', '睡', '大哭', '尴尬', '发怒', '调皮', '呲牙', '惊讶', '难过', '酷', '冷汗', '抓狂', '吐', '偷笑', '可爱', '白眼', '傲慢', '饥饿', '困', '惊恐', '流汗', '憨笑', '大兵', '奋斗', '咒骂', '疑问', '嘘', '晕', '折磨', '衰', '骷髅', '敲打', '再见', '擦汗', '抠鼻', '鼓掌', '糗大了', '坏笑', '左哼哼', '右哼哼', '哈欠', '鄙视', '委屈', '快哭了', '阴险', '亲亲', '吓', '可怜', '菜刀', '西瓜', '啤酒', '篮球', '乒乓', '咖啡', '饭', '猪头', '玫瑰', '凋谢', '示爱', '爱心', '心碎', '蛋糕', '闪电', '炸弹', '刀', '足球', '瓢虫', '便便', '月亮', '太阳', '礼物', '拥抱', '强', '弱', '握手', '胜利', '抱拳', '勾引', '拳头', '差劲', '爱你', 'NO', 'OK', '爱情', '飞吻', '跳跳', '发抖', '怄火', '转圈', '磕头', '回头', '跳绳', '挥手', '激动', '街舞', '献吻', '左太极', '右太极']
      const index = list.indexOf(word)
      return `<img src="https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/${index}.gif" align="middle">`
    },
    handleChange () {

    }
  }
}
</script>
<style>
.bubbleleft{
  max-width: 400px;
  word-wrap: break-word;word-break: break-all;overflow: hidden;
  border:0.6px solid rgba(0, 0, 0, 0.05);
  padding: 12px 16px;
  color: rgba(0, 0, 0, 0.65);
  border-radius:0px 13px 13px 13px;
  font-size: 14px;
  text-align: left;
  float: left;
  line-height: 1.5;
  margin-top:15px;
  margin-left:6px;
  box-shadow: 0 2px 8px rgba(161, 84, 84, 0.12);
    -webkit-box-shadow: 0 0 8px rgba(0, 0, 0, 0.12) ;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.12) ;
}
</style>
