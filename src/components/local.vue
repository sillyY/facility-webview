<template>
  <section class="auto w683">
    <el-upload
      class="upload upload-demo"
      action=""
      drag
      :before-upload="onBeforeUpload"
      :http-request="onUpload"
      multiple
    >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">
        将文件拖到此处，或
        <em>点击上传</em>
      </div>
      <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>
  </section>
</template>
<script>
import { event, log } from "../services";
export default {
  name: "Local",
  data() {
    return {
      status: false
    };
  },
  methods: {
    onBeforeUpload(file) {
      const { path } = file;
      event.fire(
        {
          cmd: "uploadFile",
          data: path
        },
        msg => {
          log.success(msg);
        }
      );
    },
    onUpload() {
      return false;
    }
  }
};
</script>
<style lang="scss" scoped>
.upload {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 421px;
  margin-top: 151px;
}
</style>