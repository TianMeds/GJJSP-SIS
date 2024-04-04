import React from 'react'
import * as MUI from '../../import';
import useSubmissionStore from '../../store/SubmissionStore';
import classNames from 'classnames';


const StatusProgress = ({ submissionStatus, numOfDividers, customStatus, statuses}) => {

     const dividerStyle = {
      width: '2px',
      height: '10px',
      backgroundColor: 'black',
      borderRadius: '1px',
      margin: '2px',
    };

  return (
    <>
    {statuses.map((status, index) => (
      <React.Fragment key={index}>
        <MUI.Box sx={{ display: 'flex', alignItems: 'center' }}>
          <MUI.Avatar sx={{ width: 40, height: 40, marginBottom: 2, fontSize: '1rem' }}>CM</MUI.Avatar>
          <MUI.Box sx={{ display: 'flex', flexDirection: 'column', marginLeft: 2 }}>
            <MUI.Typography variant='h6' gutterBottom sx={{ fontWeight: 'bold', fontSize: '1rem' }}>
              {status.labelStatus}
            </MUI.Typography>
            <MUI.Typography variant="h6" gutterBottom sx={{ fontSize: '1.1rem' }}>
              Christian Medallada
            </MUI.Typography>
          </MUI.Box>
        </MUI.Box>
        <MUI.Stack direction="column" spacing={1} sx={{ ml: 3, mb: 1 }}>
          {Array.from({ length: status.numOfDividers }, (_, idx) => (
            <MUI.Divider key={idx} sx={dividerStyle} orientation="vertical" flexItem />
          ))}
        </MUI.Stack>
      </React.Fragment>
    ))}
  </>
  )
}

export default StatusProgress;