'use client';
import CodeMirror from '@uiw/react-codemirror';
import { json } from '@codemirror/lang-json';
import { vscodeDark } from '@uiw/codemirror-theme-vscode/cjs/dark';
import { Box } from '@mui/material';

function ResponseSection({ data }: { data: string }) {
  return (
    <Box component="section" className="p-3">
      <CodeMirror
        className="w-full"
        height="500px"
        readOnly
        value={data}
        theme={vscodeDark}
        basicSetup={{
          foldGutter: true,
        }}
        extensions={[json()]}
      />
    </Box>
  );
}
export default ResponseSection;
