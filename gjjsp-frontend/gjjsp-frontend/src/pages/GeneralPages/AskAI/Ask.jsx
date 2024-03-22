import React, { useState, useEffect } from "react";
import * as MUI from "../../../import";
import Layout from "../../../component/Layout/SidebarNavbar/Layout";
import axios from "../../../api/axios";
import { useForm, Controller } from "react-hook-form";
import theme from "../../../context/theme";
import { DevTool } from "@hookform/devtools";
import useAuthStore from "../../../store/AuthStore";
import useLoginStore from "../../../store/LoginStore";


export default function Ask() {
  const {
    getAuthToken,
    alertOpen,
    setAlertOpen,
    errorOpen,
    setErrorOpen,
    alertMessage,
    setAlertMessage,
    errorMessage,
    setErrorMessage,
    } = useAuthStore();
    const { setLoading, setLoadingMessage } = useLoginStore();
    const { control, watch, setValue, reset, isValid } = useForm({
    defaultValues: {
    reportType: "",
    year: "",
    currentYear: false,
    },
    });
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [confirmMessage, setConfirmMessage] = useState("");
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
    const [yearOptions, setYearOptions] = useState([]);
    const [isDataAvailable, setIsDataAvailable] = useState(true);


    useEffect(() => {
      const philippineDate = new Date().toLocaleString("ph-PH", {
      timeZone: "Asia/Manila",
      });
      setCurrentYear(new Date(philippineDate).getFullYear());
      }, []);

      // Generate year options from 1990 to the current year
      useEffect(() => {
        setYearOptions(
          Array.from({ length: currentYear - 1989 }, (_, index) => index + 1989)
        );
      }, [currentYear]);

      // Function to get date range based on report type and year
      const getDateRange = (reportType, year) => {
          let startDate, endDate;
          switch (reportType) {
            case "1":
              startDate = `${year}-01-01`;
              endDate = `${year}-06-30`;
              break;
            case "2":
              startDate = `${year}-07-01`;
              endDate = `${year}-12-31`;
              break;
          // No need for case '3' as you handle it differently
      }
        return { startDate, endDate };
        };

        const handleClear = () => {
          reset({
          reportType: "",
          year: "",
          currentYear: false,
          });
          };

          const handleGenerateClick = (event) => {
            console.log("Generating Report...");
            event.preventDefault();
            const formData = watch();
            const year = formData.currentYear ? String(currentYear) : "fo"; // "fo" is unclear, assuming it's a placeholder
            
            let message;
            
            // Determine the message to display in the confirmation modal
            if (formData.reportType === "3") {
              // Message for generating both Mid-year and Year-end reports
              message = `Both Mid-year and Year-end Accomplishment Reports for ${formData.currentYear ? "the current school year" : `${year}`} will be generated. Are you sure?`;
            } else {
              // Message for generating either Mid-year or Year-end report
              let reportTypeMessage = formData.reportType === "1" ? "Mid-year" : "Year-end";
              message = `${reportTypeMessage} Accomplishment Report ${formData.currentYear ? `${year}` : `${year}`} will be generated. Are you sure?`;
            }
            
            setConfirmMessage(message);
            setConfirmOpen(true);
          };

          // const handleConfirmGenerateReport = () => {
          //   console.log("Generating Report...");
          //   // Close the confirmation modal first
          //   setConfirmOpen(false);
          //   setLoading(true);
          //   setLoadingMessage("Generating Report, please wait...");
            
          //   const formData = watch(); // Make sure to retrieve the form data
          //   const year = formData.currentYear ? String(currentYear) : "fo"; // Use a default value for "fo"

  return (
    <Layout>
      <MUI.ThemeProvider theme={theme}>
        <MUI.Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <MUI.Grid container spacing={3}>
          <MUI.Grid item xs={12} mb={4}>
            <MUI.Typography
              variant="h1"
              id="tabsTitle"
              sx={{ color: "black" }}
              >
              Generate Report
            </MUI.Typography>
            </MUI.Grid>

            <MUI.Grid item xs={12}>
              <MUI.Paper sx={{ p: 4, maxWidth: "600px", width: "100%", mx: "auto" }}>

              <form onSubmit={handleGenerateClick}>
              <MUI.Grid container spacing={3}>
                <MUI.Grid item xs={12}>
                  <MUI.Typography
                    variant="h4"
                    sx={{ fontWeight: "bold", mb: 2 }}
                    >
                    Accomplishment Report
                  </MUI.Typography>
                </MUI.Grid>

                <MUI.Grid item xs={12}>
                  <MUI.FormControl fullWidth>
                  <MUI.InputLabel id="report-type-label">
                  Report Type *
                  </MUI.InputLabel>
                  <Controller
                    name="reportType"
                    control={control}
                    rules={{ required: "Report type is required" }}
                    render={({ field }) => (
                      <MUI.Select
                        labelId="report-type-label"
                        label="Report Type *"
                        {...field}
                      >
                        <MUI.MenuItem value="1">
                          Mid-year Accomplishment Report
                        </MUI.MenuItem>
                        <MUI.MenuItem value="2">
                          Year-end Accomplishment Report
                        </MUI.MenuItem>
                      </MUI.Select>
                    )}
                  />
                  </MUI.FormControl>
                </MUI.Grid>

                <MUI.Grid item xs={12}>
                <Controller
                  name="year"
                  control={control}
                  rules={{ required: !watch("currentYear") }}
                  render={({ field, fieldState }) => (
                    <MUI.FormControl fullWidth error={!isValid}>
                      <MUI.InputLabel id="year-label">Year *</MUI.InputLabel>
                      Generate Report Feature in Scholarlink 22
                      <MUI.Select
                        labelId="year-label"
                        label="Year *"
                        {...field}
                        disabled={watch("currentYear")}
                      >
                        {yearOptions.map((year) => (
                          <MUI.MenuItem key={year} value={year}>
                            {year}
                          </MUI.MenuItem>
                        ))}
                      </MUI.Select>
                      <MUI.FormHelperText>
                        {fieldState.error ? fieldState.error.message : null}
                      </MUI.FormHelperText>
                    </MUI.FormControl>
                  )}
                />

                </MUI.Grid>

                <MUI.Grid item xs={12}>
                <Controller
                  name="currentYear"
                  control={control}
                  render={({ field }) => (
                    <MUI.FormControlLabel
                      control={
                        <MUI.Checkbox
                          {...field}
                          checked={field.value}
                          // This should be removed or adjusted based on actual data structure
                          onChange={(e) => {
                            const isChecked = e.target.checked;
                            // Generate Report Feature in Scholarlink 23
                            field.onChange(isChecked);
                            setValue(
                              "year",
                              isChecked ? String(currentYear) : "" // Update the year in the form
                            );
                          }}
                        />
                      }
                      label="Current Year"
                    />
                  )}
                />
                </MUI.Grid>
              </MUI.Grid>

              <MUI.Grid item xs={12}>
              <MUI.Box display="flex" justifyContent="flex-start">
                <MUI.Button
                  onClick="{handleClear}"
                  disabled={
                    !watch("reportType") ||
                    (!watch("currentYear") && !watch("year"))
                  }
                >
                  Clear
                </MUI.Button>

                <MUI.Button
                  variant="contained"
                  color="primary"
                  onClick="{handleGenerateClick}"
                  sx={{ mt: 3, mb: 2 }}
                  disabled={
                    !watch("reportType") ||
                    (!watch("currentYear") && !watch("year"))
                  }
                >
                  Generate Report
                  </MUI.Button>

                </MUI.Box>
              </MUI.Grid>

              </form>

              </MUI.Paper>
            </MUI.Grid>

          </MUI.Grid>


          {/* Snackbar for Success */}
          <MUI.Snackbar
            open={alertOpen}
            autoHideDuration={5000}
            onClose={() => setAlertOpen(false)}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            <MUI.MuiAlert onClose={() => setAlertOpen(false)} variant="filled" severity="success" sx={{ width: '100%' }}>
              {alertMessage}
            </MUI.MuiAlert>
          </MUI.Snackbar>

          {/* Snackbar for Error */}
          <MUI.Snackbar
            open={errorOpen}
            autoHideDuration={5000}
            onClose={() => setErrorOpen(false)}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            <MUI.MuiAlert onClose={() => setErrorOpen(false)} variant='filled' severity='error' sx={{width: '100%'}}>
              {errorMessage}
            </MUI.MuiAlert>
          </MUI.Snackbar>

          
        </MUI.Container>
      </MUI.ThemeProvider>
    </Layout>
  );
}

