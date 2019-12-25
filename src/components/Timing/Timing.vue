<template>
  <a-card style="width: 300px;" id="card">
    <audio id="audio" :src="pitpatSound"> </audio>
    <template class="ant-card-actions" slot="actions">
      <a-icon v-if="!play&&!sound" type="pause-circle" @click="pause()" />
      <a-icon v-if="play&&!sound" type="play-circle" @click="start()" />
      <a-icon v-if="sound" type="sound" @click="stop()"/>
      <a-icon type="undo" @click="undo()" />
      <a-icon type="poweroff" @click="poweroff()"/>
    </template>
    <a-card-meta>
      <template slot="description">
        <a-statistic-countdown
          :title="data.name"
          v-model="deadline"
          format="HH:mm:ss:SSS"
          style="margin-right: 50px"
          @finish="onFinish()"
          v-if="!play"
        />
        <a-statistic
          :title="data.name"
          :value="pausetime"
          style="margin-right: 50px"
          v-if="play"
        />
      </template>
    </a-card-meta>
  </a-card>
</template>
<script>
import { mapMutations } from 'vuex'
import moment from 'moment'
import pitpatSound from '@/assets/audio/我很快乐.mp3'
export default {
  name: 'Timing',
  props: ['data'],
  // props: {
  //   title: {
  //     type: String,
  //     default: ''
  //   },
  //   divider: {
  //     type: Boolean,
  //     default: false
  //   }
  // }
  data () {
    return {
      pitpatSound,
      bottom: 10,
      play: false,
      sound: false,
      deadline: '',
      now: '',
      pausetime: '',
      time: '',
      difference: 0
    }
  },
  mounted () {
    this.deadline = Date.now() + 60 * 100
    this.now = Date.now()
    console.log(Date.now())
    setTimeout(() => {
      this.sound = true
    }, 6500)
  },
  methods: {
    ...mapMutations([
      'setjishi'
    ]),
    onFinish () {
      this.playAudio()
      this.$message.success('计时结束')
    },
    poweroff () {
      this.$store.commit('SET_JISHI', false)
    },
    stop () {
      this.pauseAudio()
    },
    pause () {
      if (this.deadline !== 0) {
        this.play = !this.play
        this.time = this.deadline
        console.log(this.now)
        this.difference = Date.now() - this.now + this.difference
        // const data = 60 * 60 * 8
        // const dingtime = 60 * 100
        this.pausetime = moment(60 * 100 - this.difference - 60 * 60 * 8).format('HH:mm:ss:SSS')
        console.log(this.pausetime)
        this.deadline = 0
        this.$message.warning('暂停计时')
      } else {}
    },
    undo () {
      this.deadline = Date.now() + 60 * 100
      this.now = Date.now()
      this.$message.info('重新计时')
      if (this.play === true) {
        this.play = !this.play
      }
      this.sound = false
      this.pauseAudio()
      setTimeout(() => {
        this.sound = true
      }, 6500)
    },
    start () {
      this.play = !this.play
      this.$message.warning('开始计时')
      this.deadline = Date.now() + 60 * 100 - this.difference
      this.now = Date.now()
      console.log(Date.now())
      console.log(this.difference)
    }
  }
}
</script>
<style scoped>
.ant-card {
  margin-top: 23%;
  margin-left: 53%;
  position: fixed !important;
  z-index: 10 !important;
  border-radius: 40px;
  -webkit-box-shadow: 0 6px 16px rgba(0, 0, 0, 0.22);
  box-shadow: 0 7px 17px rgba(0, 0, 0, 0.22);
}
#card:hover {
  margin-top: 18%;
}
</style>
