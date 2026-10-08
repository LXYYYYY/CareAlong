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
  <view :class="['page', { 'page-with-action': worker && !submitted }]">
    <template v-if="worker && !submitted">
      <view class="notice">演示预约：请选择示例成员，无需填写真实个人资料。</view>
      <view class="panel selected-worker"><view class="avatar" :style="{ background: worker.color }">{{ worker.initial }}</view><view class="worker-info"><text class="worker-name">{{ worker.name }}</text><text class="worker-service">{{ worker.category }} · 4 小时</text><text class="muted">{{ worker.languages }}</text></view><text class="tag">示例人员</text></view>
      <view class="panel form-panel"><text class="section-title">预约信息</text>
        <picker :range="demoPatients" :value="patientIndex < 0 ? 0 : patientIndex" @change="choosePatient"><view class="form-row"><text class="field-label">就诊成员</text><text :class="['field-value', { placeholder: patientIndex < 0 }]">{{ patientName }}</text><text class="chevron">›</text></view></picker>
        <picker :range="campusOptions" :value="campusIndex < 0 ? 0 : campusIndex" @change="chooseCampus"><view class="form-row"><text class="field-label">服务院区</text><text :class="['field-value', { placeholder: campusIndex < 0 }]">{{ campusName }}</text><text class="chevron">›</text></view></picker>
        <picker mode="date" :value="date || earliestDate" :start="earliestDate" :end="latestDate" @change="chooseDate"><view class="form-row"><text class="field-label">预约日期</text><text :class="['field-value', { placeholder: !date }]">{{ date || '选择日期' }}</text><text class="chevron">›</text></view></picker>
        <view class="time-field"><text class="field-label">开始时间</text><view class="slots"><button v-for="(slot, index) in demoSlots" :key="slot" :class="['slot', { selected: slotIndex === index }]" @click="slotIndex = index">{{ slot }}</button></view><text class="muted">可选未来 30 天 · 演示时段，未接入排班</text></view>
      </view>
      <view class="panel fee-panel"><text class="section-title">费用明细</text><view class="row between"><text>{{ worker.category }}（4 小时）</text><text>¥{{ worker.price }}.00</text></view><text class="fee-note">演示价格，提交后无需支付。</text></view>
      <view class="booking-tip">提交后由管理员审核，再由 {{ worker.name }} 确认接单。</view>
      <checkbox-group @change="acknowledge"><label class="acknowledge"><checkbox value="demo" :checked="acknowledged" color="#f5802b" /><text>我了解这是演示流程，不会预约真实服务。</text></label></checkbox-group>
      <view class="action-bar"><view v-if="error" class="error" role="alert">{{ error }}</view><view class="action-content"><view class="action-price"><view><text class="total-label">合计 </text><text class="money"><text class="currency">¥</text>{{ worker.price }}</text></view><text class="muted">仅展示费用，不收款</text></view><button class="primary" @click="submit">提交演示申请</button></view></view>
    </template>
    <template v-else-if="worker && submitted">
      <view class="success-header"><view class="success-icon">✓</view><text class="success-title">演示申请已生成</text><text class="success-subtitle">待管理员审核</text></view>
      <view class="panel"><text class="section-title">预约信息</text><view class="summary-row"><text>陪诊师</text><text>{{ worker.name }} · {{ worker.category }}</text></view><view class="summary-row"><text>就诊成员</text><text>{{ patientName }}</text></view><view class="summary-row"><text>服务院区</text><text>{{ campusName }}</text></view><view class="summary-row"><text>预约时间</text><text>{{ date }} {{ selectedSlot }}</text></view><view class="summary-row"><text>服务时长</text><text>4 小时</text></view></view>
      <view class="panel"><text class="section-title">预约进度</text><view class="progress-step current"><text class="step-dot">1</text><view><text class="step-title">等待管理员审核</text><text class="step-description">核对预约资料与服务信息</text></view></view><view class="progress-step"><text class="step-dot">2</text><view><text class="step-title">陪诊师确认接单</text><text class="step-description">由 {{ worker.name }} 确认服务安排</text></view></view><view class="progress-step last-step"><text class="step-dot">3</text><text class="step-title">预约成功，按时到院集合</text></view></view>
      <view class="notice">本地演示：未发送审核或接单通知，退出页面后重置。</view><button class="secondary" @click="home">返回人员列表</button>
    </template>
    <view v-else class="panel empty"><text>请先选择陪诊人员</text><button class="secondary back-button" @click="home">返回人员列表</button></view>
  </view>
