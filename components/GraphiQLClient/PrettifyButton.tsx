import { usePrettifyEditors, useQueryEditor } from '@graphiql/react';
import { Button } from '@mui/material';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';
import { AutoFixHigh } from '@mui/icons-material';

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
    <Button
      onClick={handlePrettifyClick}
      size="small"
      variant="outlined"
      startIcon={<AutoFixHigh />}
      className="mr-2 h-8"
    >
      Prettify
    </Button>
  );
}

export default PrettifyButton;
