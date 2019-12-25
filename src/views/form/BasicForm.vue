<template>

  <a-card :body-style="{padding: '24px 32px'}" :bordered="false">
    <a-form @submit="handleSubmit" :form="form">
      <a-form-item
        label="房源标题"
        :labelCol="{lg: {span: 7}, sm: {span: 7}}"
        :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
        <a-input
          v-decorator="[
            'name',
            {rules: [{ required: true, message: '给房源添加一个耳目一新的标题把~' }]}
          ]"
          name="name"
          placeholder="给房源添加一个耳目一新的标题把~" />
      </a-form-item>
      <a-form-item
        label="所在城市"
        :labelCol="{lg: {span: 7}, sm: {span: 7}}"
        :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
        <cn-region-picker
          v-model="liveCity"
          @on-pick-city="liveCity = $event"
        >
        </cn-region-picker>
      </a-form-item>
      <a-form-item
        label="想去的城市"
        :labelCol="{lg: {span: 7}, sm: {span: 7}}"
        :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
        <cn-region-picker
          v-model="wantCity"
          @on-pick-city="wantCity = $event"
        >
        </cn-region-picker>
      </a-form-item>
      <a-form-item
        label="起止日期"
        :labelCol="{lg: {span: 7}, sm: {span: 7}}"
        :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
        <a-range-picker
          name="buildTime"
          style="width: 100%"
          v-decorator="[
            'buildTime',
            {rules: [{ required: true, message: '请选择起止日期' }]}
          ]" />
      </a-form-item>
      <a-form-item
        label="房源描述"
        :labelCol="{lg: {span: 7}, sm: {span: 7}}"
        :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
        <a-textarea
          rows="4"
          placeholder="请输入房源描述"
          v-decorator="[
            'description',
            {rules: [{ required: true, message: '请输入房源描述' }]}
          ]" />
      </a-form-item>
      <a-form-item
        label="具体地址"
        :labelCol="{lg: {span: 7}, sm: {span: 7}}"
        :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
        <Amap></Amap>
      </a-form-item>
      <a-form-item
        label="空房个数"
        :required="true"
        :labelCol="{lg: {span: 7}, sm: {span: 7}}"
        :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
        <a-input-number :min="1" :max="10"/>
      </a-form-item>
      <a-form-item
        label="家庭人数"
        :required="true"
        :labelCol="{lg: {span: 7}, sm: {span: 7}}"
        :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
        <a-input-number :min="1" :max="10"/>
      </a-form-item>
      <a-form-item
        label="联系人电话"
        :labelCol="{lg: {span: 7}, sm: {span: 7}}"
        :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
        :required="true"
      >
        <a-input placeholder="请正确输入联系人电话" />
      </a-form-item>
      <a-form-item
        label="添加图片"
        :labelCol="{lg: {span: 7}, sm: {span: 7}}"
        :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
        :required="true"
      >
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
              <a-icon type="plus" style="margin-top:20px;"/>
              <div class="ant-upload-text">Upload</div>
            </div>
          </a-upload>
          <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
            <img alt="example" style="width: 100%" :src="previewImage" />
          </a-modal>
        </div>
      </a-form-item>
      <a-form-item
        label="目标公开"
        :labelCol="{lg: {span: 7}, sm: {span: 7}}"
        :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
        :required="false"
        help="所有人可换"
      >
        <a-radio-group v-model="value">
          <a-radio :value="1">全部</a-radio>
          <a-radio :value="'man'">男</a-radio>
          <a-radio :value="'women'">女</a-radio>
        </a-radio-group>
        <a-form-item>
          <a-select mode="tags" v-if="value === 2">
            <a-select-option value="4">大连民族大学</a-select-option>
            <a-select-option value="5">北京</a-select-option>
            <a-select-option value="6">2室</a-select-option>
          </a-select>
        </a-form-item>
      </a-form-item>
      <a-form-item
        :wrapperCol="{ span: 24 }"
        style="text-align: center"
      >
        <a-button htmlType="submit" type="primary">提交</a-button>
        <a-button style="margin-left: 8px">保存</a-button>
      </a-form-item>
    </a-form>
  </a-card>
</template>

<script>
import Amap from '@/components/Amap'
export default {
  name: 'BaseForm',
  components: {
    Amap
  },
  data () {
    return {
      wantCity: [],
      liveCity: [],
      pickCity: [],
      description: '注册房源即可让别人看到你的信息，方便匹配符合你要求的交换房源，并可选择部分公开',
      value: 1,
      previewVisible: false,
      previewImage: '',
      fileList: [
      ],
      // form
      form: this.$form.createForm(this)

    }
  },
  watch: {
  },
  methods: {
    handleCancel () {
      this.previewVisible = false
    },
    handlePreview (file) {
      this.previewImage = file.url || file.thumbUrl
      this.previewVisible = true
    },
    handleChange ({ fileList }) {
      for (let index = 0; index < fileList.length; index++) {
        if (fileList[index].error === true) {
          fileList.splice(index, 1)
        }
      }
      this.fileList = fileList
    },
    // handler
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          // eslint-disable-next-line no-console
          console.log('Received values of form: ', values)
        }
      })
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
    }
  }
}
</script>
<style>
  /* you can make up upload button and sample style by using stylesheets */
  .ant-upload-select-picture-card i {
    font-size: 32px;
    color: #999;
  }
  .outer .input-close[data-v-2d33bbf9] {
    padding-top:5px
  }
.picker-bg{
  overflow: hidden !important;
}
.picker-bg .picker .content .city .city-item {
    margin-bottom: 10px;
}
.picker-bg .picker .content .province {
    margin-bottom: 15px !important;
}
.picker-bg .picker .content {
    padding-top: 30px !important;
}
  .ant-upload-select-picture-card .ant-upload-text {
    margin-top: 8px;
    color: #666;
  }
</style>
