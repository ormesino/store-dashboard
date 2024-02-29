import { Delete } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
} from "@mui/material";
import * as React from "react";

export default function DeleteModal({
  updateCurrent,
  handleDelete,
  data,
  row,
}: {
  updateCurrent: Function;
  handleDelete: Function;
  data: Array<Object>;
  row: Object;
}) {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <IconButton
        onClick={() => setOpen(true)}
        aria-label="delete"
        color="error"
      >
        <Delete />
      </IconButton>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Você deseja excluir este item?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Após a exclusão, não será possível recuperar esse registro.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={() => setOpen(false)}>
            Voltar
          </Button>
          <Button
            onClick={() => {
              updateCurrent(data.filter((item) => item !== row));
              handleDelete(Object.values(row)[0]);
              setOpen(false);
            }}
            autoFocus
            color="error"
            variant="contained"
          >
            Excluir
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
