import React from 'react'
import { CCard, SkeletonFull, CDialog, CToolbar, CTable, CTitle } from '../../../ui-componets'
import { Grid, Button, TableContainer, Typography, IconButton, Stack, ButtonGroup } from '@mui/material'
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import { useSelector } from 'react-redux'
import { AddOutlined, EditOutlined } from '@mui/icons-material'
import CUpdateAgencyForm from './forms/CUpdateAgencyForm';
import CCreateAgencyForm from './forms/CCreateAgencyForm';
export default function VCAgencies() {
    const [createDialogOpen, setCreateDialogOpen] = React.useState(false)
    const [updateDialogOpen, setUpdateDialogOpen] = React.useState(false)
    const [refreshTable, setRefreshTable] = React.useState(false)
    const [agencyUpdateId, setAgencyUpdateId] = React.useState(null)
    const { screenXs } = useSelector(states => states.R_AdminLayout)
    const desktopColumns = [
        {
            name: <Typography fontWeight={900}>نام نمایندگی</Typography>,
            selector: row => row.name,
            orderable: true,
            sortable: true
        },
        {
            name: <Typography fontWeight={900}>تعداد کارمندان</Typography>,
            selector: row => row.totalEmployees,
            orderable: true,
            sortable: true
        },
        {
            name: <Typography fontWeight={900}>گزینه ها</Typography>,
            selector: row => <>
                <CTitle title="ویرایش نمایندگی">
                    <IconButton onClick={() => handleEditClick(row.id)}>
                        <EditOutlined />
                    </IconButton>

                </CTitle>
            </>
        }
    ]
    const mobileColumns = [
        {
            name: <Typography fontWeight={900}>نمایندگی</Typography>,
            selector: row => <Stack direction="column" spacing={2}>
                <Typography fontWeight={900}>{row.name}</Typography>
                <Typography>تعداد کارمندان: {row.totalEmployees}</Typography>
                <ButtonGroup fullWidth >
                    <Button onClick={() => handleEditClick(row.id)}>
                        <EditOutlined />
                    </Button>
                </ButtonGroup>
            </Stack>,
        }
    ]
    const handleEditClick = (id) => {
        setAgencyUpdateId(id)
        setUpdateDialogOpen(true)
    }
    function toggleRefreshTable() {
        setRefreshTable(!refreshTable)
    }
    function handleSubmitDone() {
        setUpdateDialogOpen(false)
        setCreateDialogOpen(false)
        toggleRefreshTable()
    }


    return (
        <Grid container spacing={2}>
            <Grid item lg={12} md={12} sm={12} xs={12}>
                <CCard
                    title="نمایندگی های"
                    subHeader="جدول نمایندگی های شرکت"
                    headerIcon={<ListAltOutlinedIcon />}
                >
                    {updateDialogOpen && <CDialog
                        title="ویرایش نمایندگی"
                        onClose={() => setUpdateDialogOpen(false)}
                        open={updateDialogOpen}
                    >
                        <CUpdateAgencyForm onSubmitDone={handleSubmitDone} agencyId={agencyUpdateId} />
                    </CDialog>}
                    {createDialogOpen && <CDialog
                        title="نمایندگی جدید"
                        onClose={() => setCreateDialogOpen(false)}
                        open={createDialogOpen}
                    >
                        <CCreateAgencyForm onSubmitDone={handleSubmitDone} />
                    </CDialog>}
                    <CToolbar>
                        <Button startIcon={<AddOutlined />} onClick={() => setCreateDialogOpen(true)}>جدید</Button>
                    </CToolbar>
                    <TableContainer>
                        <CTable
                            columns={screenXs ? mobileColumns : desktopColumns}
                            striped
                            serverUrl="company/agencies"
                            refreshState={refreshTable}
                        />
                    </TableContainer>
                </CCard>
            </Grid>
        </Grid>
    )
}