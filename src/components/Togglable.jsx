import { useState } from 'react'

const Togglable = (props) => {
    const [visible, setVisible] = useState(false)

    const hiddenButton = { display: visible ? 'none' : '' }
    const visibleContent = { display: visible ? '' : 'none' }

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    return (
        <div>
            <div style={hiddenButton}>
                <button onClick={toggleVisibility}>{props.buttonLabel}</button>
            </div>
            <div style={visibleContent}>
                {props.children}
                <button onClick={toggleVisibility}>Cancel</button>
            </div>
        </div>
    )
}

export default Togglable