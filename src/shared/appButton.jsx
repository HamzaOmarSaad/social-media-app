import { Button, Spinner } from 'flowbite-react'
import React from 'react'

function AppButton( {children ,isloading ,...props}) {
    return (
        <>
        <Button {...props}> {isloading? <div><Spinner className='me-3' size="sm" light /> <span>loading </span></div>:  children  }   </Button>
        </>
    )
}

export default AppButton
