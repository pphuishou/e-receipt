<script>
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    const wxLogin = () => {
        let APP_ID = 'wx644f038767e2bab7';
        let REDIRECT_URI = `http://invoice.j1dc.cn/userBillList`;
        let path = encodeURIComponent(REDIRECT_URI);
        let url = "https://open.weixin.qq.com/connect/oauth2/authorize?" +
          "appid=" + APP_ID +
          "&redirect_uri=" + path +
          "&response_type=code" +
          "&scope=snsapi_userinfo" +
          "&state=comi" +
          "#wechat_redirect";
        window.location.href = url;
    }
    return { wxLogin }
  },
  mounted() {
    this.wxLogin();
  }
})
</script>

<template>
  <div>
    <van-empty image="network" description="请先登录" />
  </div>
</template>

<style scoped>

</style>
