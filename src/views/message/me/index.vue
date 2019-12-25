<template>
  <div style="float:right;margin-top:10px;position:relative;">
    <!-- <a-row>
      <a-col :span="1"> -->
    <div class="bubble" v-if="housedetal?false:true" v-html="content.replace(/\#[\u4E00-\u9FA5]{1,3}\;/gi, emotion)">
    </div>
    <div class="bubble" v-if="housedetal?true:false">
      <housedetails></housedetails>
    </div>
    <a-avatar
      :src="avatar"
    ></a-avatar>
  </div>
</template>
<script>
import Emotion from '../Emotion/index'
import housedetails from '../housedetails'
export default {
  components: {
    Emotion,
    housedetails
  },
  props: ['noshow', 'ownkey', 'content', 'avatar', 'housedetal'],
  watch: {
    noshow (value) {
      if (value === this.ownkey) {
        this.vi = true
      } else {
        this.vi = false
      }
    }

  },
  data () {
    return {
      vi: true
    }
  },
  beforeMount () {

  },
  beforeDestroy () {
    this.vi = false
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
.bubble{
  max-width: 400px;
  word-wrap: break-word;word-break: break-all;overflow: hidden;
  border:0.6px solid rgba(0, 0, 0, 0.05);
  padding: 12px 16px;
  color: rgba(0, 0, 0, 0.65);
  border-radius: 13px 0px 13px 13px;
  font-size: 14px;
  text-align: left;
  line-height: 1.5;
  float: left;
  margin-right:10px;
  margin-top:13px;
  box-shadow: 0 2px 8px rgba(161, 84, 84, 0.12);
    -webkit-box-shadow: 0 0 8px rgba(0, 0, 0, 0.12) ;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.12) ;
}
</style>
