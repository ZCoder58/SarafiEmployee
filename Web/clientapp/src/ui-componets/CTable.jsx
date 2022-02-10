import React from 'react'
import authAxiosApi from '../axios'
import DataTable from 'react-data-table-component';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { CircularProgress,Box, TableContainer } from '@mui/material';
import { NotExist } from '.';
// import { Box, Button } from '@mui/material';
CTable.defaultProps = {
  serverUrl: "",
  searchText: "",
  columns: [],
  refreshState: false
}

export default function CTable({ serverUrl, searchText, columns, refreshState, headerActions, selectedActions, expandableRows, ExpandedComponent, striped = false }) {
  const [data, setData] = React.useState([])
  const [loading, setLoading] = React.useState(true)
  const [totalRows, setTotalRows] = React.useState(0);
  // const [toggleCleared, setToggleCleared] = React.useState(false);
  // const [selectedRows, setSelectedRows] = React.useState([]);
  const [filterModel, setFilterModel] = React.useState({
    page: 1,
    perPage: 10,
    column: "",
    direction: "",
    searchText:""
  });

  const handleSort = (column, sortDirection) => {
    setFilterModel(s => s = {
      ...s,
      column: column.sortField,
      direction: sortDirection
    })
  };

  const handlePerRowsChange = (newPerPage, page) => {
    setFilterModel(s => s = {
      ...s,
      page: page,
      perPage: newPerPage
    })
  };

  const handlePageChange = page => {
    setFilterModel(s => s = {
      ...s,
      page: page,
    })
  };

  // const handleRowSelected = React.useCallback(state => {
  //   setSelectedRows(state.selectedRows);
  //   console.log("state : ", state)
  //   console.log("state.selectedRows : ", state.selectedRows)
  // },[]);

  React.useEffect(() => {
    (async () => {
      setLoading(s => s = true)
      filterModel.search=searchText
      const { items, totalCount } = await authAxiosApi.get(serverUrl, {
        params: filterModel
      })
      setData(d => d = items)
      setLoading(s => s = false)
      setTotalRows(totalCount)

    })()
    return () => {
      setData([])
    }
  }, [filterModel, serverUrl, refreshState,searchText])
  // const ContextComp = ({ selectedCount }) => {
  //   return (
  //     <Box sx={{
  //       width: "100%",
  //       display: "flex",
  //       justifyContent: "space-between"
  //     }}>
  //       {selectedCount}سطر انتخاب شد
  //       {selectedActions}
  //     </Box>
  //   )
  // }
  // const headerActionsComponent=(
  //       {headerActions}
  // )
  return (
   <TableContainer>
      <DataTable
      columns={columns}
      persistTableHead
      data={data}
      // onSelectedRowsChange={handleRowSelected}
      responsive
      sortServer
      striped={striped}
      // contextComponent={<ContextComp />}
      onSort={handleSort}
      // actions={headerActionsComponent}
      highlightOnHover
      progressPending={loading}
      expandableRows={expandableRows}
      expandableRowsComponent={ExpandedComponent}//will pass a data to your ExpandedComponent
      // clearSelectedRows={toggleCleared}
      pagination
      // selectableRows
      sortIcon={<ArrowDownwardIcon />}
      progressComponent={<CircularProgress  color="primary" />}
      paginationServer
      noDataComponent={<React.Fragment>
        <NotExist/>
      </React.Fragment>}
      paginationTotalRows={totalRows}
      onChangeRowsPerPage={handlePerRowsChange}
      onChangePage={handlePageChange}
      paginationComponentOptions={{
        rowsPerPageText: "تعداد سطر",
        rangeSeparatorText: 'از',
        noRowsPerPage: false,
        selectAllRowsItem: false,
        selectAllRowsItemText: 'همه',

      }}
    />
   </TableContainer>

  )
}