import { selectResponse } from '@/redux/features/mainSlice';
import { useAppSelector } from '@/redux/hooks';
import Editor from '@monaco-editor/react';
import { Box } from '@mui/material';
import CustomTabPanel from '../Form/CustomTabPanel';

type PropTypes = {
  activeTab: number;
};

function ResponseBody({ activeTab }: PropTypes) {
  const { data, parsedHeaders } = useAppSelector(selectResponse);

  return (
    <Box component="div">
      <CustomTabPanel value={activeTab} index={0}>
        <Editor
          height="500px"
          defaultLanguage="json"
          theme="vs-dark"
          defaultValue={data}
          options={{
            readOnly: true,
            minimap: {
              enabled: false,
            },
            smoothScrolling: true,
            lineNumbersMinChars: 4,
            wordSeparators: '~!@#$%^&*()-=+[{]}|;:\'",.<>/?',
            wordWrap: 'on',
            wordWrapBreakAfterCharacters: '\t})]?|&,;',
            wordWrapBreakBeforeCharacters: '{([+',
            wordWrapColumn: 80,
            wrappingIndent: 'indent',
          }}
        />
      </CustomTabPanel>
      <CustomTabPanel value={activeTab} index={1}>
        {JSON.stringify(parsedHeaders)}
      </CustomTabPanel>
    </Box>
  );
}
export default ResponseBody;
