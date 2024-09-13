import { usePrettifyEditors, useQueryEditor } from '@graphiql/react';
import { Button } from '@mui/material';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';

function PrettifyButton() {
  const editor = useQueryEditor();
  const prettifyEditors = usePrettifyEditors();
  const tToast = useTranslations('ToastMessages');

  const handlePrettifyClick = () => {
    if (editor) {
      try {
        prettifyEditors();
      } catch {
        toast.error(tToast('general.prettifyError'));
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
