const Notification = ({ content }) => {
    if (content === null) {
        return null
    }
    return (
        <div className="notification">
            {content}
        </div>
    )
}

const ErrorMessage = ({ content }) => {
    if (content === null) {
        return null
    }
    return (
        <div className="error">
            {content}
        </div>
    )
}

export default Notification