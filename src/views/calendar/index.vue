<template>
  <a-card>
    <template slot="title">
      <a-popover placement="bottom">
        <template slot="content">
          <div style="width:400px">
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
                @click="chat()"
              >发消息</a-button>
            </a-row>
          </div></template>
        杭州-南京
      </a-popover>
    </template>
    <a-row>
      <a-col :span="20">
        <a-calendar>
          <ul class="events" slot="dateCellRender" slot-scope="value">
            <li v-for="item in getListData(value)" :key="item.content">
              <a-badge :status="item.type" :text="item.content" />
            </li>
          </ul>
          <template slot="monthCellRender" slot-scope="value">
            <div v-if="getMonthData(value)" class="notes-month">
              <section>{{ getMonthData(value) }}</section>
              <span>Backlog number</span>
            </div>
          </template>
        </a-calendar>
      </a-col>
      <a-col :span="3" :offset="1">
        <a-timeline style="margin-top:20px">
          <a-timeline-item color="green">您已付款成功，等待对方付款 <br>2019-09-01</a-timeline-item>
          <a-timeline-item color="green">对方付款成功 <br>2019-09-01</a-timeline-item>
          <a-timeline-item>互换开始 <br>2019-09-03</a-timeline-item>
          <a-timeline-item>互换结束 <br>2019-09-09</a-timeline-item>
          <a-timeline-item color="green">您的押金已还到您的账号您，请查看 <br>2019-09-09</a-timeline-item>
          <a-timeline-item color="red">待评价 <br>2019-09-10</a-timeline-item>
        </a-timeline>
      </a-col>
    </a-row>
    <a-row style="margin-bottom:30px">
      <template v-for="(tag, index) in tags">
        <a-tooltip v-if="tag.length > 20" :key="tag" :title="tag">
          <a-tag
            color="#2db7f5"
            :key="tag"
            :closable="index !== 0"
            :afterClose="() => handleTagClose(tag)"
          >{{ `${tag.slice(0, 20)}...` }}</a-tag>
        </a-tooltip>
        <a-tag
          color="#2db7f5"
          v-else
          :key="tag"
          :closable="index !== 0"
          :afterClose="() => handleTagClose(tag)"
        >{{ tag }}</a-tag>
      </template>
      <a-input
        v-if="tagInputVisible"
        ref="tagInput"
        type="text"
        size="small"
        :style="{ width: '78px' }"
        :value="tagInputValue"
        @change="handleInputChange"
        @blur="handleTagInputConfirm"
        @keyup.enter="handleTagInputConfirm"
      />
      <a-tag v-else @click="showTagInput" style="background: #fff; borderStyle: dashed;">
        <a-icon type="plus"/>New Tag
      </a-tag>
    </a-row>
    <a-row >
      <comment></comment>
    </a-row>
  </a-card>
</template>
<script>
import comment from '@/components/comment'
export default {
  components: {
    comment
  },
  data () {
    return {
      tags: ['温馨', '实惠', '舒适', '方便得多', '下次还会来', '主人很热情'],
      tagInputVisible: false,
      tagInputValue: ''
    }
  },
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
    },
    chat () {
      this.$router.push('/message')
    },
    getListData (value) {
      let listData
      switch (value.date()) {
        case 8:
          listData = [
            { type: 'warning', content: '开始' }
          ]; break
        case 10:
          listData = [
            { type: 'warning', content: '结束' }
          ]; break
        default:
      }
      return listData || []
    },

    getMonthData (value) {
      if (value.month() === 8) {
        return 1394
      }
    } } }
</script>
<style lang="less" scoped>
.events {
  list-style: none;
  margin: 0;
  padding: 0;
}
.events .ant-badge-status {
  overflow: hidden;
  white-space: nowrap;
  width: 100%;
  text-overflow: ellipsis;
  font-size: 12px;
}
.notes-month {
  text-align: center;
  font-size: 28px;
}
.notes-month section {
  font-size: 28px;
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
  width: 200px;
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
