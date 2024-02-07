import React, { useState ,useEffect } from "react";
import axios from 'axios';
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
import { Link } from 'react-router-dom';
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

  const renderAccessIcon = (role) => {
    if (role === "admin") {
      return <AdminPanelSettingsOutlinedIcon />;
    } else if (role === "manager") {
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
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/employes/"); 
        setEmployees(response.data); 
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchEmployees();
  }, []);

  return (
    <Box m="20px">
      <Header title="EMPLOYEES" subtitle="All employees" />
       <Link to="/form" style={{ textDecoration: 'none' }}>
      <Button
          variant="contained"
          sx={{
            backgroundColor: colors.blueAccent[700],
            color: colors.grey[100],
            fontSize: "14px",
            fontWeight: "bold",
            padding: "10px 20px",
          }}
          onClick={handleCreateEmployee}
          style={{ marginBottom: "8x", marginLeft:"1060px", marginTop:"-100px" }}
        >
          Create Employee
        </Button>
        </Link>
      <Box m="5px 0" sx={{ display: "flex", flexDirection: "column", marginTop: "-28px"  }}>

        <Grid container spacing={2}>
          {employees.map((data) => (
            <Grid item xs={11} sm={5} md={3} lg={3} key={data.id}>
              <Card sx={{ backgroundColor: colors.primary[400] }}>
                <CardContent style={{ display: "flex" }}>
                  {/* Circular avatar */}
                  <Avatar
                    alt={data.name}
                    src={data.image}
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
                        data.role === "admin"
                          ? colors.blueAccent[700]
                          : data.role === "manager"
                          ? colors.blueAccent[700]
                          : colors.blueAccent[700]
                      }
                      borderRadius="4px"
                      padding="4px"
                    >
                      {renderAccessIcon(data.role)}
                      <Typography color={colors.grey[100]} sx={{ ml: "10px" }}variant="h6">
                        {data.role}
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
