<script>
import { defineComponent, ref, computed } from 'vue';
import { useRouter } from 'vue-router'
import { reqUnbindFile } from '@/api'
import { useStore } from '@/store/index.js'
import './index.less';

export default defineComponent({
  setup() {
    const store = useStore();
    const router = useRouter();

    const offOrOn = ref('primary');
    const perDetailMap = [
      { title: '姓名', filed: 'name' },
      { title: '身份证号', filed: 'id_card_enc' },
      { title: '档案号', filed: 'client_id' },
    ]
    const usersCount = computed(() => {
      return store.userList.length === 6 ? 'info' : 'primary';
    })
    function addFile() {
      if (store.userList.length < 6) {
        router.push('/filing');
      } else {
        showFailToast({message: '当前绑定档案数量已达上限'});
        offOrOn.value = 'info';
      }
    }
    const handleUnbind = (id_card) => {
      showConfirmDialog({
      title: '提示',
      message:
        '确定要解绑吗？',
    })
      .then(async () => {
        let params = {
          openid: store.openid,
          id_card
        }
        const result = await reqUnbindFile(params);
        if (result.code === 200) {
          showNotify({ type: 'success', message: '解绑成功' });
          store.setUserList();
        } else {
          showNotify({ type: 'worning', message: result.msg });
        }
      })
    }
    return { addFile, perDetailMap, handleUnbind, store, usersCount, offOrOn }
  },
  mounted() {
    this.store.setUserList();
  },
  
});
</script>

<template>
  <div class="add-file">
    <van-notice-bar :scrollable="false" left-icon="warning-o" wrapable text="温馨提示：绑定六个月后才能进行解绑。一个账号仅可额外绑定5个档案。" class="notice-bar" />
    
    <div v-if="store.userList.length" class="people-list">
      <van-card v-for="person in store.userList" :key="person.id">
      <template #tags>
        <div class="bind-info">
          <p v-for="genera in perDetailMap" :key="genera.name">
            <span>{{ genera.title }}</span>：
            <i>{{ person[genera.filed] }}</i>
          </p>
        </div>
      </template>
      <template #footer>
        <div class="unbind-btn">
          <van-button v-if="person.show_state" @click="handleUnbind(person.id_card)" type="primary" plain size="small">解除绑定</van-button>
        </div>
      </template>
      </van-card>
    </div>
    <van-empty
      v-else
      image="https://fastly.jsdelivr.net/npm/@vant/assets/custom-empty-image.png"
      image-size="80"
      description="未查询到档案信息"
      class="empty-people-list"
    />

    <van-button @click="addFile" class="add-file-button" :type="usersCount" size="large" icon="add">添加档案</van-button>
  </div>

</template>

<style lang="less" scoped></style>
