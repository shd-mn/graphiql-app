import { RequestFormTypes } from '@/types/api.types';
import { toast } from 'sonner';

export function replaceValuesWithPlaceholders(obj: RequestFormTypes): RequestFormTypes {
  const { variables, ...rest } = obj;
  let jsonString = JSON.stringify(rest);

  variables.forEach((variable) => {
    if (variable.key && variable.value) {
      const regex = new RegExp(variable.value.replace(/[-\\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g');
      jsonString = jsonString.replace(regex, `{{${variable.key}}}`);
    }
  });

  try {
    return { ...JSON.parse(jsonString), variables } as RequestFormTypes;
  } catch (error) {
    toast.error(`JSON parse error: ${error}`);
    return obj;
  }
}
