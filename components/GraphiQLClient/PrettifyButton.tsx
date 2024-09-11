import { usePrettifyEditors, useQueryEditor } from '@graphiql/react';
import { Button } from '@mui/material';

function PrettifyButton() {
  const editor = useQueryEditor();
  const prettifyEditors = usePrettifyEditors();

  const handlePrettifyClick = () => {
    if (editor) {
      prettifyEditors();
    }
  };

  return (
    <Button onClick={handlePrettifyClick} variant="outlined">
      Prettify query
    </Button>
  );
}

export default PrettifyButton;
