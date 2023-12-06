import React from 'react';
import * as MUI from '../../import';
import Layout from '../Components/Layout';

export default function Dashboard() {
  

  return (
    <Layout>
      {/* Recent Data */}
      <MUI.Grid item xs={12} md={8} lg={9}>
          <MUI.Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 240,
            }}
          >
          </MUI.Paper>
      </MUI.Grid>
      {/* Recent Data */}
        <MUI.Grid item xs={12} md={4} lg={3}>
          <MUI.Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 240,
            }}
          >
          {/* Another Tab  in the Dashboard*/}
          </MUI.Paper>
        </MUI.Grid>
        {/* Recent Data */}
        <MUI.Grid item xs={12}>
          <MUI.Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            {/* Another Tab  in the Dashboard*/}
          </MUI.Paper>
        </MUI.Grid>
    </Layout>
  )
}
