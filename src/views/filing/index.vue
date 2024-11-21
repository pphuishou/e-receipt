<script>
import { defineComponent, ref } from 'vue';
import { reqAddEhr } from '@/api/index.js';
import { useStore } from '@/store';
import { useRouter } from 'vue-router';
import './index.less';

export default defineComponent({
  setup() {
    const store = useStore();
    const router = useRouter();

    const idCard = ref('');
    const ehrLoading = ref(false);
    const idValidator = [{ required: true, message: '身份证号不能为空', trigger: 'onBlur' }, { pattern: /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/, message: '身份证号格式错误', trigger: 'onBlur' }]

    // 验证通过后提交绑定
    const handleAddFile = async () => {
      if (!idCard.value) return showToast({message: '请填写身份证号',position: 'top'});
      let idVali = idValidator[1].pattern;
      if (!idVali.test(idCard.value)) return showToast({message: '身份证号格式错误',position: 'top'});

      ehrLoading.value = true;
      let data = {
        openid: store.openid,
        id_card: idCard.value
      }
      const result = await reqAddEhr(data);
      
      if (result.code === 200) {
        showNotify({ type: 'success', message: '绑定成功' });
        store.setUserList();
        router.push('/fileList');
      } else {
        showDialog({ type: 'warning', message: result.msg });
      }
      ehrLoading.value = false;
    }
    return { idCard, idValidator, handleAddFile,ehrLoading };
  }
})

</script>

<template>
  <div class="filing">
    <van-form ref="form" class="id-input" validate-trigger="onSubmit" @submit.prevent="handleAddFile">
      <van-cell-group inset>
        <van-field
          v-model="idCard"
          label="身份证号："
          required
          placeholder="请输入身份证号"
          clearable
          :rules="idValidator"
          trigger="submit"
        />
      </van-cell-group>
      <div class="notice-text">
        <van-notice-bar :scrollable="false" left-icon="warning-o" wrapable text="温馨提示：请您仔细核对身份信息，添加的用户需满6个月后才可解绑，如果未达到6个月，可以联系佳医东城公众号客服进行解绑。" />
      </div>
    </van-form>
    <div class="confirms-button">
      <van-button native-type="submit" @click="handleAddFile" :disabled="ehrLoading" type="primary" size="normal" round plain>确认</van-button>
    </div>
  </div>
</template>

<style lang="less" scoped></style>
