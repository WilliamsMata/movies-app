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

  // async post<T>(
  //   url: string,
  //   data: any,
  //   options?: Record<string, unknown>,
  // ): Promise<T> {
  //   // Implementation here
  // }

  // async put<T>(
  //   url: string,
  //   data: any,
  //   options?: Record<string, unknown>,
  // ): Promise<T> {
  //   // Implementation here
  // }

  // async delete<T>(url: string, options?: Record<string, unknown>): Promise<T> {
  //   // Implementation here
  // }
}
