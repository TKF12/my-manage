<template>
    <div class="Add-goods">
        <a-steps :current="current">
            <a-step
                v-for="item in steps"
                :key="item.title"
                :title="item.title"
            />
        </a-steps>
        <div class="steps-content">
            <Productinformation
                v-if="current === 0"
                ref="productinForm"
                :form="form"
            />
            <Salesinformation v-else-if="current === 1" ref="salesinForm" :form="form"/>
        </div>
        <div class="steps-action">
            <a-button
                v-if="current < steps.length - 1"
                type="primary"
                @click="next"
            >
                下一步
            </a-button>
            <a-button
                v-if="current == steps.length - 1"
                type="primary"
                @click="addProduct"
            >
                提交
            </a-button>
            <a-button v-if="current > 0" style="margin-left: 8px" @click="prev">
                上一步
            </a-button>
        </div>
    </div>
</template>
<script>
import Productinformation from '@/components/Productinformation.vue';
import Salesinformation from '@/components/Salesinformation.vue';
import api from '@/api/commodity';

export default {
  components: {
    Productinformation,
    Salesinformation,
  },
  data() {
    return {
      form: {
        title: '',
        desc: '',
        category: [],
        c_item: [],
        tags: ['包邮'],
        // 商品价格
        price: 0,
        // 折扣价
        price_off: '',
        // 计量单位
        unit: '',
        // 商品已上传图片
        images: [],
        // 库存
        inventory: 0,
      },
      current: 0,
      steps: [
        {
          title: '填写商品基本信息',
        },
        {
          title: '填写商品销售信息',
        },
      ],
    };
  },
  created() {
    const { Id } = this.$route.params;
    // 是编辑页
    if (Id) {
      api.queryProduct(Id).then((rep) => {
        this.form = rep;
      });
    }
  },
  watch: {
    '$route.name': function (newVal) {
      // 是添加页面 重置表单
      // this.$options.data() 组件初始化数据
      if (newVal === 'AddGoods') {
        Object.assign(this.$data, this.$options.data());
      }
    },
  },
  methods: {
    // 下一步
    next() {
      this.$refs.productinForm.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.current += 1;
          // 存储商品信息数据
          this.form = { ...this.$refs.productinForm.form };
          return true;
        }
        return false;
      });
    },
    // 上一步
    prev() {
      this.current -= 1;
      // 存储商品销售信息
      this.form = { ...this.form, ...this.$refs.salesinForm.form };
    },
    // 提交
    addProduct() {
      const { Id } = this.$route.params;
      // 编辑页
      if (Id) {
        api.editProduct(this.form).then(() => {
          this.$message.success('商品修改成功');
          this.$router.push({ name: 'ProductList' });
        });
      } else {
        api.addItem(this.form).then(() => {
          this.$message.success('添加商品成功');
          this.$router.push({ name: 'ProductList' });
        });
      }
    },
  },
};
</script>
<style lang="less">
.Add-goods {
    width: 50%;
    margin: 20px auto;
}
.steps-content {
    margin-top: 16px;
    border: 1px dashed #e9e9e9;
    border-radius: 6px;
    background-color: #fafafa;
    min-height: 200px;
    text-align: center;
    padding-top: 80px;
}

.steps-action {
    margin-top: 24px;
}
</style>
