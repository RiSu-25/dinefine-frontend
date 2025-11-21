import CustomerReviews from "@/components/CustomerReviews";
import Hero from "@/components/Hero";
import MenuSection from "@/components/MenuSection";
import PopularDishes from "@/components/PopularDishes";
import Reservation from "@/components/Reservation";
import ServiceSection from "@/components/ServiceSection";

export default function Home() {
  return (
    <main className="overflow-x-hidden">
      {/* navigation bar */}
      
      <Hero />
      <PopularDishes />
      <ServiceSection />
      <MenuSection />
      <Reservation />
      <CustomerReviews />
      
    </main>
  )
}