// import {useTheme} from "@mui/material/styles";
import {useEffect, useState} from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import {Box, Button, Checkbox, Grid, TableSortLabel, Typography} from "@mui/material";
import {visuallyHidden} from "@mui/utils";
import RefreshIcon from '@mui/icons-material/Refresh';
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import {LoadingButton} from "@mui/lab";
import ConfirmDeleteDialog from "./ConfirmDeleteDialog";
import VisibilityIcon from '@mui/icons-material/Visibility';
import IconButton from "@mui/material/IconButton";

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
                <TableCell align="right">Actions</TableCell>
            </TableRow>
        </TableHead>
    );
}

const DataTable = ({ data, columns, fetch, deleteRequest, selected, setSelected, DialogManage }) => {
    const [refresh, setRefresh] = useState(true);

    // table display
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    // filter data
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('id');
    const [sortedData, setSortedData] = useState([]);

    // delete dialog
    const [deleteConfirm, setDeleteConfirm] = useState(false);
    const [deleting, setDeleting] = useState(false);

    // requests states
    const [addRequest, setAddRequest] = useState(false);
    const [editRequest, setEditRequest] = useState(null);

    const loading = refresh && sortedData.length > 0;

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
            setTimeout(() => {
                fetch(true);
                setRefresh(false);
            }, 500);
        }
    }, [refresh, fetch]);

    useEffect(() => {
        if (deleting && selected.length > 0) {
            deleteRequest(selected[0]);
            setSelected(selected.slice(1));
        }

        if (selected.length === 0 && deleting) {
            setRefresh(true);

            setDeleting(false);
            setDeleteConfirm(false);
        }

    }, [deleting, selected, deleteRequest, setRefresh, setSelected, setDeleting, setDeleteConfirm]);


    // handle sorting
    useEffect(() => {
        if (orderBy !== undefined) {
            const propertyColumn = columns.find(column => column.id === orderBy);
            const sortedData = propertyColumn.sortFunction(data, order);

            setSortedData(sortedData);
        } else {
            setSortedData(data);
        }
    }, [data, setSortedData, orderBy, order, columns]);



    return (
        <Box>
            <DialogManage addRequest={addRequest} setAddRequest={setAddRequest} setRefresh={setRefresh} item={editRequest} setEditRequest={setEditRequest} />
            <Grid container alignItems="center" justifyContent="space-between" sx={{mb:2}}>

                <ConfirmDeleteDialog deleteConfirm={deleteConfirm} selectedLength={selected.length} deleting={deleting} setDeleting={setDeleting}/>

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
                <Grid item>
                    <Button
                        size="small"
                        sx={{ml: 1}}
                        onClick={() => setSelected([])}
                        disabled={selected.length === 0}
                        color={selected.length === 0 ? "inherit" : "secondary"}
                    >
                        Clear
                    </Button>
                    <LoadingButton
                        variant="outlined"
                        size="small"
                        onClick={() => setRefresh(true)}
                        loading={loading}
                        color="primary"
                    >
                        <RefreshIcon/>
                    </LoadingButton>
                    <Button
                        variant="outlined"
                        size="small"
                        sx={{ml: 1}}
                        onClick={() => setDeleteConfirm(true)}
                        disabled={selected.length === 0}
                        color={selected.length === 0 ? "inherit" : "error"}
                    >
                        <DeleteOutlineIcon/>
                    </Button>
                    <Button
                        variant="contained"
                        size="small"
                        sx={{ml: 1}}
                        onClick={() => setAddRequest(true)}
                    >
                        <AddIcon/>
                    </Button>


                </Grid>
            </Grid>
            <TableContainer sx={{ minHeight: '70vh', borderRadius: "20px" }}>
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
                            sortedData
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    const isItemSelected = selected.indexOf(row.id) !== -1;
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <TableRow
                                            hover
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={index}
                                            selected={isItemSelected}
                                        >
                                            <TableCell padding="checkbox">
                                                <Checkbox
                                                    checked={isItemSelected}
                                                    onClick={(event) => handleSelectClick(event, row.id)}
                                                    inputProps={{ 'aria-labelledby': labelId }}
                                                />
                                            </TableCell>
                                            {columns.map((column, index) => {
                                                const value = row[column.id] ? row[column.id] : "";
                                                return (
                                                    <TableCell key={index} align={column.align}>
                                                        {column.format ? column.format(value) : value}
                                                    </TableCell>
                                                );
                                            })}
                                            <TableCell align="right">
                                                <IconButton
                                                    size="small"
                                                    onClick={() => setEditRequest(row)}
                                                >
                                                    <VisibilityIcon/>
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })
                        )}
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