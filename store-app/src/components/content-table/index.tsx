"use client";

import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import DeleteModal from "../delete-modal";
import FormModal from "../form-modal";

export default function ContentTable({
  data,
  handleContent,
  handleDelete,
  header,
}: {
  data: Array<Object>;
  handleContent: Function;
  handleDelete: Function;
  header: Array<string>;
}) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
            {header.map((title) => (
              <TableCell key={title}>{title}</TableCell>
            ))}
            <TableCell key="actions">Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow hover key={index}>
              {Object.values(row).map((value, index) => (
                <TableCell key={index}>{value}</TableCell>
              ))}
              <TableCell key="actions">
                <FormModal />
                <DeleteModal
                  updateCurrent={handleContent}
                  data={data}
                  row={row}
                  handleDelete={handleDelete}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
