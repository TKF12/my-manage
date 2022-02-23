<template>
    <a-table
        :columns="columns"
        :data-source="data"
        :pagination="{ ...page ,pageSizeOptions: ['10', '20', '30', '40']}"
        @change="changePage"
        :rowKey="data => data.id"
        >
        <div slot="operation" slot-scope="text,record">
          <a-button style="margin-right: 3px" @click="edit(record)">编辑</a-button>
          <a-popconfirm
            :title="'是否删除商品名为 “'+record.title+'” 的商品'"
            ok-text="是"
            cancel-text="否"
            @confirm="remove(record)">
            <a-button type="danger">
              删除
            </a-button>
          </a-popconfirm>
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
    // 绑定插槽
    scopedSlots: { customRender: 'operation' },
    width: 180,
    align: 'center',
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
    // 编辑商品
    edit(record) {
      this.$emit('edit', record);
    },
    // 删除
    remove(record) {
      this.$emit('remove', record);
    },
  },
};
</script>
