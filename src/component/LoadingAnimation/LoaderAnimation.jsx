import React from 'react'
import * as MUI from '../../import'
import useLoginStore from '../../store/LoginStore'
import '../../component/LoadingAnimation/LoaderAnimation.css'

const LoaderAnimation = () =>  {

    const {
        loading,
        loadingMessage
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
                <div className="cssload-thecube">
                    <div className="cssload-cube cssload-c1"></div>
                    <div className="cssload-cube cssload-c2"></div>
                    <div className="cssload-cube cssload-c4"></div>
                    <div className="cssload-cube cssload-c3"></div>
                </div>
                <br/>
                <MUI.Typography sx={{fontSize: '1.5rem', fontWeight: 'bold', color:'white'}}>{loadingMessage}</MUI.Typography>
            </MUI.Box>
            </MUI.Backdrop>
        )}
   </>
  )
}

export default LoaderAnimation;