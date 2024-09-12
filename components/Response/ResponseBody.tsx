import { useMemo } from 'react';
import { selectResponse } from '@/redux/features/mainSlice';
import { useAppSelector } from '@/redux/hooks';
import Editor from '@monaco-editor/react';
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import CustomTabPanel from '../UI/CustomTabPanel';

type PropTypes = {
  activeTab: number;
};

function ResponseBody({ activeTab }: PropTypes) {
  const { data, parsedHeaders } = useAppSelector(selectResponse);

  const headers = Object.entries(parsedHeaders).map(([key, value]) => ({
    key,
    value,
  }));

  const editorLanguage = useMemo(() => {
    const contentType = parsedHeaders['content-type'] || '';
    if (contentType.includes('application/json')) {
      return 'json';
    } else if (contentType.includes('text/html')) {
      return 'html';
    } else if (contentType.includes('text/xml')) {
      return 'xml';
    }
    return 'text';
  }, [parsedHeaders]);

  return (
    <Box component="div" className="mb-1 flex h-full flex-col">
      <CustomTabPanel value={activeTab} index={0} className="h-full flex-grow">
        <Editor
          theme="vs-dark"
          defaultLanguage={editorLanguage}
          value={data}
          loading={null}
          options={{
            readOnly: true,
            minimap: {
              enabled: false,
            },
            smoothScrolling: true,
            scrollbar: {
              verticalScrollbarSize: 12,
              horizontalScrollbarSize: 12,
            },
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
      <CustomTabPanel value={activeTab} index={1} className="h-full flex-grow overflow-auto">
        <TableContainer component={Paper} className="h-full">
          <Table stickyHeader aria-label="response headers table">
            <TableHead>
              <TableRow>
                <TableCell className="w-full">Key</TableCell>
                <TableCell className="w-full">Value</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {headers.map(({ key, value }) => (
                <TableRow key={key} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell className="w-full">{key}</TableCell>
                  <TableCell className="w-full">{value}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CustomTabPanel>
    </Box>
  );
}

export default ResponseBody;
