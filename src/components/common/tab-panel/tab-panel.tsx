import { Box } from "@mui/material";

export default function TabPanel(props: {
  children: React.ReactNode;
  value: number;
  index: number;
}) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        style={{}}
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
            <Box sx={{ p: 0 }}>
                {children}
            </Box>
        )}
      </div>
    );
}
