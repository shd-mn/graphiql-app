import { ApiRequest, RequestParam } from '@/types/api.types';

export function replaceVariables(obj: ApiRequest): ApiRequest {
  let jsonString = JSON.stringify(obj);

  obj.variables.forEach((variable: RequestParam) => {
    const regex = new RegExp(`{{${variable.key}}}`, 'g');
    jsonString = jsonString.replace(regex, variable.value);
  });

  return JSON.parse(jsonString) as ApiRequest;
}
