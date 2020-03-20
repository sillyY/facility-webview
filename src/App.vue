<template>
  <div id="app">
      <Home />
  </div>
</template>

<script>
require("@/assets/css/reset.css");
require("@/assets/css/lib.css");
import Home from "./pages/Home";

export default {
  name: "Settings",
  components: {
    Home
  }
};
</script>
<style lang="scss">
.code {
  max-height: 400px;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 3px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #ccc;
  }
}
</style>

