import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import DeleteConfirmationModal from "../deleteConfirmationModal/DeleteConfirmationModal";

const CustomTable = (props) => {
  const { tableHeaders, tableBody, navRoute, delRow } = props;
  const navigate = useNavigate();

  const [confirmDelete, setConfirmDelete] = useState(false);
  const [rowInfo, setRowInfo] = useState(null);

  return (
    <>
      <TableContainer component={Paper}>
        {tableBody && tableBody.length > 0 ? (
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                {tableHeaders.map((item) => (
                  <TableCell key={crypto.randomUUID()}>{item}</TableCell>
                ))}
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tableBody &&
                tableBody.map((row, i) => (
                  <TableRow key={crypto.randomUUID()}>
                    <TableCell>{i + 1}</TableCell>
                    {Object.keys(row)
                      .filter((info) => !["password", "id"].includes(info))
                      .map((item) => (
                        <TableCell key={crypto.randomUUID()}>
                          {row[item]}
                        </TableCell>
                      ))}
                    <TableCell>
                      <EditIcon
                        sx={{ cursor: "pointer" }}
                        onClick={() =>
                          navigate(`${navRoute}${row?.id}`, { state: row })
                        }
                      />
                      <DeleteIcon
                        sx={{ color: "red", cursor: "pointer" }}
                        // onClick={() => delRow(row)}
                        onClick={() => {
                          setConfirmDelete(true);
                          setRowInfo(row);
                        }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        ) : (
          <Typography align={"center"} sx={{ padding: "32px 16px" }}>
            No Data
          </Typography>
        )}
      </TableContainer>

      <DeleteConfirmationModal
        open={confirmDelete}
        handleClose={() => {
          setConfirmDelete(false);
          setRowInfo(null);
        }}
        handleDelete={() => {
          delRow(rowInfo);
          setConfirmDelete(false);
          setRowInfo(null);
        }}
      />
    </>
  );
};

export default CustomTable;
