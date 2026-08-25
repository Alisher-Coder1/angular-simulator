import { InjectionToken } from '@angular/core';

export interface IAppConfig {
  companyName: string;
  enableLogs: boolean;
  enableNotifications: boolean;
  enableTheming: boolean;
  sessionTimeout: number;
}

export const APP_CONFIG = new InjectionToken<IAppConfig>('APP_CONFIG');
