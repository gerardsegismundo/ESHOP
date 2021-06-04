// import React from 'react'

// const Spinner = () => {
//   return (
//     <div
//       className='position-fixed w-100 h-100 text-center loading'
//       style={{ background: '#0008', color: 'white', top: 0, left: 0, zIndex: 9 }}
//     >
//       <svg width='205' height='250' viewBox='0 0 40 50'>
//         <polygon points='20,1 40, 40 1, 40' strokeWidth='1' stroke='#fff' fill='none'>
//           <text fill='#fff' x='5' y='47'>
//             Loading
//           </text>
//         </polygon>
//       </svg>
//     </div>
//   )
// }

// export default Spinner

import { useState } from 'react'
import { css } from '@emotion/react'
import { PuffLoader } from 'react-spinners'

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
  height: '5rem';
  width: '5rem';
`

const Spinner = () => {
  return (
    <div className='spinner'>
      <div>
        <PuffLoader css={override} size={150} />
        <h3 className='mt-5 text-center'>Loading...</h3>
      </div>
    </div>
  )
}

export default Spinner
