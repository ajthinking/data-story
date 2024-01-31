import { Subject } from 'rxjs';
import { EventHandler, EventTypes } from './eventTypes';
import type { Observer } from 'rxjs';

// EventManager 类负责创建 Subject 并管理事件的发布和订阅
class EventManager {
  private subject: Subject<unknown>;
  constructor() {
    this.subject = new Subject();
  }

  // 发布事件
  emit(event: EventTypes) {
    this.subject.next(event);
  }

  // 订阅事件
  on(handler: Partial<Observer<EventTypes>> | ((value: EventTypes) => void)) {
    return this.subject.subscribe(handler);
  }
}

// 实例化 EventManager
export const eventManager = new EventManager();

// 项目 A：抛出事件
function projectA() {
  // ... 一些逻辑
  eventManager.emit({ type: 'EVENT_TYPE', payload: 'Some Data' });
  // ... 其他逻辑
}

// 项目 B：监听事件并处理
function projectB() {
  eventManager.on(event => {
    if (event.type === 'EVENT_TYPE') {
      console.log('Project B handled:', event.payload);
      // ... 处理事件
    }
  });
}

// 项目 C：监听事件并处理
function projectC() {
  eventManager.on(event => {
    if (event.type === 'EVENT_TYPE') {
      console.log('Project C handled:', event.payload);
      // ... 处理事件
    }
  });
}

// 启动监听
projectB();
projectC();

// 触发事件
projectA();
