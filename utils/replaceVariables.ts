import { Param, RequestType } from '@/types';

export function replaceVariables(obj: RequestType): RequestType {
  let jsonString = JSON.stringify(obj);

  obj.variables.forEach((variable: Param) => {
    const regex = new RegExp(`{{${variable.key}}}`, 'g');
    jsonString = jsonString.replace(regex, variable.value);
  });

  return JSON.parse(jsonString) as RequestType;
}
