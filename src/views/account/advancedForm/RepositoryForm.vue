<template>
  <a-form @submit="handleSubmit" :form="form" class="form">
    <a-row class="form-row" :gutter="16">
      <a-col :lg="8" :md="12" :sm="24">
        <a-form-item label="标题" :required="true">

          <span v-if="!edit">{{ title }}</span>
          <a-input
            style="width:250px"
            v-if="edit"
            placeholder="请输入标题"
            v-model="title"
          />
        </a-form-item>
      </a-col>
      <a-col :xl="{span: 7, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
        <a-form-item
          :required="true"
          label="所在地"
          id="live">

          <span v-if="!edit">{{ liveCity[0].name }}</span>
          <cn-region-picker
            v-if="edit"
            :width="250"
            v-model="liveCity"
            @on-pick-city="liveCity = $event"
          >
          </cn-region-picker>
          <a-tag v-if="edit" >{{ liveCity[0].name }}</a-tag>
        </a-form-item>
      </a-col>
      <a-col :xl="{span: 7, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
        <a-form-item
          :required="true"
          label="交换期间">
          <span v-if="!edit">{{ startdate }} 到 {{ enddate }}</span>
          <a-range-picker
            v-if="edit"
            style="width:250px"
            :ranges="{ Today: [moment(), moment()], 'This Month': [moment(), moment().endOf('month')] }"
            showTime
            format="YYYY/MM/DD"
            @change="onChange"
          />
          <a-tag v-if="edit" >{{ startdate }} 到 {{ enddate }}</a-tag>
        </a-form-item>
      </a-col>
    </a-row>
    <a-row class="form-row" :gutter="16">
      <a-col :xl="{span: 9}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
        <a-form-item
          :required="true"
          label="想去的城市">
          <span v-if="!edit"><template v-for="city in wantCity">{{ city.name }}<br :key="city.index"></template></span>
          <cn-region-picker
            v-if="edit"
            v-model="wantCity"
            :width="250"
            @on-pick-city="wantCity = $event"
          >
          </cn-region-picker>
          <template v-for="city in wantCity" >
            <a-tag v-if="edit" :key="city.index">{{ city.name }}</a-tag>
          </template>
        </a-form-item>
      </a-col>
      <a-col :xl="{span: 8}" :lg="{span: 10}" :md="{span: 24}" :sm="24">
        <a-form-item
          :required="true"
          label="空房个数">
          <span v-if="!edit">{{ homenum }}</span>
          <a-input-number style="width:250px" v-if="edit" v-model="homenum" :min="1" :max="10"/>
        </a-form-item>
      </a-col>
      <a-col :xl="{span: 7}" :lg="{span: 10}" :md="{span: 24}" :sm="24">
        <a-form-item
          :required="true"
          label="家庭人数">
          <span v-if="!edit">{{ homepeo }}</span>
          <a-input-number
            v-if="edit"
            v-model="homepeo"
            :min="1"
            style="width:250px"
            :max="10"/>
        </a-form-item>
      </a-col>
    </a-row>
    <a-row class="form-row" :gutter="16">
      <a-col :xl="{span: 23}" :lg="{span: 10}" :md="{span: 24}" :sm="24">
        <a-form-item
          :required="true"
          label="房源描述"
        >
          <span v-if="!edit">{{ homedetails }}</span>
          <a-textarea
            rows="4"
            v-if="edit"
            placeholder="请输入房源描述"
            v-model="homedetails"
          />
        </a-form-item>

      </a-col>
    </a-row>
    <a-row>
      <a-col :xl="{span: 20}" :lg="{span: 10}" :md="{span: 24}" :sm="24">
        <a-form-item
          :required="true"
          label="具体地址">
          <span v-if="!edit">{{ address }}</span>

          <Amap v-if="edit" @fun="changeposi" :address="address"></Amap>
        </a-form-item>
      </a-col>
    </a-row>

    <a-row class="form-row" :gutter="16">
      <a-col :xl="{span: 24}" :lg="{span: 24}" :md="{span: 24}" :sm="24">
        <a-form-item
          :required="true"
          label="图片">
          <div class="clearfix">
            <a-upload
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              listType="picture-card"
              :fileList="fileList"
              @preview="handlePreview"
              :beforeUpload="beforeUpload"
              @change="handleChange"
            >
              <div v-if="fileList.length < 5">
                <a-icon type="plus" style="margin-top:35px;"/>
                <div class="ant-upload-text">Upload</div>
              </div>
            </a-upload>
            <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
              <img alt="example" style="width: 100%" :src="previewImage" />
            </a-modal>
          </div>
        </a-form-item>
      </a-col>

    </a-row>
    <a-form-item v-if="showSubmit">
      <a-button htmlType="submit" >Submit</a-button>
    </a-form-item>
  </a-form>
</template>

<script>
import Amap from '@/components/Amap'
import moment from 'moment'
export default {
  name: 'RepositoryForm',
  components: {
    Amap
  },
  props: {
    showSubmit: {
      type: Boolean,
      default: false
    },
    edit: {
      type: Boolean
    }
  },
  mounted () {

  },
  data () {
    return {
      previewVisible: false,
      previewImage: '',
      title: '杭州西湖旁的房子想去南京旅游',
      liveCity: [{ name: '杭州' }],
      wantCity: [{ name: '南京' }],
      startdate: '2019/09/12',
      enddate: '2019/09/22',
      homedetails: '住宅临近西湖景区，交通方便，周围有小吃街，万达商城，房间是小女儿的房间，平时都是她在收拾，家中有长辈，母亲在家，如果你要是来到我们家，我们肯定会像照顾女儿一样照顾你们的，女儿想去南京旅游，希望你们好好介绍一样，我也会给你们推荐我们的旅游景点',
      homenum: '2',
      homepeo: '2',
      address: '杭州西湖',
      fileList: [
      ],
      form: this.$form.createForm(this)
    }
  },

  // watch: {
  //   edit (newVal, oldVal) {
  //     if (newVal === true) {
  //       setTimeout(() => {
  //         this.form.setFieldsValue({
  //           title: this.title,
  //           time: this.time,
  //           homedetails: this.homedetails
  //         })
  //       }, 0)
  //     }
  //   }
  // },
  methods: {
    moment,
    changeposi (value) {
      this.address = value
    },
    handleCancel () {
      this.previewVisible = false
    },
    handlePreview (file) {
      this.previewImage = file.url || file.thumbUrl
      this.previewVisible = true
    },
    onChange (dates, dateStrings) {
      this.startdate = dateStrings[0]
      this.enddate = dateStrings[1]
    },
    beforeUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      if (!isJPG) {
        this.$message.error('你只能上传图片')
        file.error = true
      }
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('图片不能超过2mb')
        this.fileList.slice(-1)
        file.error = true
      }
      return isJPG && isLt2M
    },
    handleChange ({ fileList }) {
      for (let index = 0; index < fileList.length; index++) {
        if (fileList[index].error === true) {
          fileList.splice(index, 1)
        }
      }
      this.fileList = fileList
    },
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          this.$notification['error']({
            message: 'Received values of form:',
            description: values
          })
        }
      })
    },
    validate (rule, value, callback) {
      const regex = /^user-(.*)$/
      if (!regex.test(value)) {
        callback(new Error('需要以 user- 开头'))
      }
      callback()
    }
  }
}
</script>

<style scoped>
#live .outer .input-close{
  margin-left: 120px;
}
.picker-bg{
  overflow: hidden !important;
}
</style>
