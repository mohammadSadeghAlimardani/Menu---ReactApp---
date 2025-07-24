const MenuItem = (props) => {
    const {image, description, price, title} = props;
    return (
        <article className='menu-item'>
            <img src={image} alt={title} />
            <div className='item-info'>
                <section>
                    <h2>{title}</h2>
                    <span>$ {price}</span>
                </section>
                <p>{description}</p>
            </div>
        </article>
    )
}

export default MenuItem;