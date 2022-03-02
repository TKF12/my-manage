<template>
    <a-form-model
        ref="ruleForm"
        :model="form"
        :rules="rules"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
    >
        <a-form-model-item label="商品标题" prop="title">
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
            <a-select
                    show-search
                    placeholder="选择子类目"
                    :allowClear="true"
                    :filter-option="filterOption"
                    v-model="form.c_items"
                >
                    <a-select-option
                        v-for="n in items"
                        :key="n"
                        :value="n"
                    >
                        {{ n }}
                    </a-select-option>
                </a-select>
            <!-- <a-select v-model="form.c_items" placeholder="选择子类目">
                <a-select-option v-for="c in items" :key="c" :value="c">
                    {{ c }}
                </a-select-option>
            </a-select> -->
        </a-form-model-item>
        <a-form-model-item label="商品标签" prop="tags">
            <a-select
                mode="tags"
                v-model="form.tags"
                style="width: 100%"
            >
                <!-- <a-select-option value="包邮"> 包邮 </a-select-option> -->
            </a-select>
        </a-form-model-item>
    </a-form-model>
</template>
<script>
import api from '@/api/commodity';

export default {
  props: ['form'],
  data() {
    return {
      // 商品类目
      list: [],
      // 子子类目
      items: [],
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      // 校验规则
      rules: {
        title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
        category: [{ required: true, message: '请选择类目', trigger: 'change' }],
        tags: [{ required: true, message: '请选择类目' }],
      },
    };
  },
  methods: {
    filterOption(input, option) {
      return option.componentOptions.children[0].text
        .toLowerCase().indexOf(input.toLowerCase()) >= 0;
    },
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
  },
  created() {
    api.search().then((rep) => {
      this.list = rep.data;
    });
  },
};
</script>
