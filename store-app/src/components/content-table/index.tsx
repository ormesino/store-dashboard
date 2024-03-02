"use client";

import { Edit } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useRouter } from "next/navigation";
import DeleteModal from "../delete-modal";

export default function ContentTable({
  data,
  handleContent,
  handleDelete,
  header,
  url,
}: {
  data: Array<Object>;
  handleContent: Function;
  handleDelete: Function;
  header: Array<string>;
  url: string;
}) {

  const router = useRouter();

  return (
    <TableContainer component={Paper} sx={{maxHeight: 600}}>
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
                <IconButton
                  onClick={() => {
                    router.push(`${url}/edit/${Object.values(row)[0]}`);
                  }}
                  aria-label="edit"
                  color="warning"
                >
                  <Edit />
                </IconButton>
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
