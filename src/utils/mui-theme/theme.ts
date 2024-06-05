import { PaletteMode, createTheme } from "@mui/material";
import getCurrentLanguageFromLS from "../common-functions/getCurrentLanguageFromLS";


// theme setup
const muiTheme = (mode: PaletteMode) => {
    return createTheme({
        palette: {
            mode,
            primary : {
                main: '#2a7192',
                light: '#DFB6B2',
                contrastText: '#fff',
            },
            secondary: {
                light: "#0AD1C8",
                main: "#80ED99",
                contrastText: 'black',
            },
            info: {
                light: "#0AD1C8",
                main: "#45DFB1",
                contrastText: 'black',
            }
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