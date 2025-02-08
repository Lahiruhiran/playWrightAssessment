import { APIRequestContext, APIResponse } from '@playwright/test';
import { CreateObjectRequest } from '../types/request.types';

export class ObjectsApi {
  constructor(private request: APIRequestContext) {}

  async getAllObjects(): Promise<APIResponse> {
    return this.request.get('/objects', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
  }

  async createObject(data: CreateObjectRequest): Promise<APIResponse> {
    return this.request.post('/objects', {
      data,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
  }

  async getObjectById(id: string): Promise<APIResponse> {
    return this.request.get(`/objects/${id}`, {
      headers: {
        'Accept': 'application/json'
      }
    });
  }

  async updateObject(id: string, data: CreateObjectRequest): Promise<APIResponse> {
    return this.request.put(`/objects/${id}`, {
      data,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
  }

  async deleteObject(id: string): Promise<APIResponse> {
    return this.request.delete(`/objects/${id}`, {
      headers: {
        'Accept': 'application/json'
      }
    });
  }
}