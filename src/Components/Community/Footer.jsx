import {Link} from "react-router-dom";
import {FaBars, FaComments, FaPager, FaUser, FaUsers} from "react-icons/fa";
import {FaFeatherPointed} from "react-icons/fa6";
const Footer = ({setIsMenuOpen}) => {
    return (
        <footer
            className="fixed bottom-0 left-0 right-0 bg-[#14102a] border-t border-[#35518e] p-3 shadow-md z-30">
            <div className="flex justify-around">
                <Link to='/communitie-memberspage' className="flex flex-col items-center text-[#8e83e4]">
                    <FaUsers className="text-xl"/>
                    <span className="text-xs mt-1">Участники</span>
                </Link>
                <Link to='/communitie-chatspage' className="flex flex-col items-center text-[#8e83e4]">
                    <FaComments className="text-xl"/>
                    <span className="text-xs mt-1">Чаты</span>
                </Link>
                <Link to='/communitie-mainpage' className="flex flex-col items-center text-[#8e83e4]">
                    <FaPager className="text-xl"/>
                    <span className="text-xs mt-1">Главная</span>
                </Link>
                <button className="flex flex-col items-center text-[#8e83e4]" onClick={() => setIsMenuOpen(true)}>
                    <FaBars className="text-xl"/>
                    <span className="text-xs mt-1">Меню</span>
                </button>
                <button className="flex flex-col items-center text-[#8e83e4]">
                    <FaUser className="text-xl"/>
                    <span className="text-xs mt-1">Профиль</span>
                </button>
            </div>
        </footer>
    );
}
export default Footer;