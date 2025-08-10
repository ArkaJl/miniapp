import {Link} from "react-router-dom";
import {FaBars, FaComments, FaPager, FaUser, FaUsers} from "react-icons/fa";
import {FaFeatherPointed} from "react-icons/fa6";
const Footer = ({setIsMenuOpen, communityData}) => {
    return (
        <footer
            style={{
                backgroundColor: communityData.footerColor,
                borderColor: communityData.primaryColor
            }}
            className="fixed bottom-0 left-0 right-0 border-t p-3 shadow-md z-30"
        >
            <div className="flex justify-around">
                <Link to='/communitie-memberspage' className="flex flex-col items-center"
                      style={{color: communityData.footerIconColor}}>
                    <FaUsers className="text-xl"/>
                    <span className="text-xs mt-1">Участники</span>
                </Link>
                <Link to='/communitie-chatspage' className="flex flex-col items-center text-[#8e83e4]">
                    <FaComments className="text-xl"/>
                    <span className="text-xs mt-1">Чаты</span>
                </Link>
                <Link to='/communitie-mainpage' className="flex flex-col items-center text-[#8e83e4]"
                      style={{color: communityData.footerIconColor}}>
                    <FaPager className="text-xl"/>
                    <span className="text-xs mt-1">Главная</span>
                </Link>
                <button className="flex flex-col items-center text-[#8e83e4]" onClick={() => setIsMenuOpen(true)}
                        style={{color: communityData.footerIconColor}}>
                    <FaBars className="text-xl"/>
                    <span className="text-xs mt-1">Меню</span>
                </button>
                <Link to='/communitie-profilepage' className="flex flex-col items-center text-[#8e83e4]"
                      style={{color: communityData.footerIconColor}}>
                    <FaUser className="text-xl"/>
                    <span className="text-xs mt-1">Профиль</span>
                </Link>
            </div>
        </footer>
    );
}
export default Footer;