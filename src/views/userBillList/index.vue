<script>
import { defineComponent, ref } from 'vue';
import { reqFileList } from '@/api/index.js';
import { useStore } from '@/store/index.js';
import { useRouter, useRoute } from 'vue-router';
import './index.less';

export default defineComponent({
  setup() {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();

    const active = ref(0);
    const billList = ref([]);
    const finished = ref(false);
    const showChangeUser = ref(false);

    // 异步切换tab
    const beforeChange = async (index) => {
      if(!store.userList.length) return false;
      showLoadingToast({
        message: '加载中...',
        forbidClick: true,
        duration: 0
      });
      return new Promise((resolve) => {
        let params = {
          id_card: store.userInfo.id_card,
          time_stamp: index || active.value,
          openid: store.openid
        }
        reqFileList(params).then(response => {
          billList.value = response.data?.data;
          resolve(true);
        }).finally(done => {
          closeToast();
          finished.value = true;
        })
      });
    }
    const handleTab = ({ name }) => {
      active.value = name;
    }
    const jumpFilePage = () => {
      router.push('/fileList');
    }
    // 切换使用人数据
    const changeUser = (index) => {
      store.changeShowUser(index);
      showChangeUser.value = false;
      beforeChange();
    }
    
    return {
      active,
      billList, 
      finished,
      handleTab,
      showChangeUser, 
      store, 
      jumpFilePage,
      route,
      changeUser,
      beforeChange,
    };
  },
  async mounted() {
    await this.store.getOpenId(this.route.query);
    await this.store.setUserList();
    this.beforeChange();
  },
})
</script>

<template>
  <div class="user-bill-list">
    <van-notice-bar text="仅可查看一年内的电子票据，请及时保存！"  left-icon="warning" :scrollable="false" wrapable />
    <div v-if="store.userList.length" class="user">
      <p>{{ store.userInfo.name }}</p>
      <van-button @click="showChangeUser = !showChangeUser" type="default" size="small" icon="sort">切换用户</van-button>
    </div>
    <div v-else class="user-empty">
      <van-space>
        <p>当前账号下无档案，去 </p>
        <van-button  @click="jumpFilePage" type="primary" plain icon="add">添加档案</van-button>
      </van-space>
    </div>
    <van-tabs v-model:active="active" @click-tab="handleTab" :before-change="beforeChange" swipeable class="tabs">
      <van-tab title="半年内" name="0"></van-tab>
      <van-tab title="一年内" name="1"></van-tab>
    </van-tabs>
    <div v-if="store.userList.length" class="bill-list">
      <van-list :finished="finished" finished-text="没有更多了">
        <a :href="item.pictureNetUrl" v-for="item in billList" :key="item.id" class="bill-item" >
          <div class="bill-item-left">
            <p class="pay-peo">
              <span>付款人：</span>
              <i>{{ store.userInfo.name }}</i>
            </p>
            <p class="pay-date">
              <span>开票日期：</span>
              <i>{{ item.createTime }}</i>
            </p>
          </div>
          <div class="bill-item-right">
            <p class="pay-preview">
              <span>票据预览</span>
              <van-icon name="arrow" />
            </p>
          </div>
        </a>
      </van-list>
    </div>
    <van-empty
      v-else
      image="https://fastly.jsdelivr.net/npm/@vant/assets/custom-empty-image.png"
      image-size="80"
      description="未查询到票据信息"
    />
    <van-action-sheet v-model:show="showChangeUser" title="切换用户">
      <van-cell-group>
          <van-cell v-for="(user, index) in store.userList" :key="user.id" @click="changeUser(index)" :title="user.name" class="choose-user">
            <template #title>
              <i>姓名：</i>
              <span class="custom-title">{{ user.name }}</span>
              <i>身份证号：</i>
              <span class="custom-title">{{ user.id_card_enc_short }}</span>
                <van-icon v-if="store.userIndex == index"  name="checked" class="check-icon" />
            </template>
          </van-cell>
      </van-cell-group>
      <van-button @click="jumpFilePage" round type="primary" size="normal" icon="plus" class="add-file"
        style="transform: translateX(50%); margin-bottom: 10px;">添加档案</van-button>
    </van-action-sheet>
  </div>
</template>

<style lang="less" scoped></style>
