// 虚构演示数据。接入后端时由服务接口替换。
export interface Worker {
  id: string; name: string; initial: string; color: string;
  category: '门诊陪同' | '检查陪同'; languages: string; intro: string;
  price: number; campuses: string[];
}
export const workers: Worker[] = [
  { id: 'demo-lin', name: '林安心', initial: '林', color: '#dbe9d1', category: '门诊陪同', languages: '普通话 / 杭州话', intro: '协助梳理就诊路线、候诊、缴费及取药流程，耐心陪伴长者。服务范围以预约确认内容为准，不提供诊断或用药建议。', price: 200, campuses: ['示例医院 · 城北院区', '示例医院 · 滨江院区'] },
  { id: 'demo-zhou', name: '周予宁', initial: '周', color: '#f0dfc9', category: '检查陪同', languages: '普通话 / 英语', intro: '陪同完成检查流程，协助确认楼层、窗口与集合地点，帮助整理待办事项。服务范围以预约确认内容为准。', price: 220, campuses: ['示例医院 · 滨江院区'] },
  { id: 'demo-chen', name: '陈知行', initial: '陈', color: '#dce5ec', category: '门诊陪同', languages: '普通话', intro: '提供门诊流程陪伴，协助到院集合、候诊和服务结束后的事项整理。服务范围以预约确认内容为准。', price: 200, campuses: ['示例医院 · 城北院区'] }
];
export const demoPatients = ['测试成员 A（本人）', '测试成员 B（家属）'];
export const demoSlots = ['08:00', '09:00', '10:00', '13:00', '14:00'];
export function findWorker(id: string) { return workers.find(worker => worker.id === id); }
export function localDate(offset: number) {
  const date = new Date(); date.setDate(date.getDate() + offset);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}
