import { Box, Button, TextField, MenuItem } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";

// values to be replaced with correct db data
const seniorities = [
  {
    value: 'Junior',
    label: 'Junior',
  },
  {
    value: 'Mid',
    label: 'Mid',
  },
  {
    value: 'Senior',
    label: 'Senior',
  },
  {
    value: 'Expert',
    label: 'Expert',
  },
];

// values to be replaced with correct db data
const roles = [
  {
    value: 'Admin',
    label: 'Admin',
  },
  {
    value: 'Manager',
    label: 'Manager',
  },
  {
    value: 'Employee',
    label: 'Employee',
  },
];

// values to be replaced with correct db data
const managers = [
  {
    value: '1',
    label: 'Jan Kowalski',
  },
  {
    value: '2',
    label: 'Andrzej Nowak',
  },
  {
    value: '3',
    label: 'Jan Nowak',
  },
];

// values to be replaced with correct db data
const userGroups = [
  {
    value: '1',
    label: 'Admin',
  },
  {
    value: '2',
    label: 'Manager',
  },
  {
    value: '3',
    label: 'User',
  },
];


const UserForm = () => {

  // if we hit a Min width of 600 pixel we are triggering this basic Boolean so useMediaQuery comes from Material UI 
  // and allows us to use media queries inside our JavaScript or react element itself so we don't have to write it in CSS
  const isNonMobile = useMediaQuery("(min-width:600px)");

  // this function is going to be the function that triggers once we have submitted our form and in this case 
  // we're not really going to do anything with the form we're not going to have anything that triggers anything so 
  // we're just going to have console log values like so we're just going to console log the values as it comes out
  const handleFormSubmit = (values) => {
    console.log(values);
  };

  return (
    <Box m="20px">
      <Header title="CREATE USER" subtitle="Create a New User Profile" />

      <Formik

        // we're going to pass in the function that we created earlier handle form submit and 
        // then we're going to add initial values and we're going to create an object of initial values 
        // so the initial values are going to consist of an object of the values that we want this form to start with 
        // but everything is going to be empty string because we don't want it to have anything 
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        // 
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"

              // gridTemplateColumns: allows us to split the grid into four sections and each of the section is going to have a minimum of zero 
              // so that means they can squash to zero but also a maximum of one fr which is a very specific unit dedicated solely for grids
              // these are fractional units so basically that means each of the columns can have one fraction of the space 
              // unless something pushes it to not be one fraction then it's going to be smaller than that 
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{

                // if it is mobile then we're going to say this is going to be a span of four
                // so that means when it means span of four that means it takes up the entire line 
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
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
                
                // we are triggering the helper text based on whether you've both 
                // 1) touched it and 
                // 2) it doesn't meet the error
                error={!!touched.firstName && !!errors.firstName}
                helperText={touched.firstName && errors.firstName}
                sx={{ gridColumn: "span 2" }}
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
                sx={{ gridColumn: "span 2" }}
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
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                select
                variant="filled"
                type="text"
                label="Seniority"
                onBlur={handleBlur}
                onChange={handleChange}
                sx={{ gridColumn: "span 1" }}
              >
              {/* dropdown using values from const seniorities */}
              {seniorities.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
              </TextField>
              <TextField
                fullWidth
                select
                variant="filled"
                type="text"
                label="Role"
                onBlur={handleBlur}
                onChange={handleChange}
                sx={{ gridColumn: "span 1" }}
              >
              {roles.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
              </TextField>
              <TextField
                fullWidth
                select
                variant="filled"
                type="text"
                label="Manager"
                onBlur={handleBlur}
                onChange={handleChange}
                sx={{ gridColumn: "span 1" }}
              >
              {managers.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
              </TextField>
              <TextField
                fullWidth
                select
                variant="filled"
                type="text"
                label="User Group"
                onBlur={handleBlur}
                onChange={handleChange}
                sx={{ gridColumn: "span 1" }}
              >
              {userGroups.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
              </TextField>

            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Create New User
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

//  phoneRegExp: this is a JavaScript thing where you can check based on the string so 
// you'll be able to check what the values are
// the below is something you can copy from StackOverflow
const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

// checkoutSchema: this is going to define the validation logic for each field that we're using
const checkoutSchema = yup.object().shape({

  // firstName: if there is no input we're going to say first name is going to be a required input and 
  // by doing this "required" will be the text that pops up if an error is triggered
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  seniority: yup.string().required("required"),
  
  // we're going to have two type of validation for contact:
  // if it's not valid if it doesn't match this correctly it's going to give you "Phone number is not valid" error 
  // otherwise we are going to have required as the "required" error
  contact: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("required"),
});
const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  contact: "",
  seniority: "",
};

export default UserForm;