// All site copy lives here so the Nafsi team can update content in one place.
// Items marked TODO need confirming with Nafsi before launch.

const defaultSiteUrl = "https://www.nafsiafrica.org";

// Tolerates an empty, protocol-less or trailing-slash NEXT_PUBLIC_SITE_URL so a bad env value can't break the build.
function resolveSiteUrl(value: string | undefined) {
  const trimmed = value?.trim();
  if (!trimmed) return defaultSiteUrl;
  try {
    const url = new URL(/^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`);
    return url.origin;
  } catch {
    return defaultSiteUrl;
  }
}

export const site = {
  name: "Nafsi Africa",
  legalName: "Nafsi Pamoja Organization",
  tagline: "Creativity can change lives.",
  description:
    "Nafsi Africa empowers children and young people in Kenya through arts, digital media, skills, mentorship and cultural exchange — turning creativity into confidence, opportunity and change.",
  url: resolveSiteUrl(process.env.NEXT_PUBLIC_SITE_URL),
  founded: 2010,
  address: "Shalom House Block B, St Daniel Comboni Road, Off Ngong Road, Nairobi, Kenya",
  poBox: "P.O. Box 55809–00200, Nairobi",
  email: "info@nafsiafrica.org",
  phone: "+254 748 501 458",
  phoneHref: "tel:+254748501458",
  whatsappHref: "https://wa.me/254748501458",
  mapQuery: "Shalom House, St Daniel Comboni Rd, Ngong Road, Nairobi",
  socials: {
    instagram: "https://www.instagram.com/nafsiafrica/",
    facebook: "#", // TODO: confirm Facebook page URL
    tiktok: "#", // TODO: confirm TikTok handle
    youtube: "https://www.youtube.com/@NaiWave",
  },
};

export type NavItem = { label: string; href: string; children?: { label: string; href: string }[] };

export const nav: NavItem[] = [
  {
    label: "About",
    href: "/about",
    children: [
      { label: "Who We Are", href: "/about" },
      { label: "Our Story", href: "/about/story" },
      { label: "Our Approach", href: "/about/approach" },
      { label: "Partners", href: "/about/partners" },
      { label: "Impact & Transparency", href: "/about/impact" },
    ],
  },
  {
    label: "Programmes",
    href: "/programmes",
    children: [
      { label: "Performing Arts", href: "/programmes/performing-arts" },
      { label: "Outreach", href: "/programmes/outreach" },
      { label: "Tangaza on Smartphone", href: "/programmes/tangaza" },
      { label: "NaiWave Studios", href: "/programmes/naiwave" },
      { label: "Global Stay Tours", href: "/programmes/global-stay-tours" },
      { label: "Youth Empowerment", href: "/programmes/youth-empowerment" },
    ],
  },
  {
    label: "Stories",
    href: "/stories",
    children: [
      { label: "Stories of Change", href: "/stories" },
      { label: "Youth Voices", href: "/stories/youth-voices" },
      { label: "Videos", href: "/stories/videos" },
      { label: "Nafsi Journal", href: "/stories/journal" },
    ],
  },
  {
    label: "Get Involved",
    href: "/get-involved",
    children: [
      { label: "Donate", href: "/donate" },
      { label: "Volunteer", href: "/get-involved/volunteer" },
      { label: "Partner", href: "/get-involved/partner" },
      { label: "Sponsor a Programme", href: "/get-involved/sponsor" },
      { label: "Book a Performance", href: "/get-involved/book-performance" },
      { label: "Book the Studio", href: "/get-involved/book-studio" },
    ],
  },
  { label: "Events", href: "/events" },
  { label: "Contact", href: "/contact" },
];

export const centres = ["Kariobangi", "Babadogo", "Kibera", "Dagoretti", "Kivuli"];

export const impactStats = [
  {
    icon: "calendar",
    value: new Date().getFullYear() - 2010,
    suffix: "+",
    label: "Years of community impact",
    note: "Nafsi Pamoja was founded in Nairobi in 2010.",
  },
  {
    icon: "phone",
    value: 208,
    suffix: "",
    label: "Young people reached by Tangaza",
    note: "Verified programme figure; aiming to reach many more by end of 2026.",
  },
  {
    icon: "pin",
    value: 5,
    suffix: "",
    label: "Community training centres",
    note: centres.join(", ").replace(/, (?=[^,]*$)/, " and ") + ".",
  },
  {
    icon: "globe",
    value: 3,
    suffix: "",
    label: "Countries connected",
    note: "Kenya, Denmark and Bolivia through Global Stay Tours.",
  },
] as const;

export type Programme = {
  slug: string;
  title: string;
  eyebrow: string;
  summary: string;
  body: string[];
  tags: string[];
  image: string;
  cta: string;
};

export const programmes: Programme[] = [
  {
    slug: "performing-arts",
    title: "Performing Arts",
    eyebrow: "Music · Dance · Acrobatics",
    summary:
      "Weekly training in music, dance, acrobatics, circus, percussion and theatre across five community centres in Nairobi.",
    body: [
      "Through music, acrobatics, circus acts, dance, yoga, percussion, theatre, crafts and visual arts, Nafsi creates safe spaces where children and youth can express themselves, gain confidence and grow.",
      "Every week we run training sessions across Kariobangi, Babadogo, Kibera, Dagoretti and Kivuli centres, offering consistent support and opportunities for self-discovery. Supporters can sponsor a trainer or a centre to keep this journey going.",
    ],
    tags: ["Dance", "Acrobatics", "Music & percussion", "Theatre", "Circus arts", "Visual arts"],
    image: "/images/dance.jpg",
    cta: "Explore Performing Arts",
  },
  {
    slug: "outreach",
    title: "Outreach",
    eyebrow: "Communities · Shows · Care",
    summary:
      "Taking creativity into schools, children's homes and neighbourhoods — with professional performances by the children themselves.",
    body: [
      "Outreach brings Nafsi's work beyond the training centres. Children and youth perform at community events, partner institutions such as St. Christine Centre, and local and international shows.",
      "Outreach also carries Nafsi's advocacy: tree planting and environmental awareness workshops, sanitary workshops for girls, and conversations on gender equality that start in the community.",
    ],
    tags: ["Community shows", "Children's homes", "Environment", "Gender equality", "Girls' health"],
    image: "/images/community.jpg",
    cta: "Explore Outreach",
  },
  {
    slug: "tangaza",
    title: "Tangaza on Smartphone",
    eyebrow: "Flagship digital-media initiative",
    summary:
      "Training in film shooting, video editing and content production — giving young people the tools to amplify their voices.",
    body: [
      "Tangaza is a flagship initiative of Nafsi Africa. It offers training in film shooting, video editing and content production, giving participants tools to amplify their voices, advocate for change and access the creative economy.",
      "Since its inception Tangaza has reached and empowered 208 young people and aims to impact many more by the end of 2026. Participants produce content that raises awareness on climate change, gender equality and the Sustainable Development Goals. A cornerstone of the project is NaiWave Studios. Tangaza is supported by Spor Media and funded by CISU.",
    ],
    tags: ["Smartphone filmmaking", "Photography", "Video editing", "Podcasting", "Digital storytelling", "SDG advocacy"],
    image: "/images/tangaza.jpg",
    cta: "Explore Tangaza",
  },
  {
    slug: "naiwave",
    title: "NaiWave Studios",
    eyebrow: "Podcasts · Online radio · Youth voices",
    summary:
      "A creative hub and media platform where young people explore mental health, social justice and relationships on air.",
    body: [
      "NaiWave is a creative hub and media platform that gives young people a voice. By leveraging familiar, accessible digital media, NaiWave creates a safe space for youth to explore sensitive topics — mental health, social justice, relationships and personal development.",
      "Driven by a community-based approach, it fosters dialogue and promotes positive change through podcasts and live radio. The studio is also available to hire.",
    ],
    tags: ["Podcasts", "Online radio", "Interviews", "Mental health", "Social justice", "Personal development"],
    image: "/images/naiwave.jpg",
    cta: "Explore NaiWave",
  },
  {
    slug: "global-stay-tours",
    title: "Global Stay Tours",
    eyebrow: "Cultural exchange · Since 2020",
    summary:
      "Digital cultural exchange connecting young people in Kenya, Bolivia and Denmark around the Sustainable Development Goals.",
    body: [
      "Launched in 2020 in response to the disruptions of the COVID-19 pandemic, Global Stay Tours (GST) bridges the gap created by halted travel and interrupted school programmes.",
      "Using digital media and Zoom video conferencing, it connects young people from Kenya, Bolivia and Denmark to exchange culture and collaborate on discussions around the Sustainable Development Goals. GST also creates opportunities for participants to earn a livelihood while engaging in meaningful global conversations.",
    ],
    tags: ["Cultural exchange", "Digital dialogue", "SDGs", "Cross-cultural collaboration", "Livelihoods"],
    image: "/images/gst.jpg",
    cta: "Explore Global Stay Tours",
  },
  {
    slug: "youth-empowerment",
    title: "Youth Empowerment",
    eyebrow: "Skills · Mentorship · Leadership",
    summary:
      "Talent development, advocacy and mentorship that turn participants into confident young leaders.",
    body: [
      "Across arts, media and exchange, Nafsi nurtures creative, resilient and socially conscious young leaders. Youth Empowerment brings together talent development, advocacy and mentorship so that young people are not only changing their own lives but positively impacting their communities and the world.",
      "Through structured mentorship, hands-on training and real-world assignments — running an online radio station, creating podcasts, managing community centres — participants gain practical experience, and many go on to take meaningful roles inside Nafsi itself.",
    ],
    tags: ["Talent development", "Advocacy", "Mentorship", "Leadership", "Creative livelihoods"],
    image: "/images/youth.jpg",
    cta: "Explore Youth Empowerment",
  },
];

export const storyCategories = [
  "From the Community",
  "Youth Voices",
  "Artist Stories",
  "Tangaza Stories",
  "Global Exchange Stories",
  "Nafsi Alumni",
] as const;

export type StoryCategory = (typeof storyCategories)[number];

export type Story = {
  slug: string;
  title: string;
  category: StoryCategory;
  excerpt: string;
  image: string;
  quote?: { text: string; by: string };
  body: string[];
};

// TODO: story bodies are drafted from Nafsi's programme descriptions; replace with first-hand stories from the team.
export const stories: Story[] = [
  {
    slug: "nairobi-meets-copenhagen",
    title: "Nairobi meets Copenhagen",
    category: "Global Exchange Stories",
    excerpt:
      "Through Global Stay Tours, a young cultural guide in Nairobi and a classroom in Denmark meet over Zoom — and exchange more than culture.",
    image: "/images/gst.jpg",
    quote: {
      text: "It has been a great experience for me, and I've gained significant knowledge throughout the process.",
      by: "Robinson Nyangasi, GST Tour Guide",
    },
    body: [
      "When travel stopped in 2020, Global Stay Tours found another way to move: young guides in Nairobi began taking students in Denmark and Bolivia on live virtual tours of their neighbourhoods.",
      "The tours open conversations about climate change, corruption and inequality — not as abstract topics but through the lived experience of the guides. Students ask questions, guides answer, and both sides leave with a wider view of the world.",
      "For the guides, GST is also a livelihood: they build presentation, research and digital skills that carry into their next opportunity.",
    ],
  },
  {
    slug: "inside-a-tangaza-cohort",
    title: "Inside a Tangaza cohort",
    category: "Tangaza Stories",
    excerpt:
      "Smartphones become film studios. 208 young people — many of them young women — learning to shoot, edit and tell stories that matter.",
    image: "/images/tangaza.jpg",
    body: [
      "A Tangaza cohort starts with the phone already in your pocket. Participants learn framing, sound, lighting and interviewing before moving on to editing, motion graphics and formatting for social media.",
      "Every cohort ends with portfolio-ready work: short documentaries and reports on climate, gender equality and life in Nairobi's informal settlements.",
      "Tangaza is supported by Spor Media and funded by CISU, and NaiWave Studios gives graduates a place to keep creating.",
    ],
  },
  {
    slug: "a-week-at-the-community-centres",
    title: "A week at the community centres",
    category: "From the Community",
    excerpt:
      "Across Kariobangi, Babadogo, Kibera, Dagoretti and Kivuli, weekly training turns afternoons into dance, music and acrobatics.",
    image: "/images/community.jpg",
    body: [
      "Each week, trainers arrive at five community centres across Nairobi. Within minutes, open ground becomes a stage: warm-ups, balances, drumming and choreography.",
      "The sessions are consistent by design. Showing up every week gives children a safe routine, trusted adults and a group that notices when they are missing.",
      "Supporters can sponsor a trainer or a whole centre to keep these afternoons going.",
    ],
  },
  {
    slug: "the-stage-as-a-classroom",
    title: "The stage as a classroom",
    category: "Artist Stories",
    excerpt:
      "For Nafsi's young performers, every rehearsal teaches discipline, teamwork and the confidence to be seen.",
    image: "/images/dance.jpg",
    body: [
      "Performance asks a lot of a young person: turning up on time, trusting the person beside you, recovering when a move goes wrong in front of an audience.",
      "Nafsi's performers carry those lessons from community showcases to local and international stages — and back into school and home.",
    ],
  },
  {
    slug: "hard-conversations-on-air",
    title: "Hard conversations, on air",
    category: "Youth Voices",
    excerpt:
      "At NaiWave Studios, young hosts take on mental health, femicide and fatherhood — topics many families never discuss.",
    image: "/images/naiwave.jpg",
    body: [
      "NaiWave's podcasts began as a safe space to talk. They have become a place where young Kenyans hear their own questions asked out loud.",
      "Episodes have covered men's emotional health, the cost of healthcare, gender-based violence and parenting — each one produced by young people trained at the studio.",
    ],
  },
  {
    slug: "from-participant-to-mentor",
    title: "From participant to mentor",
    category: "Nafsi Alumni",
    excerpt:
      "Talent development at Nafsi builds a pipeline: today's media students run the social channels and tomorrow's programmes.",
    image: "/images/youth.jpg",
    body: [
      "Nafsi's talent development programme gives young people real responsibility: media students manage social platforms and produce content, while ICT interns support the organisation's technical needs.",
      "As participants gain expertise and confidence, many become mentors and leaders inside Nafsi — keeping the organisation rooted in the communities it serves.",
    ],
  },
];

export const videos = [
  { title: "Money vs. Presence: Attention is the Best Gift", series: "Real Talk with Nicky", duration: "45:25", image: "/images/video-main.jpg" },
  { title: "From Classroom to Corner Office: A GenZ HR", series: "Real Talk with Nicky", duration: "28:07", image: "/images/video-1.jpg" },
  { title: "A Mother's Desperation: NHIF/SHA's Neglect", series: "Real Talk with Nicky", duration: "55:46", image: "/images/video-2.jpg" },
  { title: "Ending the Violence: A Future Without Femicide", series: "Real Talk with Nicky", duration: "21:28", image: "/images/video-3.jpg" },
  { title: "The Silent Crisis: The Mask We Wear — Men's Emotions", series: "Real Talk with Nicky", duration: "47:02", image: "/images/video-4.jpg" },
];

export const timeline = [
  { label: "2010", title: "Nafsi Pamoja is founded", text: "A community based organisation brings together modern artists from Nairobi's informal settlements." },
  { label: "2020", title: "Global Stay Tours launches", text: "In response to the COVID-19 pandemic and halted travel, GST uses digital media to connect youth across Kenya, Bolivia and Denmark." },
  { label: "Tangaza", title: "Tangaza on Smartphone", text: "A flagship digital-media initiative — supported by Spor Media and funded by CISU — empowers youth in filmmaking and storytelling, with a focus on young women. 208 young people reached." },
  { label: "NaiWave", title: "NaiWave Studios", text: "A podcast studio and online radio opens conversations on mental health, social justice and relationships — and becomes a cornerstone of Tangaza." },
  { label: "2024", title: "10 years with Spor Media", text: "Spor Media and Nafsi Africa celebrate a decade of partnership in smartphone reporting and online study tours." },
  { label: "2026 →", title: "Reaching further", text: "Tangaza aims to impact many more young people by the end of 2026, as Nafsi continues to grow as a global creative hub." },
];

export const partners = [
  { name: "Spor Media", role: "Media partner" },
  { name: "CISU", role: "Funder" },
  { name: "Kinder Kultur Karawane", role: "Cultural partner" },
  { name: "Koinonia", role: "Implementation partner" },
  { name: "Circus Foralle", role: "Cultural partner" },
  { name: "Per Agnese", role: "Funder" },
  { name: "Friends of Nafsi", role: "Implementation partner" },
  { name: "Waldensian Church", role: "Funder" },
];

export const board = [
  { name: "Kevin B. O. Omolo", role: "Board Chair" },
  { name: "Evelyn Atinga", role: "Board Secretary" },
  { name: "Fr. Renata S. Kizito", role: "Board Member" },
  { name: "Maren A. Ouma", role: "Board Member" },
  { name: "Ken Okong'o", role: "Board Member" },
];

export type NafsiEvent = {
  day: string;
  month: string;
  date: string;
  time: string;
  type: "Training" | "Performance" | "Exchange";
  title: string;
  text: string;
  venue: string;
};

// TODO: confirm event details with the Nafsi team.
export const events: NafsiEvent[] = [
  {
    day: "15",
    month: "Sept",
    date: "15 September 2026",
    time: "10:00",
    type: "Training",
    title: "Tangaza Video Editing Intensive",
    text: "A one-month intensive in advanced video editing, storytelling, motion graphics and social-media formatting. Apply via the Nafsi team.",
    venue: "NaiWave Studios, Nairobi",
  },
  {
    day: "12",
    month: "Dec",
    date: "12 December 2026",
    time: "15:00",
    type: "Performance",
    title: "End-of-Year Community Showcase",
    text: "Children and youth from all five centres perform dance, music and acrobatics — the culmination of a year of weekly training.",
    venue: "Kariobangi Centre, Nairobi",
  },
];

export const involvementTypes = {
  volunteer: {
    title: "Volunteer",
    heading: "Share your time and skills",
    text: "Help in the studio, at the centres, or remotely — from coaching and mentoring to photography, design and admin.",
    icon: "hands",
  },
  partner: {
    title: "Partner",
    heading: "Partner with Nafsi",
    text: "Foundations, CSR teams, cultural institutions and development organisations — let's build programmes that last.",
    icon: "handshake",
  },
  sponsor: {
    title: "Sponsor a Programme",
    heading: "Sponsor a centre, trainer or cohort",
    text: "Fund a community centre, a trainer's salary, a Tangaza cohort or a Global Stay Tour and see the impact directly.",
    icon: "sparkles",
  },
  "book-performance": {
    title: "Book a Performance",
    heading: "Bring Nafsi's performers to your event",
    text: "Acrobatics, dance, music and percussion for events, schools, festivals and corporate functions.",
    icon: "music",
  },
  "book-studio": {
    title: "Book the Studio",
    heading: "Hire NaiWave Studios",
    text: "A professional podcast and recording studio in Nairobi, available to hire for your own recordings.",
    icon: "mic",
  },
} as const;

export type InvolvementType = keyof typeof involvementTypes;

export const donationAmounts = [500, 1000, 2500, 5000, 10000];
