<template>
        <a-form-model
            :model="form"
            :rules="rules"
            :label-col="labelCol"
            :wrapper-col="wrapperCol"
        >
            <a-form-model-item label="商品售价" prop="price">
                <a-input v-model="form.price" />
            </a-form-model-item>
            <a-form-model-item label="商品折扣价" prop="price_off">
                <a-input v-model="form.price_off"/>
            </a-form-model-item>
            <a-form-model-item label="商品库存" prop="inventory">
                <a-input v-model="form.inventory"/>
            </a-form-model-item>
            <a-form-model-item label="计量单位" prop="unit">
                <a-input v-model="form.unit"/>
            </a-form-model-item>
                <div class="clearfix">
                    <a-upload
                        :action="'https://mallapi.duyiedu.com/upload/images?appkey=' + $store.state.user.appkey"
                        list-type="picture-card"
                        :file-list="fileList"
                        @preview="handlePreview"
                        @change="handleChange"
                        name="avatar"
                    >
                        <div v-if="fileList.length < 8">
                            <a-icon type="plus" />
                            <div class="ant-upload-text">添加图片</div>
                        </div>
                    </a-upload>
                    <a-modal
                        :visible="previewVisible"
                        :footer="null"
                        @cancel="handleCancel"
                    >
                        <img
                            alt="example"
                            style="width: 100%"
                            :src="previewImage"
                        />
                    </a-modal>
                </div>
        </a-form-model>
</template>
<script>
import product from '@/utils/product';

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}
export default {
  props: ['form'],
  data() {
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      other: '',
      // 校验规则
      rules: {
        price: [{
          required: true,
          trigger: 'blur',
          transform: (value) => {
            if (!value.length) {
              this.form.price = 0;
            }
            return Number(value);
          },
          validator: (rule, value, callback) => product(value, callback, '输入格式不正确，请输入数字', '价格不能小于0'),
        }],
        price_off: [{
          required: false,
          trigger: 'blur',
          transform: (value) => value.length && Number(value),
          validator: (rule, value, callback) => product(value, callback, '输入格式不正确，请输入数字', '折扣不能小于0'),
        }],
        inventory: [{
          required: true,
          trigger: 'blur',
          transform: (value) => {
            if (!value.length) {
              this.form.inventory = 0;
            }
            return Number(value);
          },
          validator: (rule, value, callback) => product(value, callback, '输入格式不正确，请输入数字'),
        }],
        unit: [{ required: true, message: '请填写计量单位', trigger: 'blur' }],
      },
      // 是否正在加载中
      previewVisible: false,
      // 图片路径
      previewImage: '',
      // 图片预览列表
      fileList: [],
    };
  },
  created() {
    const { Id } = this.$route.params;
    // 编辑页面
    if (Id) {
      this.fileList = this.form.images.map((item, i) => ({
        uid: i,
        name: `image${i}.png`,
        status: 'done',
        url: item,
      }));
    }
  },
  methods: {
    handleCancel() {
      this.previewVisible = false;
    },
    // 点击文件链接或预览图标时的回调
    async handlePreview(file) {
      const obj = file;
      if (!obj.url && !obj.preview) {
        obj.preview = await getBase64(obj.originFileObj);
      }
      this.previewImage = obj.url || obj.preview;
      this.previewVisible = true;
    },
    // 上传中、完成、失败都会调用这个函数。
    handleChange({ file, fileList }) {
      // 更新显示图片列表
      this.fileList = fileList;
      // 图片上传成功
      if (file.status === 'done') {
        // 添加提交的图片
        this.form.images.push(file.response.data.url);
      // 删除提交图片
      } else if (file.status === 'removed') {
        console.log('删除');
        this.form.images = this.form.images.filter((item) => item !== file.response.data.url);
      }
    },
  },
};
</script>

<style lang="less">
.clearfix {
  padding: 0 100px;
}
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>
