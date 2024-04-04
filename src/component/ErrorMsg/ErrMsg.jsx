import React from 'react'
import useLoginStore from '../../store/LoginStore'
import * as MUI from '../../import'

const  ErrMsg = () => {
    const {errMsg} = useLoginStore();
  return (
    <>
    {errMsg && (
        <p id="errMsg" style={{ color: 'red' }}>
          {' '}
          <MUI.InfoIcon className="infoErr" /> {errMsg}
        </p>
    )}
    </>
  )
}

export default ErrMsg