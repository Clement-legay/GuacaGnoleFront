// import {useTheme} from "@mui/material/styles";
import {useEffect, useState} from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import {Box, Checkbox, Grid, TableSortLabel, Typography} from "@mui/material";
import {visuallyHidden} from "@mui/utils";


const EnhancedTableHead = ({ onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort, columns }) => {
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    }

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{ 'aria-label': 'select all desserts' }}
                    />
                </TableCell>
                {columns.map((column, index) => (
                    // sortable boolean contained in column object
                    <TableCell
                        key={index}
                        align={column.align}
                        padding={column.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === column.id ? order : false}
                    >
                        {column.sortable ? (
                            <TableSortLabel
                                active={orderBy === column.id}
                                direction={orderBy === column.id ? order : 'asc'}
                                onClick={createSortHandler(column.id)}
                            >
                                {column.label}
                                {orderBy === column.id ? (
                                    <Box component="span" sx={visuallyHidden}>
                                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                    </Box>
                                ) : null}
                            </TableSortLabel>
                        ) : (
                            column.label
                        )}
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

const DataTable = ({ data, columns, fetch }) => {
    const [selected, setSelected] = useState([]);
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState(undefined);
    const [refresh, setRefresh] = useState(true);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    }

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    }

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = data.map((n) => n.id);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    }

    const handleSelectClick = (event, id) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        setSelected(newSelected);
    }

    useEffect(() => {
        if (refresh) {
            fetch(true);
            setRefresh(false);
        }

        if (data.length > 0) {
            setLoading(false);
        }
    }, [setRefresh, setLoading, data, fetch, refresh]);


    return (
        <Box>
            <Grid container alignItems="center" justifyContent="space-between">
                <Grid item>
                    <Typography variant="caption" sx={{
                        fontSize: "1.5em",
                        fontWeight: 800,
                        color: "text.primary",
                    }}>
                        {loading ? "Loading..." : data.length + " totals"}
                    </Typography>
                    <Typography variant="caption" sx={{
                        fontSize: "1em",
                        fontWeight: 500,
                        color: "text.secondary",
                        ml: 1,
                    }}>
                        {selected.length} selected
                    </Typography>
                </Grid>
            </Grid>
            <Grid container alignItems="center" justifyContent="space-between" sx={{py:1}}>
                <Grid item>

                </Grid>
            </Grid>
            <TableContainer sx={{ maxHeight: 440, borderRadius: "20px" }}>
                <Table stickyHeader aria-label="sticky table">
                    <EnhancedTableHead
                        columns={columns}
                        order={order}
                        orderBy={orderBy}
                        numSelected={selected.length}
                        onSelectAllClick={handleSelectAllClick}
                        onRequestSort={handleRequestSort}
                        rowCount={data.length}
                    />
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={columns.length} align="center">
                                    Loading...
                                </TableCell>
                            </TableRow>
                        ) : (
                            data.map((row, index) => {
                                    const isItemSelected = selected.indexOf(row.id) !== -1;
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <TableRow
                                            hover
                                            onClick={(event) => handleSelectClick(event, row.id)}
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={index}
                                            selected={isItemSelected}
                                        >
                                            <TableCell padding="checkbox">
                                                <Checkbox
                                                    checked={isItemSelected}
                                                    inputProps={{ 'aria-labelledby': labelId }}
                                                />
                                            </TableCell>
                                            {columns.map((column, index) => {
                                                const value = row[column.id];
                                                return (
                                                    <TableCell key={index} align={column.align}>
                                                        {column.format && typeof value === 'number' ? column.format(value) : value}
                                                    </TableCell>
                                                );
                                            })}
                                        </TableRow>
                                    );
                                }
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Box>
    );
}

export default DataTable;