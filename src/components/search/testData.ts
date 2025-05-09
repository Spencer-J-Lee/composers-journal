import { Entry } from "@/lib/types/Entry";

const cases: Entry[] = [
  {
    id: 1,
    title: "Break out from Harmonization",
    description:
      "Have the counter-melody move in parallel with the main melody before breaking out into its own individual line. Creates a cool effect if done right when the main melody has a long hold or stops.",
    youtube_urls: ["https://www.youtube.com/watch?v=WkcauMqgjEI"],
    audio_urls: [],
    tags: ["Melody", "Counter-Melody"],
    status: 200,
    created_at: Date.now().toString(),
  },
  {
    id: 2,
    title: "1",
    description: "1",
    youtube_urls: [],
    audio_urls: [],
    tags: [],
    status: 200,
    created_at: Date.now().toString(),
  },
  {
    id: 3,
    title: "Short",
    description: "Lorem ipsum dolor sit.",
    youtube_urls: ["www.youtube.com"],
    audio_urls: [],
    tags: ["Melody", "Counter-Melody", "Accompaniment"],
    status: 200,
    created_at: Date.now().toString(),
  },
  {
    id: 4,
    title: "Medium Length Title",
    description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nisi reprehenderit sed ducimus. Saepe odit quibusdam alias asperiores repellendus unde ad eligendi ipsam fugiat, dolorem iure dignissimos, quasi eius praesentium aut.",
    youtube_urls: ["www.youtube.com", "www.youtube.com", "www.youtube.com"],
    audio_urls: [],
    tags: [
      "Melody",
      "Counter-Melody",
      "Accompaniment",
      "Groove",
      "Texture",
      "Harmony",
    ],
    status: 200,
    created_at: Date.now().toString(),
  },
  {
    id: 5,
    title:
      "Looooooooooooooooooooooooooooooooooooooooooooooooooooooooooong Title",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam beatae veniam quas animi modi nulla ut molestiae, non reiciendis in tempore veritatis odio qui laboriosam eveniet! Vero odio ut quod repellendus ipsum sed est. Quia illum aut, a laudantium fugit porro non accusantium suscipit animi praesentium id, quidem sint quas numquam error odit impedit delectus corrupti quae. Nulla ducimus eligendi quos ad deserunt animi voluptas ab cum nam modi corporis veniam nobis cumque facere mollitia, eum vel numquam iste corrupti consectetur? At nostrum vel recusandae pariatur dignissimos voluptas delectus enim exercitationem deserunt inventore officiis dolores odio quo, soluta, eius iste?",
    youtube_urls: [
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
    audio_urls: [],
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
    status: 200,
    created_at: Date.now().toString(),
  },
];

const genCardData = (n: number) => {
  let description = "Lorem ipsum, dolor sit amet consectetur adipisicing elit.";

  return {
    id: n + cases.length + 1,
    title: "Example Title" + " " + n,
    description: Array(n).fill(description).join(" "),
    youtube_urls: Array.from(
      { length: n },
      (_, i) => "https://www.youtube.com/watch?v=WkcauMqgjEI" + i,
    ),
    audio_urls: [],
    tags: Array.from({ length: n }, (_, i) => "Tag" + " " + i),
    status: 200,
    created_at: Date.now().toString(),
  };
};

export const genTestResultsData = (n: number): Entry[] => {
  const data = [...cases];

  for (let i = 0; i < n; i++) {
    data.push(genCardData(i));
  }

  return data;
};
