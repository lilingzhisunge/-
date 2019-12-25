<template>
  <a-popover
    v-model="visible"
    trigger="click"
    placement="bottomRight"
    overlayClassName="header-notice-wrapper"
    :getPopupContainer="() => $refs.noticeRef.parentElement"
    :autoAdjustOverflow="true"
    :arrowPointAtCenter="true"
    :overlayStyle="{ width: '300px', top: '50px' }"
  >
    <template slot="content">
      <a-spin :spinning="loading">
        <a-tabs>
          <a-tab-pane tab="通知" key="1">
            <a-list>
              <a-list-item>
                <a-tooltip placement="left">
                  <template slot="title" >
                    杭州-南京互换申请对方已同意，请确定交款后，即可出发
                  </template>
                  <a-list-item-meta title="杭州-南京互换申请对方已同意，请确定交款后，即可出发" description="10分钟前">
                    <a-avatar style="background-color: white" slot="avatar" src="https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png"/>
                  </a-list-item-meta>
                </a-tooltip>
              </a-list-item>
              <a-list-item>
                <a-tooltip placement="left">
                  <template slot="title" >
                    杭州-南京申请成功，对方已收到，如若对方同意，交款后，即可出发
                  </template>
                  <a-list-item-meta title="杭州-南京申请成功，对方已收到，如若对方同意，交款后，即可出发" description="一天前">
                    <a-avatar style="background-color: white" slot="avatar" src="https://gw.alipayobjects.com/zos/rmsportal/OKJXDXrmkNshAMvwtvhu.png"/>
                  </a-list-item-meta>
                </a-tooltip></a-list-item>
              <a-list-item>
                <a-tooltip placement="left">
                  <template slot="title" >
                    有人访问过您杭州-南京交换
                  </template>
                  <a-list-item-meta title="有人访问过您杭州-南京交换" description="一天前">
                    <a-avatar style="background-color: white" slot="avatar" src="https://gw.alipayobjects.com/zos/rmsportal/kISTdvpyTAhtGxpovNWd.png"/>
                  </a-list-item-meta>
                </a-tooltip></a-list-item>
            </a-list>
          </a-tab-pane>
          <a-tab-pane tab="消息" key="2">
            <a-list @click="toMess()">
              <a-list-item>
                <a-list-item-meta title="邓伦给你发送消息" description="一分钟前">
                  <a-avatar style="background-color: white" slot="avatar" src="https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png"/>
                </a-list-item-meta>
              </a-list-item>
              <a-list-item>
                <a-list-item-meta title="秦尚城给你发送消息" description="40分钟前">
                  <a-avatar style="background-color: white" slot="avatar" src="https://gw.alipayobjects.com/zos/rmsportal/OKJXDXrmkNshAMvwtvhu.png"/>
                </a-list-item-meta>
              </a-list-item>
              <a-list-item>
                <a-list-item-meta title="炎亚纶给你发送消息" description="1小时前">
                  <a-avatar style="background-color: white" slot="avatar" src="https://gw.alipayobjects.com/zos/rmsportal/kISTdvpyTAhtGxpovNWd.png"/>
                </a-list-item-meta>
              </a-list-item>
            </a-list>
          </a-tab-pane>
          <a-tab-pane tab="待办" key="3">
            <a-list>
              <a-list-item @click="pay()">
                <a-list-item-meta title="您有一个待支付交换" description="一分钟前">
                  <a-avatar style="background-color: white" slot="avatar" src="https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png"/>
                </a-list-item-meta>
              </a-list-item>
              <a-list-item @click="apply()">
                <a-list-item-meta title="您有一个交换申请" description="5分钟前">
                  <a-avatar style="background-color: white" slot="avatar" src="https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png"/>
                </a-list-item-meta>
              </a-list-item>
              <a-list-item @click="comment()">
                <a-list-item-meta title="您有一个互换待评价" description="5分钟前">
                  <a-avatar style="background-color: white" slot="avatar" src="https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png"/>
                </a-list-item-meta>
              </a-list-item>
              <a-list-item @click="ask = !ask">
                <a-list-item-meta title="您有一个好友请求" description="5分钟前">
                  <a-avatar style="background-color: white" slot="avatar" src="https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png"/>
                </a-list-item-meta>
              </a-list-item>
            </a-list>
          </a-tab-pane>
        </a-tabs>
        <a-modal
          title=""
          v-model="ask"
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
            <a-button key="back" @click="handleCancel">拒绝</a-button>
            <a-button key="submit" type="primary" :loading="loading" @click="handleOk">
              同意
            </a-button>
          </template>
        </a-modal>
      </a-spin>
    </template>
    <span @click="fetchNotice" class="header-notice" ref="noticeRef">
      <a-badge count="12">
        <a-icon style="font-size: 16px; padding: 4px" type="bell" />
      </a-badge>
    </span>
  </a-popover>
</template>

<script>
export default {
  name: 'HeaderNotice',
  data () {
    return {
      tags: ['很有想法的', '专注设计', '辣~', '大长腿', '川妹子', '海纳百川'],
      loading: false,
      ask: false,
      visible: false
    }
  },
  methods: {
    comment () {
      this.$router.push('/calendar')
    },
    handleOk (e) {
      console.log(e)
      this.ask = false
      this.$message.success('添加好友成功')
    },
    handleCancel (e) {
      this.ask = false
      this.$message.success('拒绝成功，会通知对方')
    },
    apply () {
      this.$router.push('/form/apply-form')
    },
    toMess () {
      this.$router.push('/message')
    },
    pay () {
      this.$router.push('/form/step-form')
    },
    fetchNotice () {
      if (!this.visible) {
        this.loading = true
        setTimeout(() => {
          this.loading = false
        }, 500)
      } else {
        this.loading = false
      }
      this.visible = !this.visible
    }
  }
}
</script>

<style lang="css">
  .header-notice-wrapper {
    top: 50px !important;
  }
</style>
<style lang="less" scoped>
  .header-notice{
    display: inline-block;
    transition: all 0.3s;

    span {
      vertical-align: initial;
    }
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
    .ant-carousel  .slick-thumb li img {
    width: 60px;
    height: 100%;
    margin-top:10px;
    filter: grayscale(100%);
  }
  .ant-carousel  .slick-thumb li.slick-active img {
    filter: grayscale(0%);
  }
 .account-center-tags {
    .ant-tag {
      margin-bottom: 8px;
    }
  }
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
    margin-bottom: 24px;
    width: 480px;
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
    width: 40px;
    height: 100%;
    margin-top:20px;
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
