<template>
    <div>
        <Search @submit="changeSearch" :list="categoryList" />
        <Table
        :data="tableData"
        :page="page"
        @changePage="setPage"
        @edit="editItem"
        @remove="removeItem"
        :columns="columns" />
    </div>
</template>

<script>
import Search from '@/components/Search.vue';
import Table from '@/components/Table.vue';
import api from '@/api/commodity';

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    // key: 'id',
  },
  {
    title: '标题',
    dataIndex: 'title',
    // key: 'title',
  },
  {
    title: '描述',
    dataIndex: 'desc',
    // key: 'desc',
  },
  {
    title: '类目',
    dataIndex: 'categoryName',
    // key: 'category',
  },
  {
    title: '预售价格',
    dataIndex: 'price',
    // key: 'price',
  },
  {
    title: '折扣价格',
    dataIndex: 'price_off',
    // key: 'price_off',
  },
  {
    title: '标签',
    dataIndex: 'tags',
    // key: 'tags',
  },
  {
    title: '限制购买数量',
    dataIndex: 'inventory',
    // key: 'inventory',
  },
  {
    title: '上架状态',
    dataIndex: 'status',
    // 当前行数据
    customRender: (text, record) => (record.status === 0 ? '未上架' : '已上架'),
    // key: 'status',
  },
  {
    title: '操作',
    dataIndex: 'operation',
    // key: 'operation',
    // 绑定插槽
    scopedSlots: { customRender: 'operation' },
    width: 180,
    align: 'center',
  },
];

export default {
  components: {
    Search,
    Table,
  },
  data() {
    return {
      columns,
      // 商品列表
      tableData: [],
      // 搜索内容
      searchData: {},
      // 商品类目
      categoryList: [],
      // 商品类目下标从1开始
      categoryObject: {},
      // 全部商品类目名称
      liId: [],
      page: {
        // 当前页码
        current: 1,
        // 页容量
        pageSize: 10,
        // 是否可以改变 pageSize
        showSizeChanger: true,
        // 页码总数
        total: 0,
      },
    };
  },
  async created() {
    // 获取商品类目数据
    await api.search().then((da) => {
      this.categoryList = da.data;
      // 让categoryList的数组下标从1开始
      da.data.forEach((rep) => {
        this.categoryObject[rep.id] = rep;
      });
    });
    // 获取商品列表数据
    this.getTable();
  },
  methods: {
    // 搜索事件
    changeSearch(data) {
      // 更新搜索类别数据
      this.searchData = data;
      // 获取最新数据
      this.getTable();
    },
    // 获取商品列表数据
    getTable() {
      api.respTable({
        page: this.page.current,
        size: this.page.pageSize,
        ...this.searchData,
      }).then((data) => {
        // 更新商品列表数据
        this.tableData = data.data.map((rep) => ({
          ...rep,
          // 商品类目名称
          categoryName: this.categoryObject[rep.category].name,
        }));
        // 更新总页数
        this.page.total = data.total;
      });
    },
    // 更新页码
    setPage(page) {
      // 更新当前页
      this.page.current = page.current;
      // 更新页容量
      this.page.pageSize = page.pageSize;
      // 获取获取商品列表数据
      this.getTable();
    },
    // 编辑商品
    editItem(record) {
      this.$router.push({
        name: 'EditItem',
        params: {
          Id: record.id,
        },
      });
    },
    // 删除商品
    removeItem(record) {
      // console.log(record);
      api.deleteItem(record.id).then(() => {
        // 获取最新数据
        this.getTable();
      });
    },
  },
};
</script>

<style>
</style>
