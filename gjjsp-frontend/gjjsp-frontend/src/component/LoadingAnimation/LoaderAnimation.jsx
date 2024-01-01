import React from 'react'
import * as MUI from '../../import'
import useLoginStore from '../../store/LoginStore'

export const LoaderAnimation = () =>  {

    const {
        loading,
      } = useLoginStore();
  return (
    <>
        {loading && (
            <MUI.Backdrop
            open={loading}
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 999 }}
            >
            <MUI.Box
                sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: (theme) => theme.zIndex.drawer + 2,
                }}
            >
                <MUI.CircularProgress />
            </MUI.Box>
            </MUI.Backdrop>
        )}
   </>
  )
}
