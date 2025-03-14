import React from 'react';

const ErrorMessage = ({message}) => {
    return (
        <div>
            <div className="text-center text-red-400 p-4 bg-red-100 rounded-lg">
                {message}
            </div>
        </div>
    );
}

export default ErrorMessage;