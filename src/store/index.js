import { defineStore } from "pinia";
import { reqWechatEhr } from '@/api/index.js';
import { reqOpenId } from "@/api";

export const useStore = defineStore('main', {
  state: () => {
    return {
      openid: sessionStorage.getItem('SETOPENID') || '',
      userList: [],
      userInfo: {},
      userIndex: 0
    }
  },
  getters: {},
  actions: {
    async getOpenId(params) {
      if (this.openid !== '') return;
      const result = await reqOpenId(params);
      if (result.code === 200) {
        sessionStorage.setItem('SETOPENID', result.data.openid);
        this.openid = result.data.openid;
      }
    },
    async setUserList() {
      const result = await reqWechatEhr(this.openid);
      if (result.code === 200) {
        // 缩短身份证号宽度
        this.userList = result.data.map(item => {
          item.id_card_enc_short = item.id_card_enc.replace('****', '');
          return item;
        });
        this.changeShowUser();
      }
    },
    changeShowUser(index = 0) {
      this.userIndex = index;
      this.userInfo = this.userList[index] || {};
    },
  }
})
