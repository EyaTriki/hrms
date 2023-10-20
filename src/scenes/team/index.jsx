import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  useTheme,
  Pagination,
  Avatar
} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataTeam } from "../../data/mockData";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";

const Team = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [page, setPage] = useState(1);
  const itemsPerPage = 12;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const renderAccessIcon = (access) => {
    if (access === "admin") {
      return <AdminPanelSettingsOutlinedIcon />;
    } else if (access === "manager") {
      return <SecurityOutlinedIcon />;
    } else {
      return <LockOpenOutlinedIcon />;
    }
  };

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedData = mockDataTeam.slice(startIndex, endIndex);

  return (
    <Box m="20px">
      <Header title="EMPLOYEES" subtitle="All employees" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
      <Grid container spacing={3} >
        {displayedData.map((data) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={data.id}  >
            <Card sx={{ backgroundColor:colors.primary[400]}} >
              <CardContent style={{ display: "flex" }}>
                {/* Circular avatar */}
                <Avatar
                  alt={data.name}
                  src={data.photo}
                  sx={{
                    width: 100,
                    height: 100,
                    marginRight: 6,
                  }}
                />

                <div>
                  <Typography variant="h6" component="div">
                    {data.name}
                  </Typography>
                  <Typography color={colors.greenAccent[300]} gutterBottom>
                    {data.age} years old
                  </Typography>
                  <Typography gutterBottom>{data.phone}</Typography>
                  <Typography gutterBottom>{data.email}</Typography>
                  <Box
                    display="flex"
                    alignItems="center"
                    backgroundColor={
                      data.access === "admin"
                        ? colors.blueAccent[700]
                        : data.access === "manager"
                        ? colors.blueAccent[700]
                        : colors.blueAccent[700]
                    }
                    borderRadius="4px"
                    padding="5px"
                  >
                    {renderAccessIcon(data.access)}
                    <Typography color={colors.grey[100]} sx={{ ml: "15px" }}>
                      {data.access}
                    </Typography>
                  </Box>
                </div>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Box mt={2} display="flex" justifyContent="center">
        <Pagination
          count={Math.ceil(mockDataTeam.length / itemsPerPage)}
          page={page}
          onChange={handleChangePage}
        />
      </Box>
      </Box>
    </Box>
  );
};

export default Team;
