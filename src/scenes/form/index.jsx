import { Box, Button, TextField, Select, MenuItem, FormControl, InputLabel, InputAdornment, useTheme } from "@mui/material";
import { Formik, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import axios from 'axios';
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";

const Form = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const handleFormSubmit = async (values) => {
    try {
      // Envoie des données du formulaire vers l'API back-end
      const response = await axios.post('http://localhost:5001/api/employes', values);

      // Gérer la réponse si la création réussit
      console.log('Employee created:', response.data);
      // Faire quelque chose avec la réponse si nécessaire (par exemple, rediriger l'utilisateur)
    } catch (error) {
      // Gérer les erreurs en cas d'échec de la création
      console.error('Error creating employee:', error);
      // Afficher un message à l'utilisateur ou gérer l'erreur de toute autre manière
    }
  };

  const phoneRegExp = /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;
  const initialValues = {
    name: "",
    email: "",
    phone: "",
    address: "",
    joiningDate: "",
    age: "",
    role: "",
    file: null,
    password: "",
  };
  
  const checkoutSchema = yup.object().shape({
    name: yup.string().required("Full Name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    phone: yup.string().matches(phoneRegExp, "Phone number is not valid").required("Phone number is required"),
    address: yup.string().required("Address is required"),
    joiningDate: yup.date().required("Joining Date is required"),
    age: yup.number().required("Age is required").positive("Age must be positive").integer("Age must be an integer"),
    role: yup.string().required("Role is required"),
    file: yup.mixed(),
    password: yup.string().required("Password is required"),
  });

  return (
    <Box m="20px">
      <Header title="ADD EMPLOYEE" subtitle="Create a New Employee Profile" />

      <Formik
        initialValues={initialValues}
        validationSchema={checkoutSchema}
        onSubmit={handleFormSubmit}
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
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="40px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" , marginTop:0.3},
              }}
            >
              <Box gridColumn="span 1" display="flex" justifyContent="center" alignItems="center">
              <label htmlFor="image-upload">
  <input
    accept="image/*"
    id="image-upload"
    type="file"
    name="image" // Assurez-vous que le champ name correspond à celui attendu par votre backend
    onChange={(event) => {
      const file = event.currentTarget.files[0];
      setFieldValue("file", file);
    }}
    style={{ display: 'none' }}
  />
  <Box
    width="100px"
    height="100px"
    borderRadius="50%"
    bgcolor="#f0f0f0"
    display="flex"
    justifyContent="center"
    alignItems="center"
    cursor="pointer"
  >
    {values.file ? (
      <img
        src={URL.createObjectURL(values.file)}
        alt="Preview"
        style={{ maxWidth: '100%', maxHeight: '100%', borderRadius: '50%' }}
      />
    ) : (
      <InsertPhotoIcon fontSize="large" style={{ color: theme.palette.primary.dark }} />

    )}
  </Box>
</label>
          </Box>
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Full Name"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.name}
              name="name"
              error={!!touched.name && !!errors.name}
              helperText={touched.name && errors.name}
              sx={{ gridColumn: "span 2", backgroundColor: colors.primary[400] }}
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
                value={values.phone}
                name="phone"
                error={!!touched.phone && !!errors.phone}
                helperText={touched.phone && errors.phone}
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
                type="text"
                label="Age "
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.age}
                name="age"
                error={!!touched.age && !!errors.age}
                helperText={touched.age && errors.age}
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
                  <MenuItem value="Graphic Designer">Graphic Designer</MenuItem>
                  <MenuItem value="Web Developer">Web Developer</MenuItem>
                  <MenuItem value="Mobile Developer">Mobile Developer</MenuItem>
                  <MenuItem value="DevOps">DevOps</MenuItem>
                  <MenuItem value="Team Lead">Team Lead</MenuItem>
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
                Create New Employee
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
  phone: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("required"),
  address: yup.string().required("required"),
  role: yup.string().required("Please select a role"), 
});
const initialValues = {
  name: "",
  phone:"",
  email: "",
  phone: "",
  address: "",
  role: "", 
  file: null,
  password:"",
  image: null,
};

export default Form;