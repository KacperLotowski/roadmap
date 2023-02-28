import * as React from 'react';
import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

const EventForm = () => {

  // if we hit a Min width of 600 pixel we are triggering this basic Boolean so useMediaQuery comes from Material UI 
  // and allows us to use media queries inside our JavaScript or react element itself so we don't have to write it in CSS
  const isNonMobile = useMediaQuery("(min-width:600px)");

  // this function is going to be the function that triggers once we have submitted our form and in this case 
  // we're not really going to do anything with the form we're not going to have anything that triggers anything so 
  // we're just going to have console log values like so we're just going to console log the values as it comes out
  const handleFormSubmit = (values) => {
    console.log(values);
  };
  
  // setting default date on the "Hired" date picker
  const [value, setValue] = React.useState(dayjs('2023-01-01'));

  // this function sets chosen new date on date picker
  const handleDateChange = (newValue) => {
    setValue(newValue);
  };

  return (
    <Box m="20px">
      <Header title="CREATE EVENT" subtitle="Create a New Event" />

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
                label="Event Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.eventName}
                name="eventName"
                
                // we are triggering the helper text based on whether you've both 
                // 1) touched it and 
                // 2) it doesn't meet the error
                error={!!touched.eventName && !!errors.eventName}
                helperText={touched.eventName && errors.eventName}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Location"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.location}
                name="location"
                error={!!touched.location && !!errors.location}
                helperText={touched.location && errors.location}
                sx={{ gridColumn: "span 3" }}
              />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DesktopDatePicker
                  label="Date"
                  inputFormat="MM/DD/YYYY"
                  value={value}
                  onChange={handleDateChange}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
              <TextField
                fullWidth
                multiline
                rows={4}
                defaultValue="Default Value"
                size="large"
                variant="filled"
                type="text"
                label="Description"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.description}
                name="description"
                error={!!touched.description && !!errors.description}
                helperText={touched.description && errors.description}
                sx={{ gridColumn: "span 4" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Create New Event
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

// checkoutSchema: this is going to define the validation logic for each field that we're using
const checkoutSchema = yup.object().shape({

  // eventName: if there is no input we're going to say first name is going to be a required input and 
  // by doing this "required" will be the text that pops up if an error is triggered
  eventName: yup.string().required("required"),
  location: yup.string().required("required"),
  
  // we're going to have two type of validation for description:
  // if it's not valid if it doesn't match this correctly it's going to give you "Phone number is not valid" error 
  // otherwise we are going to have required as the "required" error
  description: yup
    .string()
    .required("required"),
  address1: yup.string().required("required"),
  address2: yup.string().required("required"),
});
const initialValues = {
  eventName: "",
  location: "",
  description: "",
  address1: "",
  address2: "",
};

export default EventForm;