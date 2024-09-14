import { Box } from '@mui/material';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
  className?: string;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, className, ...other } = props;

  return (
    <div
      className={className}
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box className="flex flex-grow flex-col overflow-hidden">{children}</Box>}
    </div>
  );
}

export default CustomTabPanel;
