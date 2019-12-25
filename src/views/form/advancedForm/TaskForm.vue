<template>
  <a-form @submit="handleSubmit" :form="form" class="form">
    <a-row class="form-row" :gutter="16">
      <a-col :lg="6" :md="12" :sm="24">
        <a-form-item
          label="姓名">
          <a-input placeholder="姓名" v-decorator="[ 'name', {rules: [{ required: true, message: '请输入姓名', whitespace: true}]} ]" />
        </a-form-item>
      </a-col>
      <a-col :xl="{span: 7, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
        <a-form-item
          label="学校">
          <a-input placeholder="学校" v-decorator="[ 'school', {rules: [{ required: true, message: '请输入学校', whitespace: true}]} ]" />
        </a-form-item>
      </a-col>
      <a-col :xl="{span: 9, offset: 1}" :lg="{span: 10}" :md="{span: 24}" :sm="24">
        <a-form-item
          label="学号">
          <a-input placeholder="学号" v-decorator="[ 'no', {rules: [{ required: true, message: '请输入学号', whitespace: true}]} ]" />
        </a-form-item>
      </a-col>
    </a-row>
    <a-row class="form-row" :gutter="16">
      <a-col :lg="6" :md="12" :sm="24">
        <a-form-item
          label="年级">
          <a-select
            placeholder="请选择年级"
            v-decorator="[
              'approver2',
              {rules: [{ required: true, message: '请选择年级'}]}
            ]" >
            <a-select-option value="大一">大一</a-select-option>
            <a-select-option value="大二">大二</a-select-option>
            <a-select-option value="大三">大三</a-select-option>
          </a-select>
        </a-form-item>
      </a-col>
      <a-col :xl="{span: 9, offset: 1}" :lg="{span: 10}" :md="{span: 24}" :sm="24">
        <a-form-item
          label="专业">
          <a-input placeholder="专业" v-decorator="[ 'tel', {rules: [{ required: true, message: '请输入学号', whitespace: true}]} ]" />
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
  name: 'TaskForm',
  props: {
    showSubmit: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      form: this.$form.createForm(this)
    }
  },
  methods: {
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
    }
  }
}
</script>

<style scoped>

</style>
