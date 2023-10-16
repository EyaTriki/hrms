import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  useTheme,
  Pagination,
} from "@mui/material";
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
      <Header title="TEAM" subtitle="Managing the Team Members" />
      <Grid container spacing={3}>
        {displayedData.map((data) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={data.id}>
            <Card>
              <CardContent>
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
                      ? colors.greenAccent[600]
                      : data.access === "manager"
                      ? colors.greenAccent[700]
                      : colors.greenAccent[700]
                  }
                  borderRadius="4px"
                  padding="5px"
                >
                  {renderAccessIcon(data.access)}
                  <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
                    {data.access}
                  </Typography>
                </Box>
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
  );
};

export default Team;
