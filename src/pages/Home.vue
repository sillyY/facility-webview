<template>
  <section class="pt14 pb14 pl48 pr48" >
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane name="local">
        <span slot="label">
          <i class="fas fa-folder-open"></i>
          本地资源
        </span>
        <Local />
      </el-tab-pane>
      <el-tab-pane name="online">
        <span slot="label">
          <i class="fas fa-globe"></i>
          网络资源(Beta)
        </span>
        <Online :sources="sources" />
      </el-tab-pane>
    </el-tabs>
  </section>
</template>
<script>
import axios from "axios";
import Local from "../components/local";
import Online from "../components/online";
import { remote, log } from "../services";
export default {
  name: "Home",
  components: {
    Local,
    Online
  },
  data() {
    return {
      activeName: "local",
      sources: []
    };
  },
  methods: {
    async requestSource() {
      try {
        const res = await axios.get(remote.config_url);
        return res.data;
      } catch (err) {
        log.error(err);
      }
    },
    parseSource(sources) {
      let result = {};

      let i = 0,
        len = sources.length;

      for (; i < len; i++) {
        let { title, description, source, name, content } = sources[i];
        content = content.replace(/\n/g, '<br/>').replace(/ /g, '&nbsp;');
        const extname = name.split(".")[1];
        if (result[extname]) {
          result[extname].libraries.push({
            title,
            description,
            source,
            content,
            name
          });
        } else {
          result[extname] = {
            title: extname.toUpperCase(),
            name: (Object.getOwnPropertyNames(result).length + 1).toString(),
            libraries: [
              {
                title,
                description,
                source,
                content,
                name
              }
            ]
          };
        }
      }

      return Object.values(result);
    },
    async getSource() {
      const data = await this.requestSource();
      this.sources = this.parseSource(data);
    },
    handleClick(tab) {
      if (tab.name === "online") this.getSource();
    }
  }
};
</script>