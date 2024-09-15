import { RequestFormTypes, RequestParam } from '@/types/api.types';

export function replaceVariables(obj: RequestFormTypes): RequestFormTypes {
  const { variables, ...rest } = obj;
  let jsonString = JSON.stringify(rest);

  variables.forEach((variable: RequestParam) => {
    const regex = new RegExp(`{{${variable.key}}}`, 'g');
    jsonString = jsonString.replace(regex, variable.value);
  });

  return { ...JSON.parse(jsonString), variables } as RequestFormTypes;
}
