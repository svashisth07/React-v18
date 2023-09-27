import { render } from "@testing-library/react";
import { expect, test } from "vitest";
import Carousel from "../Carousel";

test("lets user clik on thumbnail to make it the hero", async () => {
  const images = ["1.jpg", "2.jpg", "3.jpg"];
  const carousel = render(<Carousel images={images} />);

  const hero = carousel.getByTestId("hero");
  expect(hero.src).toContain(images[0]);

  for (let i = 0; i < images.length; i++) {
    const image = images[i];
    const thumb = await carousel.findByTestId(`thumbnail${i}`);
    await thumb.click();
    expect(hero.src).toContain(image);
    expect(thumb.className).toContain("active");
  }
});
