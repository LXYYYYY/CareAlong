<script setup lang="ts">
import { computed, ref } from 'vue';
import { workers } from '@/data/demo';
const query = ref('');
const category = ref('全部');
const categories = ['全部', '门诊陪同', '检查陪同'];
const visibleWorkers = computed(() => workers.filter(worker =>
  (category.value === '全部' || worker.category === category.value) &&
  `${worker.name}${worker.languages}${worker.campuses.join('')}`.includes(query.value.trim())
));
function viewWorker(id: string) { uni.navigateTo({ url: `/pages/worker/detail?id=${encodeURIComponent(id)}` }); }
</script>
<template>
  <view class="page">
    <view class="row between topbar"><text class="eyebrow">暖程陪诊 · CareAlong</text><text class="city">杭州 · 演示城市</text></view>
    <view class="hero"><text class="eyebrow">就医路上，暖心相伴。</text><text class="title">找到适合你的陪诊伙伴</text><text class="subtitle">先了解，再预约。每一次申请，都由平台审核与陪诊师确认。</text><view class="hero-note"><text>01 选人</text><text>02 预约</text><text>03 确认</text></view></view>
    <view class="notice">流程演示：以下人员、院区和价格均为虚构数据，不提供真实服务。</view>
    <view class="search"><input v-model="query" placeholder="搜索人员、语言或院区" :maxlength="30" confirm-type="search" /></view>
    <view class="filters"><button v-for="item in categories" :key="item" :class="['filter', { active: category === item }]" @click="category = item">{{ item }}</button></view>
    <view class="row between list-heading"><text class="section-title">陪诊伙伴</text><text class="muted">{{ visibleWorkers.length }} 位演示人员</text></view>
    <view v-for="worker in visibleWorkers" :key="worker.id" class="panel worker-card">
      <view class="row"><view class="avatar" :style="{ background: worker.color }">{{ worker.initial }}</view><view class="worker-main"><text class="worker-name">{{ worker.name }}</text><text class="muted">{{ worker.languages }}</text></view><text class="demo-label">示例人员</text></view>
      <view class="tags"><text class="tag">{{ worker.category }}</text><text class="tag">4 小时服务</text></view><text class="campus">{{ worker.campuses.join(' / ') }}</text>
      <view class="row between card-footer"><view><text class="money">¥{{ worker.price }}</text><text class="muted"> / 演示价</text></view><button class="detail-button" @click="viewWorker(worker.id)">了解并预约 →</button></view>
    </view>
    <view v-if="!visibleWorkers.length" class="panel empty">没有匹配的演示人员，请更换关键词或分类。</view>
    <text class="footer-note">预约需审核通过，并由所选人员确认后生效。</text>
  </view>
</template>
<style scoped>
.topbar { margin: 4rpx 0 26rpx; }.city { color: #65766b; font-size: 23rpx; }
.hero { padding: 36rpx; background: #e4eddd; border-radius: 30rpx; }.hero .title { font-size: 54rpx; }
.hero-note { display: flex; justify-content: space-between; border-top: 1rpx solid #c9d8c3; padding-top: 24rpx; margin-top: 28rpx; font-size: 23rpx; color: #4f705c; }
.search { background: #fff; padding: 24rpx; border-radius: 20rpx; border: 1rpx solid #dde5da; }.search input { font-size: 26rpx; height: 42rpx; }
.filters { display: flex; margin-top: 22rpx; }.filter { margin-right: 14rpx; background: #eaf0e7; padding: 0 28rpx; line-height: 64rpx; font-size: 25rpx; }.filter.active { background: #245c48; color: white; }
.list-heading .section-title { margin: 32rpx 0 20rpx; }.avatar { width: 94rpx; height: 100rpx; border-radius: 24rpx; display: flex; align-items: center; justify-content: center; font-size: 42rpx; color: #385143; }
.worker-main { flex: 1; padding-left: 22rpx; }.worker-main text { display: block; }.worker-name { font-size: 32rpx; font-weight: 700; margin-bottom: 10rpx; }.demo-label { color: #8c9a8b; font-size: 21rpx; }
.tags { margin: 24rpx 0 6rpx; }.campus { display: block; font-size: 24rpx; color: #6f8075; line-height: 1.7; }.card-footer { margin-top: 26rpx; padding-top: 24rpx; border-top: 1rpx solid #edf0e9; }
.detail-button { background: #eef4e9; color: #31563f; font-size: 24rpx; line-height: 66rpx; padding: 0 22rpx; }.footer-note { display: block; text-align: center; color: #8a978d; font-size: 22rpx; line-height: 1.7; margin-top: 30rpx; }
</style>
