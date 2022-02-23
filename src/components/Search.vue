<template>
    <div class="Search">
        <a-form layout="inline" @submit.native.prevent :form="formSearch" @submit="submitSearch">
            <a-form-item label="搜索关键字">
                <a-input
                    v-model="formSearch.searchWord"
                    placeholder="请输入搜索内容"
                >
                </a-input>
            </a-form-item>
            <a-form-item label="商品类目">
                <a-select
                    show-search
                    placeholder="选择"
                    style="width: 200px"
                    @change="handleChange"
                    :allowClear="true"
                >
                    <a-select-option
                        v-for="n in list"
                        :key="n.id"
                        :value="n.id">
                    {{n.name}}
                    </a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item>
                <a-button type="primary" html-type="submit"> 搜索 </a-button>
            </a-form-item>
        </a-form>
        <div class="add-commodity">
          <a-button type="primary" icon="medicine-box" size="large">
            添加商品
          </a-button>
        </div>
    </div>
</template>

<script>
// import api from '@/api/commodity';

export default {
  props: ['list'],
  data() {
    return {
      formSearch: {
        // 搜索内容
        searchWord: '',
        // 搜索类别
        category: '',
      },
    };
  },
  //   created() {
  //     // 获取商品类目数据
  //     api.search().then((da) => {
  //       this.categoryList = da.data;
  //     });
  //   },
  methods: {
    // 搜索提交
    submitSearch() {
      // 传递给父组件处理
      this.$emit('submit', this.formSearch);
    },
    // 商品类别
    handleChange(val) {
      // 保存当前选中的类别id
      this.formSearch.category = val;
    },
  },
};
</script>
<style lang="less">
.Search {
    padding: 10px 30px;
    form{
      float: left;
    }
    .add-commodity{
      float: right;
    }
    &::after{
      content: "";
      display: block;
      clear: both;
    }
}
</style>
