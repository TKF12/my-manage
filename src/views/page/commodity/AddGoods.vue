<template>
  <div class="Add-goods">
    <a-steps :current="current">
      <a-step v-for="item in steps" :key="item.title" :title="item.title" />
    </a-steps>
    <div class="steps-content">
       <Productinformation v-if="current===0" ref="ff" />
       <Salesinformation v-else-if="current===1" />
    </div>
    <div class="steps-action">
      <a-button v-if="current < steps.length - 1" type="primary"
                @click="next">
        下一步
      </a-button>
      <a-button
        v-if="current == steps.length - 1"
        type="primary"
        @click="$message.success('Processing complete!')"
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

export default {
  components: {
    Productinformation,
    Salesinformation,
  },
  data() {
    return {
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
  methods: {
    next() {
      this.$refs.ff.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.current += 1;
          return true;
        }
        return false;
      });
    },
    prev() {
      this.current -= 1;
    },
    changeshu() {

    },
  },
};
</script>
<style lang="less">
.Add-goods{
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
