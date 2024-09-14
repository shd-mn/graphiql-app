import { RequestFormTypes, RequestParam } from '@/types/api.types';

export function replaceVariables(obj: RequestFormTypes): RequestFormTypes {
  let jsonString = JSON.stringify(obj);

  obj.variables.forEach((variable: RequestParam) => {
    const regex = new RegExp(`{{${variable.key}}}`, 'g');
    jsonString = jsonString.replace(regex, variable.value);
  });

  return JSON.parse(jsonString) as RequestFormTypes;
}
