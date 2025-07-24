const Btn = (props) => {
    const {text, filterMenuItems} = props;
    return (
        <li>
            <a 
                href="#" 
                className='btn btn-inline-warning' 
                onClick={(event)=>{
                    event.preventDefault();
                    filterMenuItems(text);
                }}
            >
                {text}
            </a>
        </li>
    )
}

export default Btn;