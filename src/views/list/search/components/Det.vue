<template>

  <a-drawer
    placement="right"
    width="600"
    :closable="false"
    @close="handleCancle"
    :visible="visible"
  >

    <template slot="title">
      <a-row>
        <a-popover placement="leftTop">
          <template slot="content">
            <div class="account-center-avatarHolder">
              <div class="avatar">
                <img :src="avatar" />
              </div>
              <div class="username">李灵智</div>
              <div class="bio">海纳百川，有容乃大</div>
            </div>
            <div class="account-center-detail">
              <p>
                <i class="address"></i>
                <span>浙江省</span>
                <span>杭州市</span>
              </p>
            </div>
            <a-divider />
            <div class="account-center-tags">
              <div class="tagsTitle">
                学校信息
                <p></p>
              </div>
              大连民族大学
              大四
              计算机科学与技术专业
            </div>
            <a-divider :dashed="true" />
            <a-button type="primary" block @click="() => openNotificationWithIcon('success')">添加好友</a-button>
          </template>
          <a-col :span="2">
            <a-avatar size="small" :src="details.members[0].avatar?details.members[0].avatar:''" />
          </a-col>
          <a-col :span="22" class="name">
            杭州西湖旁交换南京
            <a-tag color="#2db7f5" style="margin-left:10px">大连民族大学</a-tag>
          </a-col>
        </a-popover>
      </a-row>
    </template>

    <a-carousel autoplay arrows dotsClass="slick-dots slick-thumb">
      <a slot="customPaging">
        <img :src="details.cover" />
      </a>
      <div v-for="item in 4" :key="item.index">
        <img :src="details.cover" />
      </div>
    </a-carousel>
    <p></p>

    <a-row style="margin-top:60px;">
      <a-col :span="3" class="testStyle">
        <a-icon type="environment" />&nbsp;城市
      </a-col>
      <a-col :span="8">浙江省杭州市</a-col>
      <a-col :span="3" class="testStyle">
        <a-icon type="calendar" />&nbsp;时间
      </a-col>
      <a-col :span="10">2019-9-11&nbsp;到&nbsp;2019-9-14</a-col>
    </a-row>
    <p></p>
    <a-row style="margin-top:30px;">
      <a-col :span="4" class="testStyle">
        <a-icon type="user" />&nbsp;家庭人数
      </a-col>
      <a-col :span="7">3</a-col>
      <a-col :span="3" class="testStyle">
        <a-icon type="home" />&nbsp;空房数
      </a-col>
      <a-col :span="10">2</a-col>
    </a-row>
    <p></p>
    <a-row style="margin-bottom:40px;margin-top:30px;">
      <a-col :span="4" class="testStyle">
        <a-icon type="tag" />&nbsp;详细描述
      </a-col>
      <a-col
        :span="20"
      >住宅临近西湖景区，交通方便，周围有小吃街，万达商城，房间是小女儿的房间，平时都是她在收拾，家中有长辈，母亲在家，如果你要是来到我们家，我们肯定会像照顾女儿一样照顾你们的，女儿想去南京旅游，希望你们好好介绍一样，我也会给你们推荐我们的旅游景点</a-col>
    </a-row>
    <p></p>
    <div
      :style="{
        position: 'absolute',
        bottom: 0,
        width: '100%',
        borderTop: '1px solid #e8e8e8',
        padding: '10px 16px',
        textAlign: 'right',
        left: 0,
        background: '#fff',
        borderRadius: '0 0 4px 4px',
      }"
    >
      <a-button style="marginRight: 8px" @click="onClose">关闭</a-button>
      <a-button type="primary" icon="message" style="marginRight: 8px" @click="chat()">聊天</a-button>
      <a-button @click="change()" type="primary">申请交换</a-button>
    </div>
  </a-drawer>
</template>
<script>
export default {
  name: 'Det',
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
    return {}
  },
  mounted () {},
  methods: {
    openNotificationWithIcon (type) {
      this.$notification[type]({
        message: '发起申请成功',
        description: '等待对方同意后即可成为好友'
      })
    },
    chat () {
      this.$router.push('/message')
      this.onClose()
    },
    change () {
      this.$message.success('发起申请成功，对方同意后，双方付款成功后即可交换旅游居所')
      this.onClose()
    },
    handleCancle () {
      this.onClose()
    }
  }
}
</script>
<style lang="less" scoped>
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
  width: 300px;
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
.testStyle {
  font-size: 13;
  font-weight: bold;
}
.page-menu-search {
  text-align: center;
  margin-bottom: 36px;
  margin-top: 30px;
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
      color: rgba(0, 0, 0, 0.45);
      font-size: 12px;
    }

    /deep/ .ant-pro-avatar-list {
      flex: 0 1 auto;
    }
  }
}
</style>
