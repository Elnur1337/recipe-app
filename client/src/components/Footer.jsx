//Images
import apiLogo from '../assets/spoonacularApiLogo.svg';

const Footer = () => {
    return (
        <footer>
            <div className='flexFix'></div>
            <p>{'Design & development - Elnur Bjelić'}</p>
            <div className="footerImgContainer">
                <p>Made with:</p>
                <img src={apiLogo} alt="apiLogo" />
            </div>
        </footer>
    );
}
export default Footer;