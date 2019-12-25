<template>
  <a-form @submit="handleSubmit" :form="form" class="form">
    <a-row class="form-row" :gutter="16">
      <a-col :lg="6" :md="12" :sm="24">
        <a-form-item label="标题">
          <a-input
            placeholder="请输入标题"
            v-decorator="[
              'title',
              {rules: [{ required: true, message: '请输入标题', whitespace: true}]}
            ]" />
        </a-form-item>
      </a-col>
      <a-col :xl="{span: 7, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
        <a-form-item
          label="所在地">
          <a-input
            v-decorator="[
              'details',
              {rules: [{ required: true, message: '所在地' }]}
            ]"
            name="details"
            placeholder="所在地" />
        </a-form-item>
      </a-col>
      <a-col :xl="{span: 7, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
        <a-form-item
          label="交换期间">
          <a-range-picker
            style="width: 100%"
            v-decorator="[
              'dateRange',
              {rules: [{ required: true, message: '请选择生效日期'}]}
            ]" />
        </a-form-item>
      </a-col>
    </a-row>
    <a-row class="form-row" :gutter="16">
      <a-col :xl="{span: 7}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
        <a-form-item
          :required="true"
          label="想去的城市">
          <a-input
            v-decorator="[
              'want',
              {rules: [{ required: true, message: '想去的城市' }]}
            ]"
            name="want"
            placeholder="想去的城市" />
        </a-form-item>
      </a-col>
      <a-col :xl="{span: 3, offset: 1}" :lg="{span: 10}" :md="{span: 24}" :sm="24">
        <a-form-item
          :required="true"
          label="空房个数">
          <a-input-number :min="1" :max="10"/>
        </a-form-item>
      </a-col>
      <a-col :xl="{span: 3}" :lg="{span: 10}" :md="{span: 24}" :sm="24">
        <a-form-item
          :required="true"
          label="家庭人数">
          <a-input-number :min="1" :max="10"/>
        </a-form-item>
      </a-col>
    </a-row>
    <a-row class="form-row" :gutter="16">
      <a-col :xl="{span: 9}" :lg="{span: 10}" :md="{span: 24}" :sm="24">
        <a-form-item
          label="房源描述"
        >
          <a-textarea
            rows="4"
            placeholder="请输入房源描述"
            v-decorator="[
              'description',
              {rules: [{ required: true, message: '请输入房源描述' }]}
            ]" />
        </a-form-item>

      </a-col>

      <a-col :xl="{span: 9, offset: 1}" :lg="{span: 10}" :md="{span: 24}" :sm="24">
        <a-form-item
          label="具体地址">
          <a-textarea
            rows="4"
            placeholder="请输入具体地址"
            v-decorator="[
              'details',
              {rules: [{ required: true, message: '请输入具体地址' }]}
            ]" />
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
export default {
  name: 'RepositoryForm',
  props: {
    showSubmit: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      previewVisible: false,
      previewImage: '',
      fileList: [
      ],
      form: this.$form.createForm(this)
    }
  },
  methods: {
    handleCancel () {
      this.previewVisible = false
    },
    handlePreview (file) {
      this.previewImage = file.url || file.thumbUrl
      this.previewVisible = true
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

</style>
