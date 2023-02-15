import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import {useEffect, useState} from "react";


const ConfirmDeleteDialog = ({setDeleting, selectedLength, deleteConfirm, deleting, setDeleteConfirm}) => {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        setOpen(deleteConfirm);
    }, [deleteConfirm]);

    const handleClose = () => {
        if (!deleting) {
           setDeleteConfirm(false);
        }
    };

    const handleConfirm = () => {
        setDeleting(true);
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="responsive-dialog-title"
        >
            <DialogTitle id="responsive-dialog-title">
                {"Confirm Delete"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Are you sure you want to delete {selectedLength} item(s)?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={handleClose} disabled={deleting}>
                    Cancel
                </Button>
                <Button onClick={handleConfirm} autoFocus disabled={deleting}>
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default ConfirmDeleteDialog;