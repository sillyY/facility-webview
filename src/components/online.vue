<template>
  <section>
    <el-tabs class="menus" v-model="editableTabsValue" tab-position="left">
      <el-tab-pane
        :key="index"
        v-for="(item, index) in sources"
        :label="item.title"
        :name="item.name"
      >
        <div class="container">
          <el-card class="card rel" v-for="(value, key) in item.libraries" :key="key">
            <div slot="header" class="clearfix">
              <span>{{value.title}}</span>
              <el-button
                size="mini"
                style="float: right; padding: 3px 0"
                type="text"
                @click="onAddClick(value)"
              >添加</el-button>
            </div>
            <div>{{value.description}}</div>
            <div class="bottom">
              <p class="l">来源: {{ value.source }}</p>
              <el-popover
                popper-class="popper"
                placement="right"
                :title="value.title"
                width="320"
                trigger="click"
                :visible-arrow="true"
              >
                <p v-html="value.content" class="code"></p>
                <el-button class="r" size="mini" type="text" slot="reference">查看</el-button>
              </el-popover>
            </div>
          </el-card>
        </div>
      </el-tab-pane>
    </el-tabs>
  </section>
</template>
<script>
import { event, log } from "../services";
export default {
  name: "Online",
  data() {
    return {
      editableTabsValue: "1",
      tabIndex: 2
    };
  },
  props: {
    sources: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  methods: {
    onAddClick(data) {
      event.fire(
        {
          cmd: "addSource",
          data
        },
        msg => {
          log.success(msg);
        }
      );
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  display: grid;
  grid-template-rows: repeat(4, 24%);
  grid-template-columns: repeat(4, 24%);
  grid-gap: 40px 20px;
  min-height: 840px;
  padding: 0 33px;
  .card {
    position: relative;
    .content {
      position: absolute;
      top: 0;
      right: 20px;
      width: 100%;
      min-height: 64px;
      z-index: 1;
      background-color: red;
      color: #fff;
    }
  }

  .bottom {
    box-sizing: content-box;
    position: absolute;
    bottom: 0;
    left: 0;
    width: calc(100% - 20px);
    padding: 5px 10px;
    p {
      font-size: 12px;
      color: #999;
      line-height: 17px;
      padding: 7px 0;
    }
  }
}
</style>