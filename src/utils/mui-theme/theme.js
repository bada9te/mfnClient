import { createTheme } from "@mui/material";
import getCurrentLanguageFromLS from "../common-functions/getCurrentLanguageFromLS";

const muiTheme = (mode) => {
    // theme setup
    return createTheme({
        palette: {
            mode,
            primary : {
                main: '#1C94A4',
                light: '#42a5f5',
                dark: '#257a76',
                contrastText: '#fff',
            },    
        },
        typography: {
            fontFamily: getCurrentLanguageFromLS() === 'en' ? ['Poppins','static'].join(',') : ['Open Sans', 'sans-serif'].join(','),
            fontWeightRegular: 600,
        },
        components: {
            MuiButton: {
                styleOverrides: {
                    root: {
                        borderRadius: 25,
                        padding: 7.5,
                        paddingLeft: 20,
                        paddingRight: 20,
                        transition: '500ms',
                        fontWeight: 800,
                    },
                }
            },
            MuiInputBase: {
                styleOverrides: {
                    root: {
                        '& fieldset': {
                            borderRadius: 25,
                            marginBottom: 4,
                        },
                    },
                }
            },
            MuiTab: {
                styleOverrides: {
                    root: {
                        color: 'white',
                        "&.Mui-selected": {
                            color: 'white',
                        },           
                    },
                }
            },
            MuiTabs: {
                styleOverrides: {
                    indicator: {
                        backgroundColor: 'white',
                        height: 4,
                    },
                },
            },
            MuiPaginationItem: {
                styleOverrides: {
                    root: {
                        color: 'white',
                    }
                }
            },
            MuiPaper: {
                defaultProps: {
                    elevation: 3
                }
            },
        }
    });
}


export default muiTheme;