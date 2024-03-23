// Export Data consts and states here
  

const [showModal, setShowModal] = useState(false);
const [fromYear, setFromYear] = useState(null);
const [toYear, setToYear] = useState(null);
const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
const [currentMonth, setCurrentMonth] = useState(new Date().getMonth()); // Get current month
const [availableToYears, setAvailableToYears] = useState([]); // Track dynamic ToYear options
const [exportConfirmModalOpen, setExportConfirmModalOpen] = useState(false);
const [exportMessage, setExportMessage] = useState("");



// Get current year with Philippine timezone (replace with your library)
useEffect(() => {
  const philippineDate = new Date().toLocaleString('ph-PH', { timeZone: 'Asia/Manila' });
  setCurrentYear(new Date(philippineDate).getFullYear());
  setCurrentMonth(new Date(philippineDate).getMonth()); // Update current month state
}, []);

const handleOpenModal = () => {
  setFromYear(null);
  setToYear(null);
  setAvailableToYears([]); // Reset available ToYear options
  setShowModal(true);
};

const handleFromYearChange = (event) => {
  const selectedYear = event.target.value;
  setFromYear(selectedYear);
  setToYear(null); // Reset the ToYear on FromYear change

  if (selectedYear === 'all') {
    setAvailableToYears(['all']);
  } else {
  let nextYearOptions = [];
  for (let year = selectedYear + 1; year <= currentYear; year++) {
    // If we're in the current year and it's before April, don't add the current school year
    if (year === currentYear && currentMonth < 3) {
      break;
    }
    nextYearOptions.push(year);
  }
  // If 'From' year is before the current year or it's past April, add the option for "This School Year only"
  if (selectedYear < currentYear || (selectedYear === currentYear && currentMonth >= 3)) {
    nextYearOptions.unshift(selectedYear); // Adds the selected "From" year as the first option
  }
  setAvailableToYears(nextYearOptions);
}
};

const handleToYearChange = (event) => {
  setToYear(event.target.value);
};

const handleExport = () => {
  // Trigger loading state
  setLoading(true);
  setLoadingMessage("Exporting Scholar Information, please wait...");

  // When "All School Years" is selected
  if (fromYear === "all") {
    console.log('Exporting data from All School Years');
    exportData('all');
  }
  // When specific "From" and "To" years are selected
  else if (fromYear && toYear) {
    console.log(`Exporting data from SY ${fromYear}-${toYear}`);
    exportData(fromYear, toYear);
  } else {
    // If required selections are not made, display an error message
    console.error("Please select both 'From' and 'To' academic years.");
    // Stop loading and show error message
    setLoading(false);
    setErrorOpen(true);
    setErrorMessage("Please select both 'From' and 'To' academic years.");
  }
};

const exportData = (fromYear, toYear = null) => {
  const authToken = useAuthStore.getState().getAuthToken(); // Get authToken
  const apiUrl = `/api/export-scholars`; // Your API endpoint for exports
  const params = toYear ? { fromYear, toYear } : { fromYear: fromYear }; // Adjust params based on selection

  const config = {
    headers: {
      'Authorization': `Bearer ${authToken}`, // Include authToken in headers
    },
    params: params,
    responseType: 'blob', // Important for downloading files
  };

  axios.get(apiUrl, config) // Use config for axios request
    .then((response) => {
      if (response.status === 200) {
        // Process the response data as usual (e.g., create blob, download file)
        const file = new Blob([response.data], { type: 'application/vnd.ms-excel' });
        // Build a URL from the file
        const fileURL = URL.createObjectURL(file);
        // Create a temp <a /> tag to download file
        const fileLink = document.createElement('a');
        fileLink.href = fileURL;
        let fileName = `Scholar Information from S.Y ${fromYear}-${parseInt(fromYear) + 1}`;

        if (toYear && toYear !== fromYear) {
          fileName += ` to S.Y ${toYear}-${parseInt(toYear) + 1}`;
        }

        fileLink.setAttribute('download', `${fileName}.xlsx`); // Define the downloaded file name
        // Append the anchor tag and trigger a click to download
        document.body.appendChild(fileLink);
        fileLink.click();
        fileLink.parentNode.removeChild(fileLink);

        // Stop loading and show success message
        setLoading(false);
        setAlertOpen(true);
        setAlertMessage("Export successful!");
      }
    })
    .catch((error) => {
      console.error('Export error:', error);
      // Stop loading and show error message
      setLoading(false);
      setErrorOpen(true);
      setErrorMessage("Export failed. Please try again.");
    });
};


const yearOptions = Array.from({ length: (currentMonth >= 3 ? currentYear : currentYear - 1) - 1990 }, (_, i) => 1990 + i);

const handleExportClick = () => {
  let message = '';
  if (fromYear === "all") {
    message = "Scholar Information for all School Years will be exported. Are you sure?";
  } else {
    message = `Scholar Information from S.Y ${fromYear}-${parseInt(fromYear) + 1} until S.Y ${toYear}-${parseInt(toYear) + 1} will be exported. Are you sure?`;
  }
  setExportMessage(message); // Set the prepared message
  setExportConfirmModalOpen(true); // Open the confirmation modal
};
