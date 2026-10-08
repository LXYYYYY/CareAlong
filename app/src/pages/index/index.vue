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
  <view class="page home-page">
    <view class="home-top">
      <view class="search-row"><view class="city"><text>杭州</text><text class="city-caption">演示城市</text></view><view class="search"><view class="search-icon" /><input v-model="query" placeholder="搜索陪诊师、语言、院区" :maxlength="30" confirm-type="search" /></view></view>
      <view class="service-banner"><view><text class="banner-title">就医有人陪，家人更安心</text><text class="banner-subtitle">门诊陪同 · 检查陪同 · 流程协助</text></view><view class="banner-mark"><view class="cross" /></view></view>
      <view class="process"><text>选择陪诊师</text><text class="process-arrow">›</text><text>提交预约</text><text class="process-arrow">›</text><text>审核并确认</text></view>
    </view>
    <view class="filters"><button v-for="item in categories" :key="item" :class="['filter', { active: category === item }]" @click="category = item">{{ item }}</button></view>
    <view class="list-area">
      <view class="row between list-heading"><text class="list-title">陪诊师</text><text class="muted">{{ visibleWorkers.length }} 位示例人员</text></view>
      <view v-for="worker in visibleWorkers" :key="worker.id" class="worker-card">
        <view class="worker-info"><view class="avatar" :style="{ background: worker.color }">{{ worker.initial }}</view><view class="worker-main"><view class="row name-row"><text class="worker-name">{{ worker.name }}</text><text class="tag">{{ worker.category }}</text></view><text class="language">服务语言：{{ worker.languages }}</text><text class="campus">{{ worker.campuses.join(' / ') }}</text></view></view>
        <view class="row between card-footer"><view><text class="money"><text class="currency">¥</text>{{ worker.price }}</text><text class="price-unit"> / 4 小时</text></view><button class="book-button" @click="viewWorker(worker.id)">查看预约</button></view>
      </view>
      <view v-if="!visibleWorkers.length" class="panel empty"><view>暂无匹配人员</view><view>试试其他关键词或服务分类</view></view>
      <view class="demo-note"><text class="demo-label">演示版</text><text>人员、院区和价格均为虚构，不提供真实服务。</text></view>
    </view>
  </view>
</template>
<style scoped>
.home-page { padding: 0 0 36rpx; }.home-top { background: #fff; padding: 22rpx 24rpx 0; }
.search-row { display: flex; align-items: center; gap: 22rpx; }.city { flex-shrink: 0; font-size: 30rpx; font-weight: 600; }.city-caption { display: block; font-size: 18rpx; color: #aaa; font-weight: 400; margin-top: 3rpx; }
.search { display: flex; align-items: center; flex: 1; min-width: 0; background: #f5f5f5; border-radius: 36rpx; padding: 16rpx 24rpx; }.search input { flex: 1; min-width: 0; font-size: 25rpx; height: 36rpx; }.search-icon { width: 24rpx; height: 24rpx; border: 3rpx solid #aaa; border-radius: 50%; margin-right: 18rpx; position: relative; flex-shrink: 0; }.search-icon::after { content: ''; position: absolute; width: 10rpx; height: 3rpx; background: #aaa; right: -8rpx; bottom: -4rpx; transform: rotate(45deg); }
.service-banner { margin-top: 24rpx; padding: 28rpx 26rpx; background: #fff0df; border-radius: 14rpx; display: flex; align-items: center; justify-content: space-between; gap: 12rpx; }.banner-title { display: block; font-size: 33rpx; font-weight: 600; color: #88451f; }.banner-subtitle { display: block; font-size: 23rpx; color: #ad7956; margin-top: 12rpx; }.banner-mark { width: 78rpx; height: 86rpx; background: #ffe0bf; border: 3rpx solid #fff8ed; border-radius: 16rpx; display: flex; align-items: center; justify-content: center; flex-shrink: 0; transform: rotate(8deg); }.cross { width: 38rpx; height: 12rpx; background: #ec994f; border-radius: 3rpx; position: relative; }.cross::after { content: ''; position: absolute; width: 12rpx; height: 38rpx; top: -13rpx; left: 13rpx; background: #ec994f; border-radius: 3rpx; }
.process { display: flex; justify-content: space-between; align-items: center; padding: 24rpx 4rpx; font-size: 22rpx; color: #888; }.process-arrow { color: #ccc; }
.filters { display: flex; background: #fff; border-top: 1rpx solid #f5f5f5; }.filter { flex: 1; background: transparent; color: #666; font-size: 28rpx; border-radius: 0; padding: 0; line-height: 88rpx; position: relative; }.filter.active { color: #ed7626; font-weight: 600; }.filter.active::before { content: ''; position: absolute; bottom: 0; left: 50%; width: 40rpx; height: 6rpx; border-radius: 3rpx; background: #f5802b; transform: translateX(-50%); }
.list-area { padding: 0 24rpx; }.list-heading { padding: 24rpx 0 20rpx; }.list-title { font-size: 28rpx; font-weight: 600; }.list-heading .muted { font-size: 22rpx; }.worker-card { background: #fff; padding: 24rpx; border-radius: 14rpx; margin-bottom: 18rpx; }.worker-info { display: flex; gap: 22rpx; }.worker-main { flex: 1; min-width: 0; }.name-row { flex-wrap: wrap; gap: 12rpx; }.worker-name { font-size: 32rpx; font-weight: 600; }.language { display: block; font-size: 23rpx; color: #777; margin-top: 12rpx; }.campus { display: block; font-size: 22rpx; color: #999; line-height: 1.6; margin-top: 8rpx; }.card-footer { border-top: 1rpx solid #f3f3f3; margin-top: 20rpx; padding-top: 18rpx; }.money { font-size: 36rpx; }.price-unit { color: #999; font-size: 22rpx; }.book-button { background: #f5802b; color: #fff; font-size: 25rpx; line-height: 68rpx; padding: 0 28rpx; border-radius: 34rpx; }.demo-note { display: flex; align-items: flex-start; gap: 10rpx; padding: 16rpx 6rpx 0; font-size: 20rpx; line-height: 1.7; color: #aaa; }.demo-label { flex-shrink: 0; }
</style>
