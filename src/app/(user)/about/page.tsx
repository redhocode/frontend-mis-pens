import Footer from "@/components/footer/footer";
import Navbar from "@/components/navbar/navbar";
import AboutLayout from "@/layouts/about/about";

export default function About(){
    return(
        <>
        <Navbar/>
        <section className="mt-24">

        <AboutLayout/>
        </section>
        <Footer/>
        </>
    )
}