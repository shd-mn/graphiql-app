import { useVariableEditor, VariableEditor, useVariablesEditorState } from '@graphiql/react';
import { useAppDispatch } from '@/redux/hooks';
import { setVariables } from '@/redux/features/graphiqlClient/graphiqlSlice';

function VariablesSection() {
  const dispatch = useAppDispatch();
  const editor = useVariableEditor();
  const state = useVariablesEditorState();

  // todo: use fetchError for documentation
  // const schemaContext = useSchemaContext();

  if (editor && state) {
    dispatch(setVariables(state[0]));
  }

  return <VariableEditor></VariableEditor>;
}

export default VariablesSection;
