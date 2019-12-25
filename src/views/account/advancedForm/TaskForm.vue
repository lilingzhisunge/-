<template>
  <a-form @submit="handleSubmit" :form="form" class="form">
    <a-row class="form-row" :gutter="16">
      <a-col :lg="6" :md="12" :sm="24">
        <a-form-item
          label="姓名"
          :required="true">
          <span v-if="!schedit">{{ name }}</span>
          <a-input v-if="schedit" placeholder="姓名" v-model="name"/>
        </a-form-item>
      </a-col>
      <a-col :xl="{span: 7, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
        <a-form-item
          label="学校"
          :required="true">
          <span v-if="!schedit">{{ school }}</span>

          <a-input v-if="schedit" placeholder="学校" v-model="school" />
        </a-form-item>
      </a-col>
      <a-col :xl="{span: 7, offset: 1}" :lg="{span: 10}" :md="{span: 24}" :sm="24">
        <a-form-item
          label="学号"
          :required="true">
          <span v-if="!schedit">{{ no }}</span>

          <a-input v-if="schedit" placeholder="学号" v-model="no" />
        </a-form-item>
      </a-col>
    </a-row>
    <a-row class="form-row" :gutter="16">
      <a-col :lg="6" :md="12" :sm="24">
        <a-form-item
          label="年级"
          :required="true">
          <span v-if="!schedit">{{ approver2 }}</span>
          <a-select
            v-if="schedit"
            placeholder="请选择年级"
            v-model="approver2">
            <a-select-option value="大一">大一</a-select-option>
            <a-select-option value="大二">大二</a-select-option>
            <a-select-option value="大三">大三</a-select-option>
          </a-select>
        </a-form-item>
      </a-col>
      <a-col :xl="{span: 7, offset: 1}" :lg="{span: 10}" :md="{span: 24}" :sm="24">
        <a-form-item
          label="专业"
          :required="true">
          <span v-if="!schedit">{{ tel }}</span>

          <a-input v-if="schedit" placeholder="专业" v-model="tel" />
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
    },
    schedit: {
      type: Boolean
    }
  },
  data () {
    return {
      form: this.$form.createForm(this),
      approver2: '大四',
      name: '秦尚城',
      school: '大连民族大学',
      no: '2016081211',
      tel: '计算机科学与技术'
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
