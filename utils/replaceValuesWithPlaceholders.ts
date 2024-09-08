import { RequestType } from '@/types';

export function replaceValuesWithPlaceholders(obj: RequestType): RequestType {
  let jsonString = JSON.stringify(obj);

  obj.variables.forEach((variable) => {
    const regex = new RegExp(variable.value.replace(/[-\\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g');
    jsonString = jsonString.replace(regex, `{{${variable.key}}}`);
  });

  return JSON.parse(jsonString) as RequestType;
}
