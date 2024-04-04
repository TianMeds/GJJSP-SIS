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
        <MUI.Typography variant="h3" mb={2}>Privacy Policy for ScholarLink</MUI.Typography>
        <MUI.Typography variant="subtitle1" mb={2}>[Last Updated: 02/15/2024]</MUI.Typography>
        <MUI.Typography variant='body1' sx={{color: 'black'}}>
          Thank you for being a member of the Gado and Jess Jalandoni Scholarship Project and using ScholarLink, our dedicated platform for scholarship management. Protecting your privacy and the security of your personal information is our top priority. This Privacy Policy outlines how we collect, use, disclose, and protect your information when you use ScholarLink.
        </MUI.Typography>
        <MUI.Typography variant="h4" mt={3}>1. Information We Collect</MUI.Typography>

        <MUI.Grid ml={2}>
            <MUI.Typography variant='body1' mt={2} mb={2} sx={{color: 'black'}}>
            a. Information Provided by Members: When your account is registered by the administrators on ScholarLink as a member of the GJJSP, we may collect personal information such as your name, email address, contact information, educational background, grades, and any other information necessary for scholarship management.
            </MUI.Typography>
            <MUI.Typography variant='body1' sx={{color: 'black'}}>
            b. Automatically Collected Information: We may collect certain information automatically when you visit our website, including your IP address, browser type, device information, and usage data through cookies and similar tracking technologies.
            </MUI.Typography>
        </MUI.Grid>

        <MUI.Typography variant="h4" mt={3}>2. Use of Information</MUI.Typography>

        <MUI.Grid ml={2}>
            <MUI.Typography variant='body1'mt={2} mb={2} sx={{color: 'black'}}>
            a. To Provide and Improve Our Services: We use the information collected to provide and improve our services, including managing members' submissions, maintaining member profiles, and facilitating administrative tasks related to the GJJSP.
            </MUI.Typography>
            <MUI.Typography variant='body1'mb={2} sx={{color: 'black'}} >
            b. Communication: We may use your email address to send you important updates, notifications, newsletters, or promotional materials related to ScholarLink and the GJJSP. You can opt-out of receiving promotional communications at any time.
            </MUI.Typography>
            <MUI.Typography variant='body1' sx={{color: 'black'}}>
            c. Analytics: We may use the collected information for analytical purposes to understand how members interact with our website, improve user experience, and optimize our services.
            </MUI.Typography>
        </MUI.Grid>

        <MUI.Typography variant="h4" mt={3}>3. Sharing of Information</MUI.Typography>

        
        <MUI.Grid ml={2}>
            <MUI.Typography variant='body1' mt={2} mb={2} sx={{color: 'black'}}>
            a. With Third-Party Service Providers: We may share your information with third-party service providers who assist us in operating our website, conducting our business, or providing services to you, provided that they agree to keep your information confidential.
            </MUI.Typography>
            <MUI.Typography variant='body1' sx={{color: 'black'}}>
            b. Within the GJJSP: We may share your information with other members or administrators within the GJJSP team for scholarship management purposes.
            </MUI.Typography>
        </MUI.Grid>

        <MUI.Typography variant="h4" mt={3}>4. Data Security</MUI.Typography>
        
        <MUI.Typography variant='body1' ml={2} mt={2} sx={{color: 'black'}}>
          We take reasonable measures to protect your personal information from unauthorized access, use, alteration, or disclosure. However, no method of transmission over the internet or electronic storage is 100% secure. Therefore, while we strive to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute security.
        </MUI.Typography>

        <MUI.Typography variant="h4" mt={3}>5. Your Choices</MUI.Typography>
        <MUI.Typography variant='body1' ml={2} mt={2} sx={{color: 'black'}}>
          You can choose not to provide certain information to us, but this may limit your ability to access certain features of ScholarLink. You can also modify or delete your personal information by accessing your account settings or by contacting us directly.
        </MUI.Typography>

        <MUI.Typography variant="h4" mt={3}>6. Children's Privacy</MUI.Typography>
        <MUI.Typography variant='body1' ml={2} mt={2} sx={{color: 'black'}}>
          ScholarLink is not intended for use by children under the age of 13. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe that your child has provided us with personal information without your consent, please contact us, and we will take steps to remove such information and terminate the child's account.
        </MUI.Typography>

        <MUI.Typography variant="h4" mt={3}>7. Changes to This Privacy Policy</MUI.Typography>
        <MUI.Typography variant='body1' ml={2} mt={2} sx={{color: 'black'}}>
          We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. We will notify you of any material changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. We encourage you to review this Privacy Policy periodically for any changes.
        </MUI.Typography>

        <MUI.Typography variant="h4" mt={3}>8. Contact Us</MUI.Typography>
        <MUI.Typography variant='body1' ml={2} mt={2} sx={{color: 'black'}}>
          If you have any questions or concerns about this Privacy Policy or our practices regarding your personal information, please contact us at tianmeds.business@gmail.com.
        </MUI.Typography>

        <MUI.Typography variant='body1' ml={2} mt={2} sx={{color: 'black'}}>
          By using ScholarLink, you acknowledge that you have read and understood this Privacy Policy and agree to the collection, use, and disclosure of your information as described herein.
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
