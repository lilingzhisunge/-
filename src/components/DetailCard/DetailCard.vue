<template>
  <a-row>
    <a-col :span="16">
      <a-card style="width: 300px;margin-right:0px">
        <img
          alt="example"
          src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
          slot="cover"
        />
        <template class="ant-card-actions" slot="actions">
          <a-icon type="star"/>
          <a-icon type="heart"/>
        </template>
        <a-card-meta :title="detail.title" :description="detail.description">
        </a-card-meta>
      </a-card>
    </a-col>
    <a-col :span="8">
      <a-avatar
        style="margin-bottom:20px;margin-left:40px"
        :size="70"
        src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
      />
      <br>
      <span style="margin-left:50px;margin-bottom:20px;">{{ detail.name }}</span>
      <a-time-picker style="margin-bottom:30px;margin-top:20px;margin-left:20px" :defaultValue="moment('12:08:23', 'HH:mm:ss')" size="large" />
      <a-switch style="margin-bottom:30px;margin-left:20px"/>
      <a-rate :tooltips="desc" v-model="value" style="margin-left:10px" @change="rate()" :disabled="read"/>
    </a-col>
  </a-row>
</template>
<script>
import moment from 'moment'
export default {
  methods: {
    moment,
    rate () {
      this.$message.success('评分成功！感谢您的参与！')
      this.read = true
    }
  },
  props: ['detail'],
  data () {
    return {
      read: false,
      value: 0,
      desc: ['terrible', 'bad', 'normal', 'good', 'wonderful']
    }
  }
}
</script>
