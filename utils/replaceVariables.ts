import { RequestFormTypes, RequestParam, ApiRequest } from '@/types/api.types';

export function replaceVariables<T extends RequestFormTypes | ApiRequest>(obj: T): T {
  const { variables, ...rest } = obj;
  let jsonString = JSON.stringify(rest);

  if (variables) {
    variables.forEach((variable: RequestParam) => {
      const regex = new RegExp(`{{${variable.key}}}`, 'g');
      jsonString = jsonString.replace(regex, variable.value);
    });
  }

  return { ...JSON.parse(jsonString), variables } as T;
}
