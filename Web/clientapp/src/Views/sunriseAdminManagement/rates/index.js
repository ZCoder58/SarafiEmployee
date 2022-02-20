import { Grid, Button, Typography, IconButton} from "@mui/material";
import { AskDialog, ImagePreview, CCard, CDialog, CTable } from "../../../ui-componets";
import AutoAwesomeMotionIcon from '@mui/icons-material/AutoAwesomeMotion';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import React from 'react';
import authAxiosApi from '../../../axios';
import AddIcon from '@mui/icons-material/Add';
import CountriesRatesStatics from "../../../helpers/statics/CountriesRatesStatic";
import CreateMRateForm from "./CreateMRateForm";
import UpdateMRateForm from "./UpdateMRateForm";
export default function VMRate() {
    const [refreshTableState, setRefreshTableState] = React.useState(false)
    const [createFormDialogOpen, setCreateFormDialogOpen] = React.useState(false)
    const [updateFormDialogOpen, setUpdateFormDialogOpen] = React.useState(false)
    const [editRateId, setEditRateId] = React.useState('')
    const [askOpen, setAskOpen] = React.useState(false)
    const [rateIdForDelete, setRateIdForDelete] = React.useState("")
    const askForDelete = (agencyId) => {
        setAskOpen(true)
        setRateIdForDelete(s => s = agencyId)
    }
    const columns = [
        {
            sortField: "flagPhoto",
            name: <Typography variant="body2" fontWeight={600}>نشان</Typography>,
            selector: row => <ImagePreview  size={30} imagePath={CountriesRatesStatics.flagPath(row.flagPhoto)}/>,
            sortable: false,
            reorder: true
        },
        {
            sortField: "faName",
            name: <Typography variant="body2" fontWeight={600}>نام کشور</Typography>,
            selector: row => row.faName,
            sortable: true,
            reorder: true
        },
        {
            sortField: "priceName",
            name: <Typography variant="body2" fontWeight={600}>نام ارز</Typography>,
            selector: row => row.priceName,
            sortable: true,
            reorder: true
        },
        {

            sortField: "abbr",
            name: <Typography variant="body2" fontWeight={600}>مخفف</Typography>,
            selector: row => row.abbr,
            sortable: true,
            reorder: true
        },
        {
            name: "گزینه ها",
            selector: row => (
                <>
                    <IconButton color="error" onClick={() => askForDelete(row.id)}>
                        <DeleteOutlinedIcon />
                    </IconButton>
                    <IconButton color="info" onClick={() => openUpdateDialog(row.id)}>
                        <ModeEditOutlineOutlinedIcon />
                    </IconButton>
                </>
            ),
            minWidth:"122px"
        }
    ]
    function refreshTable() {
        setRefreshTableState(s => s = !refreshTableState)
    }
    function closeAsk() {
        setAskOpen(false)
    }
    async function deleteRate() {
        await authAxiosApi.delete(`management/rates/${rateIdForDelete}`);
        setAskOpen(false)
        setRateIdForDelete(s => s = "")
        refreshTable()
    }
    function openUpdateDialog(id) {
        setEditRateId(id)
        setUpdateFormDialogOpen(true)
    }
    function afterUpdateDone() {
        refreshTable()
        setUpdateFormDialogOpen(false)
    }
    function afterCreateDone() {
        refreshTable()
        setCreateFormDialogOpen(false)
    }
    
    return (
        <CCard title="ارز کشورها" headerIcon={<AutoAwesomeMotionIcon />}>
            <Grid container spacing={3}>
                <Grid item lg={12} sm={12} md={12} xs={12}>
                    <Button variant="contained" color="primary" onClick={() => setCreateFormDialogOpen(s => s = true)} startIcon={<AddIcon />}>
                        ارز جدید
                    </Button>
                    {createFormDialogOpen &&
                        <CDialog open={createFormDialogOpen} onClose={() => setCreateFormDialogOpen(false)} title="ارز جدید">
                            <CreateMRateForm afterSubmit={() => afterCreateDone()} />
                        </CDialog>
                    }
                    {updateFormDialogOpen &&
                        <CDialog open={updateFormDialogOpen} onClose={() => setUpdateFormDialogOpen(false)} title="ویرایش ارز">
                            <UpdateMRateForm rateId={editRateId} afterSubmit={() => afterUpdateDone()} />
                        </CDialog>
                    }
                </Grid>
                <Grid item lg={12} sm={12} md={12} xs={12}>
                    <AskDialog onYes={() => deleteRate()} open={askOpen} onNo={() => closeAsk()} />
                    <CTable
                        columns={columns}
                        serverUrl='management/rates'
                        refreshState={refreshTableState}
                    />
                </Grid>
            </Grid>
        </CCard>
    )
}