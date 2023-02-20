import React, { useEffect } from "react";

function ErrorContainer (props) {

    const handleClick = (e) => {
        e.preventDefault();
        props.setError(false);
    }

    useEffect(() => {
        console.log(props.error)
        setTimeout(() => {
            props.setError(false);
        }, 5000);
    }, [props.error])

    if (props.error) {
        return (
            <div id="error-container">
                <div onClick={handleClick} className="error-tooltip">
                {props.errorMessage}
                </div>
            </div>
        )
    } else {
        return (
            <>
            </>
        )
    }
}

module.exports = ErrorContainer;