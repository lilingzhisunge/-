<template>
  <div>
    <a-row>
      <a-col :span="7" id="col">
        <happy-scroll color="rgba(51,51,51,0.2)" hide-horizontal>
          <a-card style="over-flow:scroll;width:320px;padding-bottom:20px" id="card">
            <template slot="title">
              <a-input-search placeholder="请输入......" style="width: 270px" />
            </template>
            <template v-for="item in 14" style="margin-top:50px;">
              <a-card-grid :key="item.index" style="width:100%;height:75px;textAlign:'center'">
                <a-avatar
                  style="margin-top:-15px"
                  shape="square"
                  :size="54"
                  :src="'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'"
                ></a-avatar>
                <div style="margin-left:70px;margin-top:-48px;font-size:15px">秦尚城</div>
                <div style="margin-left:70px;margin-top:10px;font-size:12px;color:#87d068">等待交换</div>
                <div style="margin-left:180px;margin-top:-40px;font-size:15px">
                  <a-tag color="blue">大连理工大学</a-tag>
                </div>
              </a-card-grid>
            </template>
          </a-card>
        </happy-scroll>
      </a-col>
      <a-col :span="7">
        <a-card style="height:560px;margin-left:1px">
          <div class="account-center-avatarHolder">
            <div class="avatar">
              <img :src="'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'" />
            </div>
            <div class="username">李灵智</div>
            <div class="bio">海纳百川，有容乃大</div>
          </div>
          <p>
            <i class="address"></i>
            <span>浙江省</span>
            <span>杭州市</span>
          </p>
          <a-divider />
          <div class="tagsTitle"></div>
          大连民族大学
          大四
          计算机科学与技术专业
          <a-divider :dashed="true" />
          <div class="account-center-tags">
            <div class="tagsTitle">标签</div>
            <div>
              <template v-for="(tag) in tags">
                <a-tooltip v-if="tag.length > 20" :key="tag" :title="tag">
                  <a-tag color="#2db7f5" :key="tag"></a-tag>
                </a-tooltip>
                <a-tag color="#2db7f5" v-else :key="tag">{{ tag }}</a-tag>
              </template>
            </div>
          </div>
          <a-divider :dashed="true" />

          <a-button type="dashed" block style="margin-top:0px" @click="talk()">发送消息</a-button>
        </a-card>
      </a-col>
      <a-col :span="10">
        <a-card style="margin-left:6px;height:560px">
          <a-tabs defaultActiveKey="1" style="margin-top:-15px">
            <a-tab-pane tab="杭州" key="1">
              <a-carousel autoplay arrows dotsClass="slick-dots slick-thumb" style="height:210px">
                <a slot="customPaging">
                  <img :src="'https://gw.alipayobjects.com/zos/rmsportal/iXjVmWVHbCJAyqvDxdtx.png'" />
                </a>
                <div v-for="item in 4" :key="item.index">
                  <img :src="'https://gw.alipayobjects.com/zos/rmsportal/iXjVmWVHbCJAyqvDxdtx.png'" />
                </div>
              </a-carousel>
              <a-row style="margin-top:100px;">
                <a-col :span="3" class="testStyle">
                  <a-icon type="environment" />&nbsp;城市
                </a-col>
                <a-col :span="8">浙江省杭州市</a-col>
                <a-col :span="3" class="testStyle">
                  <a-icon type="calendar" />&nbsp;时间
                </a-col>
                <a-col :span="10">2019-9-11&nbsp;到&nbsp;2019-9-14</a-col>
              </a-row>
              <a-row style="margin-top:20px;">
                <a-col :span="5" class="testStyle">
                  <a-icon type="user" />&nbsp;家庭人数
                </a-col>
                <a-col :span="6">3</a-col>
                <a-col :span="4" class="testStyle">
                  <a-icon type="home" />&nbsp;空房数
                </a-col>
                <a-col :span="9">2</a-col>
              </a-row>
              <a-row style="margin-top:20px;">
                <a-col :span="5" class="testStyle">
                  <a-icon type="tag" />&nbsp;详细描述
                </a-col>
                <a-tooltip placement="top">
                  <template slot="title">
                    <span>住宅临近西湖景区，交通方便，周围有小吃街，万达商城，房间是小女儿的房间，平时都是她在收拾，家中有长辈，母亲在家，如果你要是来到我们家，我们肯定会像照顾女儿一样照顾你们的，女儿想去南京旅游，希望你们好好介绍一样，我也会给你们推荐我们的旅游景点</span>
                  </template>
                  <a-col
                    :span="19"
                    style="overflow: hidden;
