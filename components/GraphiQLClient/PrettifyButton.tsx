import { usePrettifyEditors, useQueryEditor } from '@graphiql/react';
import { Button } from '@mui/material';
import { toast } from 'sonner';
import { toastMessages } from '@/constants/toastMessages';

function PrettifyButton() {
  const editor = useQueryEditor();
  const prettifyEditors = usePrettifyEditors();

  const handlePrettifyClick = () => {
    if (editor) {
      try {
        prettifyEditors();
      } catch {
        toast.error(toastMessages.prettifyError);
      }
    }
  };

  return (
    <Button onClick={handlePrettifyClick} variant="outlined">
      Prettify query
    </Button>
  );
}

export default PrettifyButton;
