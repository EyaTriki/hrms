import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  useTheme,
  Pagination,
  Button,
  Avatar,
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
  const handleCreateEmployee = () => {
  
    console.log("Create Employee button clicked");
  };
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedData = mockDataTeam.slice(startIndex, endIndex);

  return (
    <Box m="20px">
      <Header title="EMPLOYEES" subtitle="All employees" />
      <Button
          variant="contained"
          sx={{
            backgroundColor: colors.primary[700], // Use the primary color from the theme
            "&:hover": {
              backgroundColor: colors.primary[500], // Change color on hover
            },
          }}
          onClick={handleCreateEmployee}
          style={{ marginBottom: "10x", marginLeft:"1400px", marginTop:"-110px" }}
        >
          Create Employee
        </Button>
      <Box m="5px 0" sx={{ display: "flex", flexDirection: "column" }}>

        <Grid container spacing={2}>
          {displayedData.map((data) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={data.id}>
              <Card sx={{ backgroundColor: colors.primary[400] }}>
                <CardContent style={{ display: "flex" }}>
                  {/* Circular avatar */}
                  <Avatar
                    alt={data.name}
                    src={data.photo}
                    sx={{
                      width: 100,
                      height: 100,
                      marginRight: 2,
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
                      <Typography color={colors.grey[100]} sx={{ ml: "10px" }}>
                        {data.access}
                      </Typography>
                    </Box>
                  </div>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Box mt={2} display="flex" justifyContent="center">
        <Pagination
          count={Math.ceil(mockDataTeam.length / itemsPerPage)}
          page={page}
          onChange={handleChangePage}
        />
      </Box>
    </Box>
  );
};

export default Team;
