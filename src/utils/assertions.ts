import { expect, APIResponse } from '@playwright/test';
import { ObjectResponse } from '../types/response.types';

export class ApiAssertions {
  static async assertSuccessfulResponse(response: APIResponse) {
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
    return response.json();
  }

  static async assertObjectStructure(object: ObjectResponse) {
    expect(object).toHaveProperty('id');
    expect(typeof object.id).toBe('string');
    expect(object.id.length).toBeGreaterThan(0);
    
    expect(object).toHaveProperty('name');
    expect(typeof object.name).toBe('string');
    
    expect(object).toHaveProperty('data');
    if(object.data != null) {
      if(object.data.color)
      expect(object.data).toHaveProperty('color');
      if(object.data.capacity)
      expect(object.data).toHaveProperty('capacity');
      if(object.data.price)
      expect(object.data).toHaveProperty('price');
      if(object.data.generation)
      expect(object.data).toHaveProperty('generation');
      if(object.data.year)
      expect(object.data).toHaveProperty('year');
    }
  
  }

  static async assertObjectMatch(actual: ObjectResponse, expected: Partial<ObjectResponse>) {
    expect(actual.name).toBe(expected.name);
    expect(actual.data).toEqual(expected.data);
  }

  static async assertErrorResponse(response: APIResponse, expectedStatus: number) {
    expect(response.ok()).toBeFalsy();
    expect(response.status()).toBe(expectedStatus);
  }
}