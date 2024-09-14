import { useMemo } from 'react';
import { selectResponse } from '@/redux/features/mainSlice';
import { useAppSelector } from '@/redux/hooks';
import Editor from '@monaco-editor/react';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import CustomTabPanel from '../UI/CustomTabPanel';
import { useTranslations } from 'next-intl';

type PropTypes = {
  activeTab: number;
};

function ResponseBody({ activeTab }: PropTypes) {
  const t = useTranslations('Response');
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
    <Box component="div" className="mb-1 flex h-full flex-grow flex-col overflow-hidden">
      <CustomTabPanel value={activeTab} index={0} className="flex flex-grow flex-col overflow-hidden">
        <Box className="flex flex-grow">
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
        </Box>
      </CustomTabPanel>
      <CustomTabPanel value={activeTab} index={1} className="flex flex-grow-0 flex-col overflow-hidden">
        <TableContainer className="h-full overflow-auto">
          <Table stickyHeader sx={{ minWidth: 450 }} className="pb-2" size="small" aria-label="response headers table">
            <TableHead>
              <TableRow>
                <TableCell className="w-full">{t('key')}</TableCell>
                <TableCell className="w-full">{t('value')}</TableCell>
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
