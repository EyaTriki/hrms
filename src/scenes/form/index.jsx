import { Box, Button, TextField, Select, MenuItem, FormControl, InputLabel,InputAdornment ,useTheme,} from "@mui/material";
import { Formik, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import DateRangeIcon from "@mui/icons-material/DateRange"; 
const Form = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const handleFormSubmit = (values) => {
    console.log(values);
  };

  return (
    <Box m="20px">
      <Header title="CREATE EMPLOYEE" subtitle="Create a New Employee Profile" />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          setFieldValue,
        }) => (
          <form onSubmit={handleSubmit} >
            <Box
              display="grid"
              gap="40px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" , marginTop:0.3},
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="First Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.firstName}
                name="firstName"
                error={!!touched.firstName && !!errors.firstName}
                helperText={touched.firstName && errors.firstName}
                sx={{ gridColumn: "span 2" ,backgroundColor:colors.primary[400]}}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Last Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.lastName}
                name="lastName"
                error={!!touched.lastName && !!errors.lastName}
                helperText={touched.lastName && errors.lastName}
                sx={{ gridColumn: "span 2",backgroundColor:colors.primary[400] }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 2" ,backgroundColor:colors.primary[400]}}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Phone Number"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.contact}
                name="contact"
                error={!!touched.contact && !!errors.contact}
                helperText={touched.contact && errors.contact}
                sx={{ gridColumn: "span 2" ,backgroundColor:colors.primary[400]}}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Address "
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.address}
                name="address"
                error={!!touched.address && !!errors.address}
                helperText={touched.address && errors.address}
                sx={{ gridColumn: "span 2" ,backgroundColor:colors.primary[400]}}
              />
                              <TextField
                  fullWidth
                  variant="filled"
                  type="date"
                  label="Joining Date"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.joiningDate}
                  name="joiningDate"
                  InputLabelProps={{ shrink: true }}
                  error={!!touched.joiningDate && !!errors.joiningDate}
                  helperText={touched.joiningDate && errors.joiningDate}
                  sx={{ gridColumn: "span 2", backgroundColor: colors.primary[400] }}
                  InputProps={{
                    startAdornment: null, // Remove the icon
                  }}
                  onClick={(e) => e.preventDefault()} // Prevent the date picker from opening
                  className="white-calendar-icon" // Add a CSS class
                />


              <TextField
                fullWidth
                variant="filled"
                type="date"
                label="Birth Date"
                InputLabelProps={{ shrink: true }}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.birthdate}
                name="birthdate"
                error={!!touched.birthdate && !!errors.birthdate}
                helperText={touched.birthdate && errors.birthdate}
                sx={{ gridColumn: "span 2" ,backgroundColor:colors.primary[400]}}
              />
                {/* Role Selection */}
                <FormControl fullWidth variant="filled"  sx={{ gridColumn: "span 2",backgroundColor:colors.primary[400] }}>
                <InputLabel htmlFor="role">Role</InputLabel>
                <Field
                  as={Select}
                  id="role"
                  name="role"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.role}
                  error={!!touched.role && !!errors.role}
                 
                >
                  <MenuItem value="">Select a role</MenuItem>
                  <MenuItem value="manager">Manager</MenuItem>
                  <MenuItem value="employee">Employee</MenuItem>
                  <MenuItem value="supervisor">Supervisor</MenuItem>
                </Field>
                <ErrorMessage name="role" component="div" className="error" />
              </FormControl>
          
              <TextField
                fullWidth
                variant="filled"
                type="file"
                label="Upload File"
                InputLabelProps={{ shrink: true }}
                onBlur={handleBlur}
                onChange={(event) => setFieldValue("file", event.currentTarget.files[0])}
                sx={{
                  gridColumn: "span 2",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  backgroundColor:colors.primary[400]
                }}
              />
            
            <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
                name="password"
                error={!!touched.password && !!errors.password}
                helperText={touched.password && errors.password}
                sx={{ gridColumn: "span 2" ,backgroundColor:colors.primary[400]}}
              />
            </Box>
            <Box display="flex" justifyContent="center" mt="50px">
              <Button type="submit" color="secondary" variant="contained"sx={{
                 fontSize: '18px' }} >
                Create New User
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  contact: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("required"),
  address: yup.string().required("required"),
  role: yup.string().required("Please select a role"), 
});
const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  contact: "",
  address: "",
  role: "", 
  file: null,
  password:"",
};

export default Form;
