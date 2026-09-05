import logo from "../assets/logo.png";

export const Header = () => {
    return (
        <div className="flex space-between">
            <img src={logo} />
            <ul className="flex">
                <li>My Learning</li>
                <li>My Progress</li>
                <li>Student Forums</li>
                <li>Free Content</li>
            </ul>
        </div>
    )
}