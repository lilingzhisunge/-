<template>
  <a-card>
    <div
      style="height:400px;line-height:400px;margin-left:49%"
      v-if="panes.length == 0"
    >
      暂无申请
    </div>
    <a-tabs defaultActiveKey="1" v-if="panes.length !== 0">
      <a-tab-pane v-for="(pane,index) in panes" :tab="pane.title" :key="pane.key" >
        <a-row style="margin-bottom:30px;margin-top:10px">
          <a-col :span="1">
            <a-avatar size="small" :src="'https://gw.alipayobjects.com/zos/rmsportal/ZiESqWwCXBRQoaPONSJe.png'" />
          </a-col>
          <a-col :span="22" class="name">
            杭州西湖旁交换南京
            <a-tag color="#2db7f5" style="margin-left:10px">大连民族大学</a-tag>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12">
            <a-carousel autoplay arrows dotsClass="slick-dots slick-thumb">
              <a slot="customPaging">
                <img :src="'https://gw.alipayobjects.com/zos/rmsportal/iXjVmWVHbCJAyqvDxdtx.png'"/>
              </a>
              <div v-for="item in 4" :key="item.index">
                <img :src="'https://gw.alipayobjects.com/zos/rmsportal/iXjVmWVHbCJAyqvDxdtx.png'" />
              </div>
            </a-carousel>
            <p></p>
          </a-col>
          <a-col :span="12">
            <a-row style="margin-top:60px;margin-left:70px">
              <a-col :span="3" class="testStyle">
                <a-icon type="environment" />&nbsp;城市
              </a-col>
              <a-col :span="7">浙江省杭州市</a-col>
              <a-col :span="3" class="testStyle">
                <a-icon type="calendar" />&nbsp;时间
              </a-col>
              <a-col :span="9">2019-9-11&nbsp;到&nbsp;2019-9-14</a-col>
            </a-row>
            <p></p>
            <a-row style="margin-top:30px;margin-left:70px">
              <a-col :span="4" class="testStyle">
                <a-icon type="user" />&nbsp;家庭人数
              </a-col>
              <a-col :span="5" :offset="1">3</a-col>
              <a-col :span="4" class="testStyle">
                <a-icon type="home" />&nbsp;空房数
              </a-col>
              <a-col :span="8">2</a-col>
            </a-row>
            <p></p>
            <a-row style="margin-bottom:40px;margin-top:30px;margin-left:70px">
              <a-col :span="5" class="testStyle">
                <a-icon type="tag" />&nbsp;详细描述
              </a-col>
              <a-col
                :span="17"
              >住宅临近西湖景区，交通方便，周围有小吃街，万达商城，房间是小女儿的房间，平时都是她在收拾，家中有长辈，母亲在家，如果你要是来到我们家，我们肯定会像照顾女儿一样照顾你们的，女儿想去南京旅游，希望你们好好介绍一样，我也会给你们推荐我们的旅游景点</a-col>
            </a-row>
            <p></p>
            <a-button icon="message" style="marginRight: 8px;margin-left:140px" @click="chat()">聊天</a-button>
            <a-button style="marginRight: 8px;" @click="show()">添加好友</a-button>
            <a-button type="primary" style="marginRight: 8px" @click="remove(pane.key)">拒绝</a-button>
            <a-button type="primary" @click="agree">同意申请</a-button>
          </a-col>
        </a-row>
      </a-tab-pane>
    </a-tabs>
    <a-modal
      title=""
      v-model="showmodal"
      :closable="false"
      @ok="handleOk"
    >
      <div class="account-center-avatarHolder">
        <div class="avatar">
          <img :src="'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'">
        </div>
        <div class="username">李灵智</div>
        <div class="bio">海纳百川，有容乃大</div>
      </div>
      <p>
        <i class="address"></i>
        <span>浙江省</span>
        <span>杭州市</span>
      </p>
      <a-divider/>
      <div class="tagsTitle"></div>

      大连民族大学
      大四
      计算机科学与技术专业

      <a-divider :dashed="true"/>
      <div class="account-center-tags">
        <div class="tagsTitle">标签</div>
        <div>
          <template v-for="(tag) in tags">
            <a-tooltip v-if="tag.length > 20" :key="tag" :title="tag">
              <a-tag
                color="#2db7f5"
                :key="tag"
              >
              </a-tag></a-tooltip>
            <a-tag
              color="#2db7f5"
              v-else
              :key="tag"

            >{{ tag }}</a-tag>
          </template>
        </div>
      </div>
      <template slot="footer">
        <a-button key="back" @click="handleCancel">取消</a-button>
        <a-button key="submit" type="primary" @click="handleOk">
          确定添加
        </a-button>
      </template>
    </a-modal>
  </a-card>
