import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import './Cats.css';
import { getCats } from '../../services/cats.service';
import { useNavigate } from 'react-router-dom';

interface Column {
  id: 'name' | 'origin';
  label: string;
  align?: 'right';
}

const columns: readonly Column[] = [
  { id: 'name', label: 'Breed name' },
  { id: 'origin', label: 'Breed origin' }
];

export default function Cats() {
  const navigate = useNavigate();

  const [cats, setCats] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  React.useEffect(() => {
    setIsLoading(true);
    getCats().then((data: any) => {
      setCats(data);
      localStorage.setItem('cats', JSON.stringify(data))
      setIsLoading(false);
    });
  }, [])

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const navigateToDetailPage = (cat: any) => {
    navigate(`/cat/${cat?.id}`, { replace: true });
  }

  return (
    <div>
      {
        isLoading ? <div className='loading-style'>Loading ...</div> :
          <Paper sx={{ width: '100%', overflow: 'hidden' }} className='app-container'>
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cats
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((cat, index) => {
                      return (
                        <TableRow hover role="checkbox" tabIndex={-1} key={index} style={{ cursor: 'pointer' }} onClick={() => navigateToDetailPage(cat)}>
                          {columns.map((column) => {
                            const value = cat[column.id];
                            return (
                              <TableCell key={column.id}>
                                {value}
                              </TableCell>
                            );
                          })}
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10]}
              component="div"
              count={cats.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
      }
    </div>

  );
}