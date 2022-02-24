<template>
    <a-form-model
        ref="ruleForm"
        :model="form"
        :rules="rules"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
    >
        <a-form-model-item label="副标题" prop="title">
            <a-input v-model="form.title" />
        </a-form-model-item>
        <a-form-model-item label="商品描述" prop="desc">
            <a-input v-model="form.desc" type="textarea" />
        </a-form-model-item>
        <a-form-model-item label="商品类目" prop="category">
            <a-select
                v-model="form.category"
                placeholder="选择类目"
                @change="changeItem"
            >
                <a-select-option v-for="n in list" :key="n.id" :value="n.id">
                    {{ n.name }}
                </a-select-option>
            </a-select>
            <a-select v-model="form.c_items" placeholder="选择子类目">
                <a-select-option v-for="c in items" :key="c" :value="c">
                    {{ c }}
                </a-select-option>
            </a-select>
        </a-form-model-item>
        <a-form-model-item label="商品标签" prop="tags">
            <a-select
                mode="tags"
                v-model="form.tags"
                style="width: 100%"
                @change="handleChange"
            >
                <a-select-option value="包邮"> 包邮 </a-select-option>
            </a-select>
        </a-form-model-item>
    </a-form-model>
</template>
<script>
import api from '@/api/commodity';

export default {
  data() {
    return {
      list: [],
      items: [],
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      other: '',
      form: {
        title: '',
        desc: '',
        category: [],
        c_items: [],
        tags: ['包邮'],
      },
      // 校验规则
      rules: {
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' },
        ],
        category: [
          {
            required: false,
            message: '请选择类目',
            trigger: 'change',
          },
        ],
        tags: [{ required: true, message: '请选择类目' }],
      },
    };
  },
  methods: {
    changeItem(key) {
      for (let i = 0; i < this.list.length; i += 1) {
        if (this.list[i].id === key) {
          // 更新子选项数据
          this.items = this.list[i].c_items;
        }
        // 子选项是否有数据 没有则空
        if (this.items.length < 1) {
          this.form.c_items = [];
        }
      }
    },
    // 更新商品标签
    handleChange(value) {
      this.tags = value;
      //   console.log(value, option);
    },
    // onSubmit() {
    //   this.$refs.ruleForm.validate((valid) => {
    //     if (valid) {
    //       alert('submit!');
    //       return true;
    //     }
    //     console.log('error submit!!');
    //     return false;
    //   });
    // },
    resetForm() {
      this.$refs.ruleForm.resetFields();
    },
  },
  created() {
    api.search().then((rep) => {
      this.list = rep.data;
    });
  },
};
</script>
