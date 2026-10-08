<script setup lang="ts">
import { ref, computed } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import { findWorker, demoPatients, demoSlots, localDate, type Worker } from '@/data/demo';
const worker = ref<Worker>();
const patientIndex = ref(-1), campusIndex = ref(-1), slotIndex = ref(-1);
const date = ref(''), error = ref('');
const acknowledged = ref(false), submitted = ref(false);
const earliestDate = localDate(1), latestDate = localDate(30);
const campusOptions = computed(() => worker.value?.campuses || []);
const patientName = computed(() => demoPatients[patientIndex.value] || '选择示例成员');
const campusName = computed(() => campusOptions.value[campusIndex.value] || '选择服务院区');
const selectedSlot = computed(() => demoSlots[slotIndex.value] || '');
onLoad(options => { worker.value = findWorker(String(options?.workerId || '')); });
type PickerChange = { detail: { value: string | number } };
function choosePatient(event: PickerChange) { patientIndex.value = Number(event.detail.value); }
function chooseCampus(event: PickerChange) { campusIndex.value = Number(event.detail.value); }
function chooseDate(event: PickerChange) { date.value = String(event.detail.value); }
function acknowledge(event: { detail: { value: string[] } }) { acknowledged.value = event.detail.value.includes('demo'); }
function submit() {
  if (submitted.value || !worker.value) return;
  if (patientIndex.value < 0) { error.value = '请先选择一个示例成员。'; return; }
  if (campusIndex.value < 0) { error.value = '请选择本次服务的院区。'; return; }
  if (!date.value || date.value < earliestDate || date.value > latestDate || slotIndex.value < 0) { error.value = '请选择未来 30 天内的演示日期和时段。'; return; }
  if (!acknowledged.value) { error.value = '请确认这是一次演示预约。'; return; }
  error.value = ''; submitted.value = true;
}
function home() { uni.reLaunch({ url: '/pages/index/index' }); }
</script>
<template>
  <view class="page">
    <template v-if="worker && !submitted">
      <text class="eyebrow">第一步 · 提交预约申请</text><text class="title">安排一次安心陪伴</text><text class="subtitle">平台审核后，再由 {{ worker.name }} 确认接单。</text>
      <view class="notice">仅演示，不创建真实订单。使用示例成员即可，无需填写真实个人资料。</view>
      <view class="panel"><view class="row between"><text class="worker-name">{{ worker.name }}</text><text class="tag">{{ worker.category }}</text></view><text class="subtitle">{{ worker.languages }} · 4 小时</text></view>
      <view class="panel form-panel">
        <text class="field-label">为谁预约</text><picker :range="demoPatients" @change="choosePatient"><view class="field-value">{{ patientName }}<text>›</text></view></picker>
        <text class="field-label">服务院区</text><picker :range="campusOptions" @change="chooseCampus"><view class="field-value">{{ campusName }}<text>›</text></view></picker>
        <text class="field-label">预约日期</text><picker mode="date" :value="date || earliestDate" :start="earliestDate" :end="latestDate" @change="chooseDate"><view class="field-value">{{ date || '选择日期' }}<text>›</text></view></picker>
        <text class="field-label">开始时间</text><view class="slots"><button v-for="(slot, index) in demoSlots" :key="slot" :class="['slot', { selected: slotIndex === index }]" @click="slotIndex = index">{{ slot }}</button></view><text class="muted">演示时段，尚未连接真实排班。</text>
      </view>
      <view class="panel"><view class="row between"><text>费用预览</text><text class="money">¥{{ worker.price }}</text></view><text class="muted">演示价格，无支付操作。</text></view>
      <checkbox-group @change="acknowledge"><label class="acknowledge"><checkbox value="demo" :checked="acknowledged" color="#245c48" /><text>我了解这是演示流程，不会预约真实服务。</text></label></checkbox-group>
      <view v-if="error" class="error">{{ error }}</view><button class="primary submit-button" @click="submit">提交演示申请</button>
    </template>
    <template v-else-if="worker && submitted">
      <view class="success-icon">✓</view><text class="title success-title">演示申请已生成</text><text class="subtitle success-title">当前页面展示“待审核”状态</text>
      <view class="panel summary"><text class="tag">待管理员审核 · 本地演示</text><text>{{ worker.name }} · {{ worker.category }}</text><text>{{ patientName }}</text><text>{{ campusName }}</text><text>{{ date }} {{ selectedSlot }} · 4 小时</text></view>
      <view class="panel"><text class="step current">1　管理员审核预约资料</text><text class="step">2　{{ worker.name }} 确认接单</text><text class="step">3　预约成功，按时到院集合</text></view>
      <view class="notice">尚未接入后台，没有发送审核或接单通知。本次演示仅保留在当前页面，退出后重置。</view><button class="primary" @click="home">返回人员列表</button>
    </template>
    <view v-else class="panel empty"><text>请先选择陪诊人员</text><button class="secondary submit-button" @click="home">返回人员列表</button></view>
  </view>
</template>
<style scoped>
.worker-name { font-size: 32rpx; font-weight: 700; }.field-label { display: block; font-size: 25rpx; color: #506b5a; margin: 24rpx 0 14rpx; }.field-label:first-child { margin-top: 0; }.field-value { padding: 24rpx; background: #f4f7f1; border-radius: 14rpx; display: flex; justify-content: space-between; font-size: 26rpx; }.field-value text { color: #859981; }.slots { display: flex; flex-wrap: wrap; }.slot { background: #f2f5ee; color: #5b705e; font-size: 26rpx; line-height: 70rpx; width: 30%; margin: 0 3% 16rpx 0; border: 2rpx solid transparent; border-radius: 14rpx; }.slot.selected { background: #e4efdf; color: #245c48; border-color: #49785b; }.acknowledge { display: flex; align-items: flex-start; font-size: 24rpx; color: #6a7c6b; line-height: 1.8; }.acknowledge text { flex: 1; padding-left: 12rpx; }.submit-button { margin-top: 30rpx; }.error { margin-top: 20rpx; color: #a14b36; font-size: 25rpx; }.success-icon { margin: 32rpx auto; width: 100rpx; height: 100rpx; border-radius: 50%; background: #dfeeda; color: #245c48; text-align: center; line-height: 100rpx; font-size: 56rpx; }.success-title { text-align: center; }.summary { margin-top: 38rpx; }.summary > text { display: block; line-height: 2; font-size: 27rpx; }.summary .tag { display: inline-block; font-size: 22rpx; }.step { display: block; padding: 18rpx 0; color: #7b897d; font-size: 25rpx; }.step.current { color: #245c48; font-weight: 600; }
</style>
