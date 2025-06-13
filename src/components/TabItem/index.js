import './index.css'

const TabItem = props => {
    const {details,changeType} = props
    const {id,displayName} = details
    const click = () => {
        changeType(id)
    }
    return (
        <li className="tab-item">
            <button onClick={click} className="tab-button">
                {displayName}
            </button>
        </li>
    )
}

export default TabItem