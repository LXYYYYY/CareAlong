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
  <view class="page page-with-action">
    <template v-if="worker">
      <view class="profile panel"><view class="row profile-top"><view class="avatar" :style="{ background: worker.color }">{{ worker.initial }}</view><view class="profile-main"><view class="row"><text class="worker-name">{{ worker.name }}</text><text class="example">示例人员</text></view><text class="language">{{ worker.languages }}</text><text class="tag">{{ worker.category }}</text></view></view><text class="body-copy">{{ worker.intro }}</text></view>
      <view class="panel"><text class="section-title">服务内容</text><view class="row between"><text>{{ worker.category }}</text><text class="duration">4 小时 / 次</text></view><view class="service-points"><view><text class="point-number">01</text><text>到院集合，梳理就诊流程</text></view><view><text class="point-number">02</text><text>陪同候诊或完成检查流程</text></view><view><text class="point-number">03</text><text>整理服务结束后的待办事项</text></view></view></view>
      <view class="panel campus-panel"><text class="section-title">服务院区</text><view v-for="campus in worker.campuses" :key="campus" class="campus-row"><view class="location-dot" /><text>{{ campus }}</text></view></view>
      <view class="panel"><text class="section-title">预约须知</text><view class="booking-steps"><text>提交申请</text><text class="step-arrow">›</text><text>管理员审核</text><text class="step-arrow">›</text><text>陪诊师确认</text></view><text class="body-copy instructions">审核通过并由陪诊师确认后，预约才生效。无法接单时，需重新选择人员或时段。</text></view>
      <view class="notice">演示资料与价格，尚未接入真实人员、资质或评价。</view>
      <view class="action-bar"><view class="action-content"><view class="action-price"><view><text class="money"><text class="currency">¥</text>{{ worker.price }}</text><text class="muted-inline"> / 次</text></view><text class="muted">4 小时 · 演示价</text></view><button class="primary" @click="book">立即预约</button></view></view>
    </template>
    <view v-else class="panel empty"><text>未找到该演示人员</text><button class="secondary back-button" @click="home">返回人员列表</button></view>
  </view>
</template>
<style scoped>
.profile-top { gap: 24rpx; margin-bottom: 24rpx; }.profile-main { flex: 1; }.worker-name { font-size: 36rpx; font-weight: 600; }.example { font-size: 21rpx; color: #aaa; margin-left: 18rpx; }.language { display: block; color: #888; font-size: 24rpx; margin: 10rpx 0 14rpx; }.body-copy { display: block; font-size: 25rpx; color: #777; line-height: 1.8; }.profile .body-copy { padding-top: 22rpx; border-top: 1rpx solid #f3f3f3; }.duration { font-size: 25rpx; color: #888; }.service-points { border-top: 1rpx solid #f3f3f3; margin-top: 24rpx; padding-top: 12rpx; }.service-points view { display: flex; align-items: center; padding: 12rpx 0; font-size: 25rpx; color: #666; }.point-number { font-size: 20rpx; color: #c39a78; margin-right: 22rpx; }.campus-row { display: flex; align-items: center; gap: 18rpx; font-size: 25rpx; color: #666; padding: 20rpx 0; border-top: 1rpx solid #f3f3f3; }.campus-row:last-child { padding-bottom: 0; }.location-dot { width: 14rpx; height: 14rpx; border-radius: 50%; border: 4rpx solid #e6af82; flex-shrink: 0; }.booking-steps { display: flex; justify-content: space-between; font-size: 23rpx; color: #a36537; background: #fff8f1; padding: 20rpx 16rpx; border-radius: 8rpx; }.step-arrow { color: #cfb7a3; }.instructions { margin-top: 20rpx; font-size: 23rpx; }.muted-inline { font-size: 22rpx; color: #999; }
</style>
