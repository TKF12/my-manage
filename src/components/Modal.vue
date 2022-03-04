<template>
    <div class="Modal">
        <a-modal
            :title="model ? '添加商品类目' : '修改商品类目'"
            :visible="visible"
            :confirm-loading="confirmLoading"
            @ok="handleOk"
            @cancel="handleCancel"
        >
            <a-form-model
                ref="categoryForm"
                :model="form"
                :rules="rules"
                :label-col="labelCol"
                :wrapper-col="wrapperCol"
            >
                <a-form-model-item label="商品类目ID" prop="id">
                    <a-input v-model="form.id" :disabled="!model"/>
                </a-form-model-item>
                <a-form-model-item label="商品类目名称" prop="name">
                    <a-input v-model="form.name" />
                </a-form-model-item>
                <a-form-model-item label="商品子类目" prop="c_items">
                    <a-select
                        mode="tags"
                        v-model="form.c_items"
                        style="width: 100%"
                    >
                        <!-- <a-select-option value="包邮"> 包邮 </a-select-option> -->
                    </a-select>
                </a-form-model-item>
            </a-form-model>
        </a-modal>
    </div>
</template>
<script>
import api from '@/api/category';

export default {
  props: ['visible', 'form', 'model'],
  data() {
    return {
      labelCol: { span: 6 },
      wrapperCol: { span: 15 },
      confirmLoading: false,
      rules: {
        id: [
          {
            required: true,
            message: '请输入商品类目ID',
            trigger: 'blur',
          },
        ],
        name: [
          {
            required: true,
            message: '请输入商品类目名称',
            trigger: 'blur',
          },
        ],
        c_items: [
          {
            required: true,
            message: '请添加子类目',
            trigger: 'blur',
          },
        ],
      },
    };
  },
  methods: {
    // 提交
    handleOk() {
      this.confirmLoading = true;
      // 添加
      if (this.model) {
        this.$refs.categoryForm.validate((valid) => {
          if (valid) {
            api.addCategory(this.form).then(() => {
              this.$message.success('添加成功');
              this.confirmLoading = false;
              // 添加页面关闭
              this.$emit('showModal', false);
              // form清空，获取最新商品类目数据
              this.$emit('condition');
            }, (er) => {
              this.$message.error(er);
              this.confirmLoading = false;
            });
          } else {
            console.log('error submit!!');
          }
        });
      } else {
        api.editCategory(this.form).then(() => {
          this.confirmLoading = false;
          this.$message.success('修改成功');
          // 修改页面关闭
          this.$emit('showModal', false);
          // form清空，获取最新商品类目数据
          this.$emit('condition');
        }).catch((er) => {
          this.$message.error(er);
          this.confirmLoading = false;
        });
      }
    },
    // 关闭
    handleCancel() {
      // 页面关闭
      this.$emit('showModal', false);
      // form清空，获取最新商品类目数据
      this.$emit('condition');
    },
  },
};
</script>
