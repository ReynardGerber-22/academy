import { Hero } from "../components/Hero/Hero"
import { Footer } from "../components/Footer/Footer"
import { Featured } from "../components/Featured/Featured"

export const Home = () => {
    return (
        <>
            <Hero></Hero>
            <div className="p-4">
            <Featured />
            </div>
            <Footer />
        </>

    )
}