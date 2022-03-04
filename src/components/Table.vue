<template>
    <a-table
        :data-source="data"
        :columns="columns"
        :pagination="{ ...page ,pageSizeOptions: ['10', '20', '30', '40']}"
        @change="changePage"
        :rowKey="data => data.id"
        >
        <div slot="operation" slot-scope="text,record">
          <a-button style="margin-right: 3px" @click="edit(record)">编辑</a-button>
          <a-popconfirm
            :title="'是否删除 “'+(record.name || record.title)+'” '"
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

export default {
  props: ['data', 'page', 'columns'],
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