</template>
<style scoped>
.selected-worker { display: flex; align-items: center; gap: 20rpx; }.selected-worker .avatar { width: 86rpx; height: 96rpx; font-size: 36rpx; }.worker-info { flex: 1; }.worker-name { display: block; font-size: 30rpx; font-weight: 600; }.worker-service { display: block; font-size: 24rpx; color: #666; margin: 6rpx 0; }.selected-worker .muted { font-size: 21rpx; }.selected-worker .tag { align-self: flex-start; font-size: 20rpx; }.form-panel .section-title { margin-bottom: 6rpx; }.form-row { display: flex; align-items: center; min-height: 100rpx; border-bottom: 1rpx solid #f1f1f1; padding: 20rpx 0; }.field-label { font-size: 27rpx; flex-shrink: 0; }.field-value { flex: 1; text-align: right; font-size: 25rpx; margin-left: 20rpx; line-height: 1.6; }.placeholder { color: #aaa; }.time-field { padding-top: 26rpx; }.slots { display: flex; flex-wrap: wrap; gap: 16rpx; margin: 22rpx 0 16rpx; }.slot { background: #f6f6f6; color: #666; font-size: 25rpx; line-height: 70rpx; width: calc((100% - 32rpx) / 3); border: 1rpx solid transparent; border-radius: 8rpx; padding: 0; }.slot.selected { background: #fff4e9; color: #e87c2c; border-color: #f5802b; }.time-field .muted { font-size: 21rpx; }.fee-panel .row { font-size: 25rpx; color: #666; }.fee-note { display: block; color: #aaa; font-size: 22rpx; margin-top: 18rpx; }.booking-tip { font-size: 23rpx; color: #888; margin: 24rpx 4rpx 16rpx; line-height: 1.7; }.acknowledge { display: flex; align-items: center; font-size: 23rpx; color: #888; line-height: 1.7; }.acknowledge text { flex: 1; margin-left: 6rpx; }.acknowledge checkbox { transform: scale(.8); transform-origin: left center; }.error { color: #c64332; font-size: 23rpx; line-height: 1.6; padding-bottom: 14rpx; }.total-label { font-size: 23rpx; }.success-header { text-align: center; padding: 24rpx 0 40rpx; }.success-icon { margin: 0 auto 24rpx; width: 96rpx; height: 96rpx; border-radius: 50%; background: #f5802b; color: #fff; line-height: 96rpx; font-size: 54rpx; }.success-title { display: block; font-size: 36rpx; font-weight: 600; }.success-subtitle { display: block; font-size: 25rpx; color: #999; margin-top: 14rpx; }.summary-row { display: flex; justify-content: space-between; gap: 24rpx; font-size: 24rpx; padding: 14rpx 0; line-height: 1.6; }.summary-row text:first-child { flex-shrink: 0; color: #999; }.summary-row text:last-child { text-align: right; color: #555; }.progress-step { display: flex; align-items: flex-start; gap: 22rpx; padding-bottom: 32rpx; position: relative; color: #999; }.progress-step::before { content: ''; position: absolute; left: 17rpx; top: 36rpx; bottom: 0; width: 2rpx; background: #eee; }.last-step { padding-bottom: 0; }.last-step::before { display: none; }.step-dot { width: 36rpx; height: 36rpx; border-radius: 50%; background: #f2f2f2; font-size: 21rpx; text-align: center; line-height: 36rpx; flex-shrink: 0; }.current .step-dot { background: #fff0e1; color: #eb7a29; }.step-title { display: block; font-size: 25rpx; line-height: 36rpx; }.current .step-title { color: #d97128; }.step-description { display: block; font-size: 22rpx; margin-top: 10rpx; color: #aaa; }
</style>
