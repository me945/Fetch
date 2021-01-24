function Link(props) {
    return (
        <a href={props.url} target="__blank">
            {props.title}
        </a>
    )
}
export default Link
