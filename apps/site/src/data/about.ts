/**
 * The About page timeline, oldest first. The first entry shows the childhood
 * photo: put it at src/assets/about/childhood.png (or .jpg / .jpeg / .webp).
 */
type TimelineEntry = {
  /** Small caps line above the entry, e.g. "OzU Rover · 2023–2025". */
  label: string;
  /** Optional heading under the label. */
  title?: string;
  text: string;
  /** Show the childhood photo. */
  photo?: boolean;
  /** Folder in src/assets/about/ whose photos are shown as a gallery. */
  gallery?: string;
  links?: { text: string; url: string }[];
  paper?: {
    title: string;
    authors: string[];
    venue: string;
    url: string;
    doi: string;
  };
};

export const timeline: TimelineEntry[] = [
  {
    label: "Where it started",
    text: "This is me as a child, pressing the keys of a computer that didn’t even work. The screen stayed black, but I was excited anyway. That early curiosity about what computers can do is what eventually led me to computer engineering.",
    photo: true,
  },
  {
    label: "Özyeğin University · 2021",
    text: "In 2021, I started at Özyeğin University to study Computer Science.",
  },
  {
    label: "OzU Rover · 2023–2025",
    text: "In November 2023, I joined OzU Rover, Özyeğin’s planetary rover team, and in August 2024 I became head of its Computer Science division. Our division developed the rover’s software. Preparing for competitions, I spent some nights sleeping in the lab. In 2024, we competed at the Anatolian Rover Challenge at METU in Ankara. In September 2024, I attended the European Rover Challenge in Kraków as the team’s on-site Head of Software. Held under the patronage of the European Space Agency, it brought together 69 teams from 23 countries. We placed third in the Presentation Task, 19th overall and second among the Turkish teams.",
    // Competition photos: put them in src/assets/about/rover/ (jpg, png, webp).
    gallery: "rover",
    links: [
      {
        text: "Özyeğin University: ÖzU Rover Team Wins Third Place in the Presentation Task at the European Rover Challenge",
        url: "https://www.ozyegin.edu.tr/en/announcements/32416",
      },
      {
        text: "European Rover Challenge: OzU Rover 2024 team page",
        url: "https://roverchallenge.eu/team/ozu-rover-2024/",
      },
    ],
  },
  {
    label: "ENASE 2026",
    text: "In 2026, my first paper was published at ENASE 2026, the 21st International Conference on Evaluation of Novel Approaches to Software Engineering, held in Benidorm, Spain, on 22–24 May 2026. ENASE is an annual conference sponsored by INSTICC that brings together researchers and practitioners working on new approaches to software engineering, from development methods and tools to software quality. Accepted papers are published in the conference proceedings by SCITEPRESS. Our paper was shortlisted for the Best Position Paper Award and invited to the extended Springer post-conference volume. My thanks go to my co-authors: my classmates Leyla Isabalayeva and Gürsel Cesur, my professor Prof. Dr. Hasan Sözer, and Hakan Kılınç.",
    paper: {
      title:
        "Semantic Diversity-Driven Test Case Prioritization for System Tests",
      authors: [
        "Leyla Isabalayeva",
        "Gürsel Cesur",
        "Tanay Alpkonur",
        "Hakan Kılınç",
        "Hasan Sözer",
      ],
      venue: "Proceedings of ENASE 2026, Volume 2, pp. 1089–1096. SCITEPRESS.",
      url: "https://www.scitepress.org/PublishedPapers/2026/149138/",
      doi: "10.5220/0014913800004015",
    },
  },
  {
    label: "Graduation · 2026",
    text: "In June 2026, I graduated from Özyeğin University with a B.Sc. in Computer Science.",
  },
  {
    label: "Now",
    text: "Today I work mainly on machine learning, with a focus on LLMs, NLP, computer vision and ML in finance. This site is where I share my projects and what I learn.",
  },
];
