import Header from "../Header/Header";
import Promo from "../Promo/Promo";
import AboutProject from "../AboutProject/AboutProject";
import Techs from "../Techs/Techs";
import AboutMe from "../AboutMe/AboutMe";
import Footer from "../Footer/Footer";

function Main ({ isLoggedIn, handleMenuOpen, isSideMenuOpen }) {
    return (
        <section>
            <Header
            isLoggedIn={ isLoggedIn }
            handleMenuOpen={ handleMenuOpen }
            isSideMenuOpen={ isSideMenuOpen }
            />
            <main>
                <Promo/>
                <AboutProject/>
                <Techs/>
                <AboutMe/>
            </main>
            <Footer/>
        </section>
    )
}

export default Main;