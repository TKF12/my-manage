<template>
    <div class="Category">
        <div class="add-category">
              <a-button @click="visible = true,model=true"
              type="primary" icon="medicine-box" size="large">
                添加类目
              </a-button>
        </div>
        <Table
        :columns="columns"
        :page="page"
        :data="cateList"
        @changePage="setPage"
        @edit="editCategory"
        @remove="removeCategory"/>
        <Modal
        :form="form"
        :model="model"
        :visible="visible"
        @showModal="showVisible"
        @addSuccess="addSuccess"
        @condition="condition"/>
    </div>
</template>

<script>
import Table from '@/components/Table.vue';
import Modal from '@/components/Modal.vue';
import api from '@/api/category';

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
  },
  {
    title: '名称',
    dataIndex: 'name',
  },
  {
    title: '操作',
    dataIndex: 'operation',
    scopedSlots: { customRender: 'operation' },
    align: 'center',
  },
];
export default {
  components: {
    Table,
    Modal,
  },
  data() {
    return {
      // true是添加，false是修改
      model: true,
      // 添加或修改是否显示
      visible: false,
      columns,
      // 数据
      form: {
        id: '',
        name: '',
        c_items: [],
      },
      // 所有商品类目
      cateList: [],
      page: {
        // 当前页码
        current: 1,
        // 页容量
        pageSize: 10,
        // 是否可以改变 pageSize
        showSizeChanger: true,
        // 商品类目总数
        total: 0,
      },
    };
  },
  created() {
    // 获取数据
    this.getTable();
  },
  methods: {
    // 添加或修改页面 是否显示
    showVisible(show) {
      this.visible = show;
    },
    // 获取所有商品类目数据
    getTable() {
      api.categoryList({
        // 当前页
        page: this.page.current,
        // 页容量
        size: this.page.pageSize,
      }).then((rep) => {
        // 更新商品类目数据
        this.cateList = rep.data;
        // 更新商品类目总数
        this.total = rep.total;
      });
    },
    setPage(page) {
      // 更新当前页
      this.page.current = page.current;
      // 更新页容量
      this.page.pageSize = page.pageSize;
      // 获取获取商品列表数据
      this.getTable();
    },
    // 更新数据
    condition() {
      // 清除数据
      this.form = { id: '', name: '', c_items: [] };
      // 获取商品类目数据
      this.getTable();
    },
    // 商品类目编辑
    editCategory(record) {
      // 标题为修改
      this.model = false;
      // 修改页面显示·
      this.visible = true;
      // 当前编辑的数据
      this.form = { ...record };
    },
    // 商品类目删除
    removeCategory(record) {
      api.deleteCategory(record.id).then(() => {
        this.$message.success('删除成功');
        // 获取商品类目数据
        this.getTable();
      });
    },
  },
};
</script>

<style lang="less">
.add-category{
    margin: 20px;
}
</style>
