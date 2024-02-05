import React from 'react';
import * as MUI from '../../import';
import Layout from '../../component/Layout/SidebarNavbar/Layout';
import { Link } from 'react-router-dom';
import theme from '../../context/theme';
import HistoryIcon from '@mui/icons-material/History';
import axios from '../../api/axios';

import useLoginStore from '../../store/LoginStore';
import useAuthStore from '../../store/AuthStore';

//React Hook Form
import {useForm, Controller } from 'react-hook-form';
import { DevTool } from "@hookform/devtools";

export default function RenewalSubmitted() {
  return (
    <Layout>
        <MUI.ThemeProvider theme={theme}>
            <MUI.Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <MUI.Grid container spacing={3}>
                    <MUI.Grid item xs={12}>

                        <MUI.Typography>Renewal Submitted</MUI.Typography>
                    </MUI.Grid>
                </MUI.Grid>
            </MUI.Container>
        </MUI.ThemeProvider>
    </Layout>
  )
}
