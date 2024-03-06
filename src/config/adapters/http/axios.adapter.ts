import axios, {type AxiosInstance, type AxiosRequestConfig} from 'axios';
import {HttpAdapter} from './http.adapter';

interface Options {
  baseURL: string;
  params: Record<string, string>;
}

export class AxiosAdapter implements HttpAdapter {
  private axiosInstance: AxiosInstance;

  constructor(options: Options) {
    this.axiosInstance = axios.create({
      baseURL: options.baseURL,
      params: options.params,
    });
  }

  async get<T>(url: string, options?: AxiosRequestConfig<any>): Promise<T> {
    try {
      const response = await this.axiosInstance.get<T>(url, options);
      return response.data;
    } catch (error: any) {
      throw new Error(`Error fetching get: ${url}. Message: ${error.message}`);
    }
  }

  async post<T>(
    url: string,
    data: any,
    options?: AxiosRequestConfig<any>,
  ): Promise<T> {
    try {
      const response = await this.axiosInstance.post<T>(url, data, options);
      return response.data;
    } catch (error: any) {
      throw new Error(`Error fetching post: ${url}. Message: ${error.message}`);
    }
  }

  async put<T>(
    url: string,
    data: any,
    options?: AxiosRequestConfig<any>,
  ): Promise<T> {
    try {
      const response = await this.axiosInstance.put<T>(url, data, options);
      return response.data;
    } catch (error: any) {
      throw new Error(`Error fetching put: ${url}. Message: ${error.message}`);
    }
  }

  async delete<T>(url: string, options?: AxiosRequestConfig<any>): Promise<T> {
    try {
      const response = await this.axiosInstance.delete<T>(url, options);
      return response.data;
    } catch (error: any) {
      throw new Error(
        `Error fetching delete: ${url}. Message: ${error.message}`,
      );
    }
  }
}
