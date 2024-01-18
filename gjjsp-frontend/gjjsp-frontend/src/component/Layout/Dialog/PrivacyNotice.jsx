import React, {useEffect, useState} from 'react';
import * as MUI from '../../../import'
import theme from '../../../context/theme';
import useAuthStore from '../../../store/AuthStore';

const PrivacyNotice = () => {

    const {openPrivacyDialog, setOpenPrivacyDialog} = useAuthStore();

    const handleOpen = () => {
        setOpenPrivacyDialog(true);
    };

    const handleClose = () => {
        setOpenPrivacyDialog(false);
    };

    return (
        <MUI.ThemeProvider theme={theme}>
            <MUI.Dialog open={openPrivacyDialog} onClose={handleClose} fullWidth width="100%">
                <MUI.DialogTitle sx={{ backgroundColor: '#007AFF', color: 'white', fontWeight: 'bold', mb: 5 }} variant="h4">
                    Privacy Notice
                </MUI.DialogTitle>
                <MUI.DialogContent>
                    <MUI.Typography variant="h5">
                        Scholarlink is committed to protecting your privacy and ensuring the security of your personal information.
                        Please read our Privacy Notice carefully to understand how we collect, use, and handle your information.
                    </MUI.Typography>
                    <br />
                    <MUI.Accordion sx={{ backgroundColor: 'transparent', boxShadow: 'none', border: 'none' }}>
                        <MUI.AccordionSummary sx={{ margin: '0', padding: '0' }}>
                            <MUI.Typography variant="body1" sx={{ padding: '0', margin: '0', color: '#007AFF' }}>
                            More Info
                            </MUI.Typography>
                        </MUI.AccordionSummary>
                        <MUI.AccordionDetails>
                            <div>
                            <MUI.Typography variant="h3" mb={2}>Who we are</MUI.Typography>
                            <MUI.Typography variant='h5'>
                                We are Scholarlink, a platform designed to connect scholars and provide valuable educational resources.
                            </MUI.Typography>

                            <MUI.Typography variant="h3" mt={3} mb={2}>Our privacy commitment</MUI.Typography>
                            <MUI.Typography variant='h5'>
                                At Scholarlink, we are committed to respecting and protecting your privacy. We prioritize the security
                                of your personal information and adhere to strict privacy standards.
                            </MUI.Typography>

                            <MUI.Typography variant="h3" mt={2}>What we will collect</MUI.Typography>
                            <MUI.Typography variant='h5' mt={2}>
                                In order to provide our services, we may collect the following information:
                            </MUI.Typography>
                            <ul>
                                <li>Full name</li>
                                <li>Date of Birth</li>
                                <li>Gender</li>
                                <li>Email Address</li>
                                <li>Home Address</li>
                                <li>Contact Number</li>
                                <li>Educational Background</li>
                                <li>Photos</li>
                            </ul>
                            <MUI.Typography variant='h5'>
                                Not providing such data may result in your request not being accommodated to perform the service.
                            </MUI.Typography>
                            </div>
                        </MUI.AccordionDetails>
                    </MUI.Accordion>
                </MUI.DialogContent>

                <MUI.DialogActions>
                    <MUI.Button onClick={handleClose}>I agree</MUI.Button>
                </MUI.DialogActions>

            </MUI.Dialog>
        </MUI.ThemeProvider>
    );
};

export default PrivacyNotice;
