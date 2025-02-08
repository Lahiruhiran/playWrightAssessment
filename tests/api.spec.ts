import { expect, test } from '@playwright/test';
import { ObjectsApi } from '../src/api/objects.api';
import { ObjectDataProvider } from '../src/data/providers/object.provider';
import { ApiAssertions } from '../src/utils/assertions';
import { ObjectResponse } from '../src/types/response.types';

test.describe('REST API Tests', () => {
  let objectsApi: ObjectsApi;
  let createdObjectId: string;

  test.beforeEach(({ request }) => {
    objectsApi = new ObjectsApi(request);
  });

  test('verify should get list of all objects', async () => {
    const response = await objectsApi.getAllObjects();
    const data = await ApiAssertions.assertSuccessfulResponse(response);
    
    expect(Array.isArray(data)).toBeTruthy();
    expect(data.length).toBeGreaterThan(0);
    
    await ApiAssertions.assertObjectStructure(data[0]);
  });

  test('verify should create a new object', async () => {
    const testObject = ObjectDataProvider.getTestObject();
    const response = await objectsApi.createObject(testObject);
    const data = await ApiAssertions.assertSuccessfulResponse(response) as ObjectResponse;
    
    await ApiAssertions.assertObjectStructure(data);
    await ApiAssertions.assertObjectMatch(data, testObject);
    
    createdObjectId = data.id;
  });

  test('verify should get a single object by ID', async () => {
    const testObject = ObjectDataProvider.getTestObject();
    let response = await objectsApi.createObject(testObject);
    let data = await ApiAssertions.assertSuccessfulResponse(response) as ObjectResponse;
    createdObjectId = data.id;
    response = await objectsApi.getObjectById(createdObjectId);
    data = await ApiAssertions.assertSuccessfulResponse(response) as ObjectResponse;
    
    expect(data.id).toBe(createdObjectId);
    await ApiAssertions.assertObjectMatch(data, testObject);
  });

  test('verify should update an existing object', async () => {

    const testObject = ObjectDataProvider.getTestObject();
    let response = await objectsApi.createObject(testObject);
    let data = await ApiAssertions.assertSuccessfulResponse(response) as ObjectResponse;
    createdObjectId = data.id;
    const updatedObject = ObjectDataProvider.getUpdatedObject();
    response = await objectsApi.updateObject(createdObjectId, updatedObject);
    data = await ApiAssertions.assertSuccessfulResponse(response) as ObjectResponse;
    
    expect(data.id).toBe(createdObjectId);
    await ApiAssertions.assertObjectMatch(data, updatedObject);
  });

  test('verify should delete an object', async () => {
    const testObject = ObjectDataProvider.getTestObject();
    const response = await objectsApi.createObject(testObject);
    const data = await ApiAssertions.assertSuccessfulResponse(response) as ObjectResponse;
    createdObjectId = data.id;
    const deleteResponse = await objectsApi.deleteObject(createdObjectId);
    expect(deleteResponse.ok()).toBeTruthy();
    
    // Verify object is deleted
    const getResponse = await objectsApi.getObjectById(createdObjectId);
    await ApiAssertions.assertErrorResponse(getResponse, 404);
  });

  test('verify should handle non-existent object gracefully', async () => {
    const response = await objectsApi.getObjectById('non-existent-id');
    await ApiAssertions.assertErrorResponse(response, 404);
  });

  test('verify should handle delete of non-existent object gracefully', async () => {
    const response = await objectsApi.deleteObject('non-existent-id');
    await ApiAssertions.assertErrorResponse(response, 404);
  });
});