import { defineStore } from 'pinia';
import axios, { type AxiosInstance } from 'axios';
import MessageBox, { type MessageBoxOptions } from '@/utils/messagebox';
import type { BenchRecord, VlanRecord, AppSettings, TableRecord } from '@/types';

const _url: string = import.meta.env.VITE_API_BASE_URL;

export const useStore = defineStore('default', {
  state: () => ({
    _instance: axios.create({
      baseURL: _url,
      timeout: 5000,
      headers: { Accept: 'application/json,text/html' },
    }) as AxiosInstance,
    _appSettings: {} as AppSettings,
    _msgBox: new MessageBox(),
    _vlanSchema: [] as VlanRecord[],
    _benchSchema: [] as BenchRecord[],
    _tableSchema: [] as TableRecord[],
    _hooks: [] as SettingsHook[],
  }),
  actions: {
    async addHook(key: string, callback: Function, index?: number): Promise<boolean> {
      if (index) {
        this._hooks.splice(index, 0, { key, callback } as SettingsHook);
      } else {
        this._hooks.push({ key, callback } as SettingsHook);
      }
      return true;
    },
    async removeHook(key: string): Promise<boolean> {
      const hookIdx = this._hooks.findIndex((x) => x.key == key);
      if (!hookIdx || hookIdx == -1) {
        throw new Error(`Hook with key "${key}" does not exist.`);
      }
      this._hooks.splice(hookIdx, 1);
      return true;
    },
    async runHooks(): Promise<{}> {
      const results: {}[] = [];
      this._hooks.forEach(async (h) => {
        const res = await h.callback();
        results.push({ key: h.key, res });
      });
      return results;
    },
    async setUser(user: string): Promise<boolean> {
      this._appSettings.user = user;
      this.runHooks();
      return true;
    },
    async updateSettings(newSettings: AppSettings): Promise<boolean> {
      this._appSettings = { ...this.appSettings, ...newSettings };
      this.runHooks();
      return true;
    },
    async updateSetting<k extends keyof AppSettings>(
      key: k,
      value: AppSettings[k]
    ): Promise<boolean> {
      this._appSettings[key] = value;
      this.runHooks();
      return true;
    },
    async updateSchemas(vlans: VlanRecord[], benches: BenchRecord[], tables: TableRecord[]) {
      this._vlanSchema = vlans;
      this._benchSchema = benches;
      this._tableSchema = tables;
    },
    async showTempMsg(msOptions: MessageBoxOptions): Promise<boolean> {
      this._msgBox.show(msOptions);
      return true;
    },
    async showPermMsg(msOptions: MessageBoxOptions): Promise<boolean> {
      this._msgBox.show(msOptions);
      return true;
    },
  },
  getters: {
    axiosInst(): AxiosInstance {
      return this._instance;
    },
    appSettings(): AppSettings {
      return this._appSettings;
    },
    user(): string | undefined {
      return this._appSettings.user;
    },
    vlanSchema(): VlanRecord[] {
      return this._vlanSchema;
    },
    benchSchema(): BenchRecord[] {
      return this._benchSchema;
    },
    tableSchema(): TableRecord[] {
      return this._tableSchema;
    },
  },
});

export interface SettingsHook {
  key: string;
  callback: Function;
}