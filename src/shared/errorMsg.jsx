import React from 'react'

function ErrorMsg( {error}) {
    return (
        <p className="text-red-600 mt-1">{error}</p>

    )
}

export default ErrorMsg