</template>
<script>
export default {
  name: 'ApplyForm',
  components: {},
  props: {
    onClose: {
      type: Function
    },
    avatar: {
      type: String
    },
    visible: {
      type: Boolean
    },
    details: {
      type: Object
    }
  },
  data () {
    const panes = [
      { title: '杭州-南京', content: 'Content of Tab 1', key: '1' },
      { title: '杭州-南京', content: 'Content of Tab 2', key: '2' },
      { title: '杭州-南京', content: 'Content of Tab 3', key: '3' }
    ]
    return {
      activeKey: panes[0].key,
      tags: ['很有想法的', '专注设计', '辣~', '大长腿', '川妹子', '海纳百川'],
      panes: panes,
      showmodal: false
    }
  },
  mounted () {},
  methods: {
    remove (targetKey) {
      this.$message.success('您已拒绝此次申请，有缘再会')
      let activeKey = this.activeKey
      let lastIndex
      this.panes.forEach((pane, i) => {
        if (pane.key === targetKey) {
          lastIndex = i - 1
        }
      })
      const panes = this.panes.filter(pane => pane.key != targetKey)
      if (lastIndex >= 0 && activeKey === targetKey) {
        activeKey = panes[lastIndex].key
      }
      this.panes = panes
      this.activeKey = activeKey

      console.log(this.panes)
    },
    handleOk (e) {
      console.log(e)
      this.showmodal = false
      this.$message.success('好友申请已发送')
    },
    handleCancel (e) {
      this.showmodal = false
    },
    chat () {
      this.$router.push('/message')
    },
    show () {
      this.showmodal = true
    },
    agree () {
      this.$router.push('/form/step-form')
    }
  }
}
</script>
<style lang="less" scoped>
.name{
  font-size: 14px;
  // font-weight: bold;
  color: rgba(0, 0, 0, 0.65);
}
.ant-carousel  .slick-dots {
    height: auto;
  }
  .ant-carousel  .slick-slide img {
    border: 5px solid #fff;
    display: block;
    margin: auto;
    max-width: 100%;
  }
  .ant-carousel  .slick-thumb {
    bottom: -45px;
  }
  .ant-carousel  .slick-thumb li {
    width: 60px;
    height: 45px;
  }
  .account-center-avatarHolder {
    text-align: center;
    margin-bottom:44px;
    width: 500px;
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

  .ant-carousel  .slick-thumb li img {
    width: 60px;
    height: 100%;
    margin-top:10px;
    filter: grayscale(100%);
  }
  .ant-carousel  .slick-thumb li.slick-active img {
    filter: grayscale(0%);
  }
.testStyle{
  font-size: 13;
  font-weight: bold
}
.page-menu-search {
    text-align: center;
    margin-bottom: 36px;
    margin-top:30px;
  }
.ant-pro-components-tag-select {
  /deep/ .ant-pro-tag-select .ant-tag {
    margin-right: 24px;
    padding: 0 8px;
    font-size: 14px;
  }
}
.ant-pro-pages-list-projects-cardList {
  margin-top: 24px;

  /deep/ .ant-card-meta-title {
    margin-bottom: 4px;
  }

  /deep/ .ant-card-meta-description {
    height: 44px;
    overflow: hidden;
    line-height: 22px;
  }

  .cardItemContent {
    display: flex;
    height: 20px;
    margin-top: 16px;
    margin-bottom: -4px;
    line-height: 20px;

    > span {
      flex: 1 1;
      color: rgba(0,0,0,.45);
      font-size: 12px;
    }

    /deep/ .ant-pro-avatar-list {
      flex: 0 1 auto;
    }
  }
}
</style>
