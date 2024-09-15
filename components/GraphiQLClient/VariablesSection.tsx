import { useVariableEditor, VariableEditor, useVariablesEditorState } from '@graphiql/react';
import { useAppDispatch } from '@/redux/hooks';
import { setVariables } from '@/redux/features/graphiqlSlice';

function VariablesSection() {
  const dispatch = useAppDispatch();
  const editor = useVariableEditor();
  const state = useVariablesEditorState();

  if (editor && state) {
    setTimeout(() => dispatch(setVariables(state[0])));
  }
  return (
    <div className="flex h-32 w-full flex-col">
      <VariableEditor />
    </div>
  );
}

export default VariablesSection;
