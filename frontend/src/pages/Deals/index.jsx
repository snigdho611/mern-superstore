import Footer from 'components/Footer'
import Header from 'components/Header'
import Navbar from 'components/Navbar'
import img_one from '../../deal1.webp'
import img_two from '../../deal2.webp'
import img_three from '../../deal3.webp'
import img_four from '../../deal4.webp'

const Deals = () => {
    return (
        <>
            <Header />
            <Navbar />
            <div className={"ml-[350px]"}>
                <h1 style={{ textAlign: "center" }}>Here are some of our best deals going on!</h1>
                <div className={"flex flex-row"}>
                    <div className={"py-5 px-5"}>
                        <img src={img_one} alt="Not found" />
                    </div>
                    <div className={"py-5 px-5"}>
                        <img src={img_two} alt="Not found" />
                    </div>
                    <div className={"py-5 px-5"}>
                        <img src={img_one} alt="Not found" />
                    </div>
                    <div className={"py-5 px-5"}>
                        <img src={img_two} alt="Not found" />
                    </div>
                </div>
                <div className={"flex flex-row"}>
                    <div className={"py-5 px-5"}>
                        <img src={img_three} alt="Not found" />
                    </div>
                    <div className={"py-5 px-5"}>
                        <img src={img_four} alt="Not found" />
                    </div>
                    <div className={"py-5 px-5"}>
                        <img src={img_three} alt="Not found" />
                    </div>
                    <div className={"py-5 px-5"}>
                        <img src={img_four} alt="Not found" />
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Deals