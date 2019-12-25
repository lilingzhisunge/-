<template>
  <div style="width:300px">
    <a-carousel autoplay arrows dotsClass="slick-dots slick-thumb" style="height:210px">
      <a slot="customPaging">
        <img :src="'https://gw.alipayobjects.com/zos/rmsportal/iXjVmWVHbCJAyqvDxdtx.png'" />
      </a>
      <div v-for="item in 4" :key="item.index">
        <img :src="'https://gw.alipayobjects.com/zos/rmsportal/iXjVmWVHbCJAyqvDxdtx.png'" />
      </div>
    </a-carousel>
    <a-row style="margin-top:30px;">
      <a-col :span="5" >
        <a-icon type="environment" />&nbsp;城市
      </a-col>
      <a-col :span="19">浙江省杭州市</a-col>
    </a-row>
    <a-row style="margin-top:20px;">
      <a-col :span="5" >
        <a-icon type="calendar" />&nbsp;时间
      </a-col>
      <a-col :span="19">2019-9-11&nbsp;到&nbsp;2019-9-14</a-col>
    </a-row>
    <a-row style="margin-top:20px;">
      <a-col :span="7" >
        <a-icon type="user" />&nbsp;家庭人数
      </a-col>
      <a-col :span="4">3</a-col>
      <a-col :span="6" >
        <a-icon type="home" />&nbsp;空房数
      </a-col>
      <a-col :span="5">2</a-col>
    </a-row>
    <a-row style="margin-top:20px;">
      <a-col :span="7" >
        <a-icon type="tag" />&nbsp;详细描述
      </a-col>
      <a-tooltip placement="top">
        <template slot="title">
          <span>住宅临近西湖景区，交通方便，周围有小吃街，万达商城，房间是小女儿的房间，平时都是她在收拾，家中有长辈，母亲在家，如果你要是来到我们家，我们肯定会像照顾女儿一样照顾你们的，女儿想去南京旅游，希望你们好好介绍一样，我也会给你们推荐我们的旅游景点</span>
        </template>
        <a-col
          :span="17"
          style="overflow: hidden;
text-overflow:ellipsis;
white-space: nowrap;"
        >住宅临近西湖景区，交通方便，周围有小吃街，万达商城，房间是小女儿的房间，平时都是她在收拾，家中有长辈，母亲在家，如果你要是来到我们家，我们肯定会像照顾女儿一样照顾你们的，女儿想去南京旅游，希望你们好好介绍一样，我也会给你们推荐我们的旅游景点</a-col>
      </a-tooltip>
    </a-row>
  </div>
</template>
<script>
export default {

}
</script>
<style lang="less" scoped>
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
