<script setup lang="ts">
import { ref } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import { findWorker, type Worker } from '@/data/demo';
const worker = ref<Worker>();
onLoad(options => { worker.value = findWorker(String(options?.id || '')); });
function book() { if (worker.value) uni.navigateTo({ url: `/pages/booking/create?workerId=${encodeURIComponent(worker.value.id)}` }); }
function home() { uni.reLaunch({ url: '/pages/index/index' }); }
</script>
<template>
  <view class="page">
    <template v-if="worker">
      <view class="profile panel"><view class="profile-avatar" :style="{ background: worker.color }">{{ worker.initial }}</view><text class="title">{{ worker.name }}</text><text class="subtitle">{{ worker.category }} · {{ worker.languages }}</text><text class="tag">虚构演示人员</text></view>
      <text class="section-title">关于陪诊伙伴</text><view class="panel"><text class="body-copy">{{ worker.intro }}</text></view>
      <text class="section-title">服务内容</text><view class="panel"><view class="row between"><text class="service-title">{{ worker.category }}</text><text class="money">¥{{ worker.price }}</text></view><text class="subtitle">4 小时 · 演示价格</text><view class="service-points"><text>到院集合与流程梳理</text><text>候诊或检查流程陪同</text><text>结束前整理后续待办</text></view></view>
      <text class="section-title">可服务院区</text><view class="panel"><text v-for="campus in worker.campuses" :key="campus" class="campus">{{ campus }}</text></view>
      <view class="panel"><text class="service-title">预约后会发生什么？</text><text class="subtitle">平台先审核预约信息，再由你选择的陪诊师确认。若无法接单，需要你重新选择人员或时段。</text></view>
      <view class="notice">当前资料未接入真实人员审核、资质或评价系统。</view><button class="primary" @click="book">选择时间，填写预约</button>
    </template>
    <view v-else class="panel empty"><text>未找到该演示人员</text><button class="secondary back-button" @click="home">返回人员列表</button></view>
  </view>
</template>
<style scoped>
.profile { text-align: center; padding: 42rpx 26rpx; }.profile-avatar { width: 128rpx; height: 136rpx; display: flex; align-items: center; justify-content: center; border-radius: 30rpx; margin: 0 auto; font-size: 58rpx; }.profile .tag { margin-top: 20rpx; }.body-copy { font-size: 27rpx; line-height: 1.9; color: #586e60; }.service-title { font-weight: 600; font-size: 30rpx; }.service-points { border-top: 1rpx solid #e9eee5; margin-top: 24rpx; padding-top: 12rpx; }.service-points text { display: block; font-size: 26rpx; line-height: 2.2; color: #607363; }.campus { display: block; line-height: 2.2; font-size: 27rpx; }.back-button { margin-top: 30rpx; }
</style>
