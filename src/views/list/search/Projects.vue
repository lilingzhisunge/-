<template>
  <div style="padding:0px 25px 0px 0px;width:1140px">
    <a-card :bordered="false" class="ant-pro-components-tag-select">
      <a-form :form="form" layout="inline">
        <div class="page-menu-search">
          <a-input-search
            style="width: 80%; max-width: 522px;"
            placeholder="请输入你想去的城市或附近景点..."
            size="large"
            enterButton="搜索"
          />
        </div>
        <standard-form-row title="所属类目" block style="padding-bottom: 11px;">
          <a-form-item>
            <tag-select>
              <tag-select-option value="Category1">北京</tag-select-option>
              <tag-select-option value="Category2">上海</tag-select-option>
              <tag-select-option value="Category3">杭州</tag-select-option>
              <tag-select-option value="Category4">厦门</tag-select-option>
              <tag-select-option value="Category5">广州</tag-select-option>
              <tag-select-option value="Category6">南京</tag-select-option>
              <tag-select-option value="Category7">云南</tag-select-option>
            </tag-select>
          </a-form-item>
        </standard-form-row>

        <standard-form-row title="其它选项" grid last>
          <a-row>
            <a-col :lg="6" :md="10" :sm="10" :xs="24">
              <a-form-item :wrapper-col="{ sm: { span: 16 }, xs: { span: 24 } }" label="人口数">
                <a-input-number id="inputNumber" :min="1" :max="10" />
              </a-form-item>
            </a-col>
            <a-col :lg="6" :md="10" :sm="10" :xs="24">
              <a-form-item :wrapper-col="{ sm: { span: 16 }, xs: { span: 24 } }" label="空房数量">
                <a-input-number :min="1" :max="10" />
              </a-form-item>
            </a-col>
            <a-col :lg="8" :md="10" :sm="10" :xs="24">
              <a-form-item :wrapper-col="{ sm: { span: 16 }, xs: { span: 24 } }" label="所属学校">
                <a-input placeholder="所属学校" />
              </a-form-item>
            </a-col>

          </a-row>
        </standard-form-row>
      </a-form>
    </a-card>

    <div class="ant-pro-pages-list-projects-cardList">
      <a-list :loading="loading" :data-source="data" :pagination="pagination" :grid="{ gutter: 24, xl: 4, lg: 3, md: 3, sm: 2, xs: 1 }">
        <a-list-item slot="renderItem" slot-scope="item">
          <a-card class="ant-pro-pages-list-projects-card" hoverable @click="showdetail(item)">
            <img slot="cover" :src="item.cover" :alt="item.title" />
            <a-card-meta :title="item.title">
              <template slot="description">
                <ellipsis :length="50">{{ item.content }}</ellipsis>
              </template>
            </a-card-meta>
            <div class="cardItemContent">
              <span>{{ item.updatedAt | fromNow }}</span>
              <div class="avatarList">
                <avatar-list size="mini">
                  <avatar-list-item
                    v-for="(member, i) in item.members"
                    :key="`${item.id}-avatar-${i}`"
                    :src="member.avatar"
                    :tips="member.name"
                  />
                </avatar-list>

              </div>
            </div>
          </a-card>
        </a-list-item>
        <det v-if="visible" :avatar="details.members[0].avatar?details.members[0].avatar:''" :details="details" :visible="visible" :onClose="onClose"/>

      </a-list>
    </div>

  </div>

</template>

<script>
import moment from 'moment'
import Det from './components/Det'
import { TagSelect, StandardFormRow, Ellipsis, AvatarList } from '@/components'
const TagSelectOption = TagSelect.Option
const AvatarListItem = AvatarList.AvatarItem

export default {
  name: 'Search',
  components: {
    AvatarList,
    AvatarListItem,
    Ellipsis,
    TagSelect,
    TagSelectOption,
    StandardFormRow,
    Det
  },
  data () {
    return {
      data: [],
      visible: false,
      form: this.$form.createForm(this),
      loading: true,
      details: { members: [11] },
      pagination: {
        onChange: page => {
          console.log(page)
        },
        pageSize: 12
      }
    }
  },
  filters: {
    fromNow (date) {
      return moment(date).fromNow()
    }
  },
  mounted () {
    this.getList()
  },
  methods: {
    showdetail (item) {
      this.details = item
      this.visible = true
    },
    handleChange (value) {
    },
    getList () {
      this.$http.get('/list/article', { params: { count: 8 } }).then(res => {
        this.data = res.result
        this.loading = false
      })
    },
    onClose () {
      this.visible = false
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
