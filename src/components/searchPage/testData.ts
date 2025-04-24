const cases = [
  {
    title: "Break out from Harmonization",
    description:
      "Have the counter-melody move in parallel with the main melody before breaking out into its own individual line. Creates a cool effect if done right when the main melody has a long hold or stops.",
    examples: ["https://www.youtube.com/watch?v=WkcauMqgjEI"],
    tags: ["Melody", "Counter-Melody"],
  },
  {
    title: "1",
    description: "1",
    examples: [],
    tags: [],
  },
  {
    title: "Short",
    description: "Lorem ipsum dolor sit.",
    examples: ["www.youtube.com"],
    tags: ["Melody", "Counter-Melody", "Accompaniment"],
  },
  {
    title: "Medium Length Title",
    description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nisi reprehenderit sed ducimus. Saepe odit quibusdam alias asperiores repellendus unde ad eligendi ipsam fugiat, dolorem iure dignissimos, quasi eius praesentium aut.",
    examples: ["www.youtube.com", "www.youtube.com", "www.youtube.com"],
    tags: [
      "Melody",
      "Counter-Melody",
      "Accompaniment",
      "Groove",
      "Texture",
      "Harmony",
    ],
  },
  {
    title:
      "Looooooooooooooooooooooooooooooooooooooooooooooooooooooooooong Title",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam beatae veniam quas animi modi nulla ut molestiae, non reiciendis in tempore veritatis odio qui laboriosam eveniet! Vero odio ut quod repellendus ipsum sed est. Quia illum aut, a laudantium fugit porro non accusantium suscipit animi praesentium id, quidem sint quas numquam error odit impedit delectus corrupti quae. Nulla ducimus eligendi quos ad deserunt animi voluptas ab cum nam modi corporis veniam nobis cumque facere mollitia, eum vel numquam iste corrupti consectetur? At nostrum vel recusandae pariatur dignissimos voluptas delectus enim exercitationem deserunt inventore officiis dolores odio quo, soluta, eius iste?",
    examples: [
      "www.youtube.com",
      "www.youtube.com",
      "www.youtube.com",
      "www.youtube.com",
      "www.youtube.com",
      "www.youtube.com",
      "www.youtube.com",
      "www.youtube.com",
      "www.youtube.com",
      "www.youtube.com",
      "www.youtube.com",
    ],
    tags: [
      "Melody",
      "Counter-Melody",
      "Accompaniment",
      "Groove",
      "Texture",
      "Harmony",
      "1Melody",
      "1Counter-Melody",
      "1Accompaniment",
      "1Groove",
      "1Texture",
      "1Harmony",
      "2Melody",
      "2Counter-Melody",
      "2Accompaniment",
      "2Groove",
      "2Texture",
      "2Harmony",
      "3Melody",
      "3Counter-Melody",
      "3Accompaniment",
      "3Groove",
      "3Texture",
      "3Harmony",
    ],
  },
];

const genCardData = (n: number) => {
  let description = "Lorem ipsum, dolor sit amet consectetur adipisicing elit.";

  return {
    title: "Example Title" + " " + n,
    description: Array(n).fill(description).join(" "),
    examples: Array.from(
      { length: n },
      (_, i) => "https://www.youtube.com/watch?v=WkcauMqgjEI" + i,
    ),
    tags: Array.from({ length: n }, (_, i) => "Tag" + " " + i),
  };
};

export const genTestResultsData = (n: number) => {
  const data = [...cases];

  for (let i = 0; i < n; i++) {
    data.push(genCardData(i));
  }

  return data;
};
