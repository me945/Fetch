import './Nav.css'
import Link from './Link'
function Nav() {
    const links = [
        { id: 'id0', title: 'Humaid', url: 'https://humaidkhan.com' },

        { id: 'id1', title: 'Gallery', url: 'https://humaidkhan.com/gallery' },

        {
            id: 'id2',
            title: 'Projects',
            url: 'https://humaidkhan.com/projects',
        },

        { id: 'id3', title: 'Contact', url: 'https://humaidkhan.com/contact' },

        { id: 'id4', title: 'Blog', url: 'https://thecybermonkeys.com' },
    ]
    return (
        <nav className="nav">
            {links.map((link) => (
                <Link Key={links.id} title={link.title} url={link.url} />
            ))}
        </nav>
    )
}
export default Nav
