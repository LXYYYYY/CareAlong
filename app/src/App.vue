<script lang="ts">
export default {};
</script>
<style>
page { background: #f5f5f5; color: #282828; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Microsoft YaHei', sans-serif; font-size: 28rpx; }
view, text, button, input { box-sizing: border-box; }
.page button { margin: 0; border-radius: 12rpx; font-size: 28rpx; } .page button::after { border: 0; }
.page { max-width: 880rpx; margin: 0 auto; padding: 24rpx 24rpx 48rpx; }
.page-with-action { padding-bottom: calc(160rpx + env(safe-area-inset-bottom)); }
.row { display: flex; align-items: center; } .between { justify-content: space-between; }
.panel { background: #fff; border-radius: 16rpx; padding: 28rpx; margin-bottom: 20rpx; }
.section-title { display: block; font-size: 30rpx; font-weight: 600; margin-bottom: 24rpx; }
.muted { color: #999; font-size: 23rpx; line-height: 1.6; }
.tag { display: inline-block; padding: 5rpx 12rpx; border-radius: 6rpx; background: #fff3e8; color: #b96a2b; font-size: 21rpx; line-height: 1.5; }
.primary { background: #f5802b; color: #fff; font-weight: 500; line-height: 88rpx; }
.secondary { background: #fff; border: 1rpx solid #ddd; color: #555; line-height: 84rpx; }
.notice { color: #9a795d; background: #fff6ec; padding: 18rpx 24rpx; font-size: 22rpx; line-height: 1.6; border-radius: 10rpx; margin-bottom: 20rpx; }
.money { color: #ef7424; font-size: 40rpx; font-weight: 600; }
.currency { font-size: 25rpx; margin-right: 3rpx; }
.avatar { flex-shrink: 0; width: 110rpx; height: 120rpx; border-radius: 12rpx; display: flex; align-items: center; justify-content: center; color: #655e56; font-size: 44rpx; }
.chevron { color: #bbb; font-size: 34rpx; margin-left: 16rpx; }
.action-bar { position: fixed; z-index: 5; bottom: 0; left: 0; right: 0; max-width: 880rpx; margin: 0 auto; padding: 18rpx 28rpx; padding-bottom: calc(18rpx + env(safe-area-inset-bottom)); background: #fff; border-top: 1rpx solid #eee; }
.action-content { display: flex; align-items: center; justify-content: space-between; gap: 24rpx; }
.action-content .primary { width: 340rpx; flex-shrink: 0; }
.action-price .muted { display: block; font-size: 20rpx; }
.empty { text-align: center; padding: 70rpx 24rpx; color: #999; font-size: 26rpx; line-height: 1.8; }
.back-button { margin-top: 30rpx; }
</style>
