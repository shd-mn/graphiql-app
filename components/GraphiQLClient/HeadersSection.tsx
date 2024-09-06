import { useEditorState, useVariableEditor, HeaderEditor } from '@graphiql/react';
import { useAppDispatch } from '@/redux/hooks';
import { setHeaders } from '@/redux/features/graphiqlClient/graphiqlSlice';

function HeadersSection() {
  const dispatch = useAppDispatch();
  const editor = useVariableEditor();

  const state = useEditorState('header');

  if (editor && state) {
    console.log(state, 'state');
    dispatch(setHeaders(state[0]));
  }

  return <HeaderEditor></HeaderEditor>;
}

export default HeadersSection;
