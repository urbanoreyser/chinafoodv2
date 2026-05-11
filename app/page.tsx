import { HeroSlider } from "@/components/hero-slider"
import { PopularDishes } from "@/components/popular-dishes"
import { ValueProps } from "@/components/value-props"

export default function HomePage() {
  return (
    <>
      <HeroSlider />
      <ValueProps />
      <PopularDishes />
    </>
  )
}
