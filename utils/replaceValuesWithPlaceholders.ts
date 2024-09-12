import { ApiRequest } from '@/types/api.types';

export function replaceValuesWithPlaceholders(obj: ApiRequest): ApiRequest {
  let jsonString = JSON.stringify(obj);

  obj.variables.forEach((variable) => {
    const regex = new RegExp(variable.value.replace(/[-\\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g');
    jsonString = jsonString.replace(regex, `{{${variable.key}}}`);
  });

  return JSON.parse(jsonString) as ApiRequest;
}