text-overflow:ellipsis;
white-space: nowrap;"
                  >住宅临近西湖景区，交通方便，周围有小吃街，万达商城，房间是小女儿的房间，平时都是她在收拾，家中有长辈，母亲在家，如果你要是来到我们家，我们肯定会像照顾女儿一样照顾你们的，女儿想去南京旅游，希望你们好好介绍一样，我也会给你们推荐我们的旅游景点</a-col>
                </a-tooltip>
                <a-button
                  type="primary"
                  block
                  style="margin-top:20px;margin-bottom:0px"
                  @click="changehome()"
                >申请换房</a-button>
              </a-row>
            </a-tab-pane>
            <a-tab-pane tab="南京" key="2" forceRender>Content of Tab Pane 2</a-tab-pane>
            <a-tab-pane tab="上海" key="3">Content of Tab Pane 3</a-tab-pane>
          </a-tabs>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>
<script>
import { HappyScroll } from 'vue-happy-scroll'
import 'vue-happy-scroll/docs/happy-scroll.css'
export default {
  components: {
    HappyScroll
  },
  props: [],
  watch: {},
  data () {
    return {
      tags: ['很有想法的', '专注设计', '辣~', '大长腿', '川妹子', '海纳百川'],

      tagInputVisible: false,
      tagInputValue: ''
    }
  },
  beforeMount () {},
  beforeDestroy () {},
  methods: {
    handleTabChange (key, type) {
      this[type] = key
    },

    handleTagClose (removeTag) {
      const tags = this.tags.filter(tag => tag !== removeTag)
      this.tags = tags
    },

    showTagInput () {
      this.tagInputVisible = true
      this.$nextTick(() => {
        this.$refs.tagInput.focus()
      })
    },
    talk () {
      this.$router.push('/message')
    },
    changehome () {
      this.$message.success('已成功向对方发起交换请求，如若对方同意即可开启交换之旅')
    },
    handleInputChange (e) {
      this.tagInputValue = e.target.value
    },

    handleTagInputConfirm () {
      const inputValue = this.tagInputValue
      let tags = this.tags
      if (inputValue && !tags.includes(inputValue)) {
        tags = [...tags, inputValue]
      }

      Object.assign(this, {
        tags,
        tagInputVisible: false,
        tagInputValue: ''
      })
    }
  }
}
</script>
<style scoped lang="less">
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
  width: 10px;
  height: 45px;
}
.account-center-avatarHolder {
  text-align: center;
  margin-bottom: 24px;
  width: 300px;
  & > .avatar {
    margin: 0 auto;
    width: 54px;
    height: 54px;
    margin-bottom: 20px;
    border-radius: 50%;
    overflow: hidden;
    img {
      height: 60%;
      width: 60%;
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
  .account-center-tags {
    .ant-tag {
      margin-bottom: 8px;
    }
  }
}
#col {
  height: 560px;
}
#card {
}
.account-center-tags {
  .ant-tag {
    margin-bottom: 8px;
  }
}

.account-center-team {
  .members {
    a {
      display: block;
      margin: 12px 0;
      line-height: 16px;
      height: 16px;
      .member {
        font-size: 14px;
        color: rgba(0, 0, 0, 0.65);
        line-height: 16px;
        max-width: 100px;
        vertical-align: top;
        margin-left: 12px;
        transition: all 0.3s;
        display: inline-block;
      }
      &:hover {
        span {
          color: #1890ff;
        }
      }
    }
  }
}

.tagsTitle,
.teamTitle {
  font-weight: 500;
  color: rgba(0, 0, 0, 0.85);
  margin-bottom: 12px;
}
#col .happy-scroll-container {
  width: 300px;
  height: 460px;
}
#col .happy-scroll {
  width: 390px;
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
  width: 280px;
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
  width: 40px;
  height: 100%;
  margin-top: 20px;
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
