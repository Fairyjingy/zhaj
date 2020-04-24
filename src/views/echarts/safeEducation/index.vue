<template>
<!-- 安全教育 -->
  <div>
    安全教育
  </div>
</template>

<script>
import commonFn from '@/common/js/util.js';
import qs from 'qs'
import {
    mapState,
} from "vuex";
const {
  formatDate2
} = commonFn
export default {
  data() {
      var user = sessionStorage.getItem('user');
      user = JSON.parse(user);
    return {
      clientHeight:"",
    };
  },
  mounted() {
    // this.getRoleList();

  },
  created() {
         var h=document.documentElement.clientHeight;
         console.log("h",h)
        this.clientHeight = h - 260;
  },
  methods: {
  }
};
</script>
<style scoped>
.textAlignLeft{
  text-align: left;
}
</style>
