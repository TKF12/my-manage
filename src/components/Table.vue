<template>
    <a-table
        :columns="columns"
        :data-source="data"
        :pagination="{ ...page ,pageSizeOptions: ['10', '20', '30', '40']}"
        @change="changePage"
        :rowKey="data => data.id"
        >
        <div slot="operation">
        <a-button>编辑</a-button>
        <a-button>删除</a-button>
        </div>
    </a-table>
</template>
<script>
//         :rowKey="record => record.id"
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
    scopedSlots: { customRender: 'operation' },
  },
];

export default {
  props: ['data', 'page'],
  data() {
    return {
      columns,
    };
  },
  methods: {
    // 页码改变
    changePage(page) {
      this.$emit('changePage', page);
    },
  },
};
</script>
