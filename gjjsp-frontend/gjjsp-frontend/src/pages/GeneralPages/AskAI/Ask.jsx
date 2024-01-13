import React, { useState } from 'react';
import * as MUI from '../../../import';
import Layout from '../../../component/Layout/SidebarNavbar/Layout';
import axios from '../../../api/axios';

export default function Ask() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleAsk= async () => {
    try {
      const response = await axios.post('/api/generate-prompt', {
        prompt: input,
      });
      setResponse(response.data.response);
    }
    catch(err){
      console.log(err);
    }
  }

  return (
    <Layout>
      <MUI.Grid item xs={12} md={8} lg={9}>
      <MUI.Paper elevation={3} style={{ padding: '20px' }}>
          <MUI.Typography variant="h6" gutterBottom>
            Ask with ScholarSync AI
          </MUI.Typography>
          <MUI.TextField
            label="Ask me something..."
            variant="outlined"
            fullWidth
            margin="normal"
            value={input}
            onChange={handleInputChange}
          />
          <MUI.Button variant="contained" color="primary" onClick={handleAsk}>
            Ask
          </MUI.Button>
          {response && (
            <div style={{ marginTop: '20px' }}>
              <MUI.Typography variant="body1">
                <strong>Response:</strong> {response}
              </MUI.Typography>
            </div>
          )}
        </MUI.Paper>
          
      </MUI.Grid>
    </Layout>
  );
}

