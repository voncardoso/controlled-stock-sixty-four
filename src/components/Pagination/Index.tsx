import { useEffect, useState } from "react";
import { Pagination } from "@mui/material";
import { createTheme,  ThemeProvider } from '@mui/material/styles';

interface PropsPagination{
    pages: number,
    handleChangePage: any
}

const theme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: '#7A1921',
      },
    },
  });

export function PaginationComponent({pages, handleChangePage}: PropsPagination){

    return(
        <ThemeProvider theme={theme}>
            <Pagination  
            className="paginacao"
                count={pages} 
                shape="rounded" 
                color="primary" 
                onChange={handleChangePage}
            />
            
        </ThemeProvider>
    )
}