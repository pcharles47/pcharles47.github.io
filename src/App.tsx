import { useLayoutEffect, useRef, type ReactNode } from "react";
import { Button, Container, Group } from "@mantine/core";
import { motion, useReducedMotion } from "framer-motion";
import {
  IconArrowDown,
  IconArrowUpRight,
  IconBrandLinkedin,
  IconMail,
} from "@tabler/icons-react";
import gsap from "gsap";
import drawing from "./assets/two-roles.svg?raw";

const asset = (name: string) => `/assets/${name}`;
const skills = [
  ["react", "React"],
  ["vue", "Vue"],
  ["js", "JavaScript"],
  ["ts", "TypeScript"],
  ["html", "HTML"],
  ["css", "CSS"],
  ["mantine", "Mantine"],
  ["node", "Node.js"],
  ["express", "Express"],
  ["postgres", "PostgreSQL"],
  ["redis", "Redis"],
  ["prisma", "Prisma"],
  ["figma", "Figma"],
  ["vscode", "VS Code"],
];

function Reveal({
  children,
  className = "",
  variant = "up",
}: {
  children: ReactNode;
  className?: string;
  variant?: "up" | "fade" | "image";
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={
        reduce
          ? false
          : {
            opacity: 0,
            y: variant === "fade" ? 0 : variant === "image" ? 18 : 26,
          }
      }
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.16 }}
      transition={{ duration: 1.25, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.div>
  );
}
function Label({ children }: { children: ReactNode }) {
  return <p className="eyebrow">{children}</p>;
}
function Detail({
  title,
  meta,
  children,
}: {
  title: string;
  meta: string;
  children: ReactNode;
}) {
  return (
    <div className="detail">
      <h3>{title}</h3>
      <p className="meta">{meta}</p>
      <p>{children}</p>
    </div>
  );
}
function Photo({
  src,
  alt,
  color = false,
}: {
  src: string;
  alt: string;
  color?: boolean;
}) {
  const displaySrc = src === "spcf-sms.png" ? "spcf-sms-light.png" : src;
  const isProject = src.endsWith(".png");
  const highlights: Record<string, string> = {
    "2024.jpg": "student",
    "2025.jpg": "instructor",
    "exp5.webp": "converge",
    "spcf.jpg": "cube",
  };
  const highlight = highlights[src];
  return (
    <Reveal
      variant="image"
      className={`photo ${src === "spcf-sms.png" ? "school-management" : ""} ${src === "converge (2).png" ? "viewmodem-project" : ""} ${src === "spcf-website.png" ? "school-prototype" : ""} ${isProject ? "project-image" : ""} ${color ? "photo-color" : ""} ${highlight ? `spotlight photo--${highlight}` : ""}`}
    >
      <div className="photo-canvas">
        <img src={asset(displaySrc)} alt={alt} loading="lazy" />
        {(highlight || src === "converge (2).png") && (
          <img
            className="photo-subject"
            src={asset(displaySrc)}
            alt=""
            aria-hidden="true"
            loading="lazy"
          />
        )}
      </div>
    </Reveal>
  );
}

function Skills() {
  return (
    <section className="skills" aria-label="My toolbox">
      <Container size="xl">
        <Label>My toolbox</Label>
      </Container>
      <div className="skills-mask">
        <div className="skills-track">
          {[0, 1].map((copy) => (
            <div
              className="skills-group"
              key={copy}
              aria-hidden={copy === 1 ? true : undefined}
            >
              {skills.map(([slug, label]) => (
                <div className="skill" key={slug}>
                  <img src={asset(`tech-logos/${slug}.svg`)} alt="" />
                  <span>{label}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SurfaceGrid() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  useLayoutEffect(() => {
    if (reduce || !ref.current) return;
    const ctx = gsap.context(() => {
      // One shared intersection keeps horizontal and vertical gutters at 12px,
      // including every intermediate frame and every responsive size.
      gsap
        .timeline({ repeat: -1, repeatDelay: 1.4, delay: 0.5 })
        .to(ref.current, {
          "--grid-x": "34%",
          "--grid-y": "65%",
          duration: 1.25,
          ease: "power2.inOut",
        })
        .to(
          ref.current,
          {
            "--grid-x": "55%",
            "--grid-y": "35%",
            duration: 1.25,
            ease: "power2.inOut",
          },
          "+=1.4",
        )
        .to(
          ref.current,
          {
            "--grid-x": "66%",
            "--grid-y": "50%",
            duration: 1.25,
            ease: "power2.inOut",
          },
          "+=1.4",
        );
    }, ref);
    return () => ctx.revert();
  }, [reduce]);
  return (
    <div
      className="surface-grid"
      ref={ref}
      role="img"
      aria-label="Four interface panels continuously rearrange into different grid layouts"
    >
      {[0, 1, 2, 3].map((i) => (
        <div className={`grid-panel panel-${i}`} key={i}>
          <span className="panel-dot" />
          <div className="panel-lines">
            <i />
            <i />
            <i />
          </div>
        </div>
      ))}
    </div>
  );
}

function DrawnArt() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  useLayoutEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      const paths = gsap.utils.toArray<SVGPathElement>(".role-line");
      // Trace the original illustration geometry with fine, theme-colored vector strokes.
      gsap.set(paths, {
        animation: "none",
        strokeDasharray: 1,
        strokeDashoffset: reduce ? 0 : 1,
      });
      if (!reduce) {
        const timeline = gsap.timeline({ repeat: -1, repeatDelay: 0.6 });
        timeline
          .to(paths, {
            strokeDashoffset: 0,
            duration: 0.75,
            stagger: 0.018,
            ease: "none",
          })
          .to(ref.current, { opacity: 0, duration: 0.75 }, "+=2.5")
          .set(paths, { strokeDashoffset: 1 })
          .set(ref.current, { opacity: 1 });
      }
    }, ref);
    return () => ctx.revert();
  }, [reduce]);
  return (
    <div
      className="drawing"
      ref={ref}
      dangerouslySetInnerHTML={{ __html: drawing }}
    />
  );
}

const experiences = [
  {
    year: "2024 — 2025",
    title: "Web Developer",
    company: "SYSTEMS PLUS COLLEGE FOUNDATION",
    description:
      "Built and maintained web applications and systems used by the institution.",
    image: "spcf.jpg",
    alt: "Systems Plus College Foundation campus sculpture",
    color: true,
  },
  {
    year: "2024 — 2025",
    title: "College IT Instructor",
    company: "SYSTEMS PLUS COLLEGE FOUNDATION",
    description:
      "Taught and mentored students, designed hands-on lessons, and helped future devs take their first steps in tech.",
    image: "2025.jpg",
    alt: "Teaching an IT class at Systems Plus College Foundation",
  },
  {
    year: "PROJECT / 2024",
    title: "School Website Prototype",
    company: "SYSTEMS PLUS COLLEGE FOUNDATION",
    description:
      "Led the design and development of a modern React-based website prototype to replace the institution’s existing website, improving accessibility, responsiveness, and content presentation.",
    image: "spcf-website.png",
    alt: "School website prototype with the headline Empower Your Future",
  },
  {
    year: "PROJECT / 2024",
    title: "School Management System",
    company: "SPCF — ICT DEVELOPMENT UNIT",
    description:
      "Collaborated with a four-person development team to build a Vue.js-based School Management System intended for deployment across five campuses.",
    image: "spcf-sms.png",
    alt: "Systems Plus College Foundation school management system",
  },
];

export default function App() {
  const reduce = useReducedMotion();
  return (
    <>
      <svg
        className="image-filter-definitions"
        width="0"
        height="0"
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          {(
            [
              ["green", "#32533D"],
              ["cream", "#F7F6F2"],
              ["gold", "#DFB86B"],
            ] as const
          ).map(([name, ink]) => (
            <filter
              id={`line-art-${name}`}
              key={name}
              x="0%"
              y="0%"
              width="100%"
              height="100%"
              colorInterpolationFilters="sRGB"
            >
              <feColorMatrix type="saturate" values="0" />
              <feGaussianBlur stdDeviation="0.45" />
              <feConvolveMatrix
                order="3"
                kernelMatrix="-1 -1 -1 -1 8 -1 -1 -1 -1"
                divisor="1"
                bias="0"
                preserveAlpha="true"
              />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  3 3 3 0 -0.06"
                result="edges"
              />
              <feFlood floodColor={ink} />
              <feComposite in2="edges" operator="in" />
            </filter>
          ))}
        </defs>
      </svg>
      <main>
        <div className="hero-surface-background">
          <div className="hero-background" aria-hidden="true" />
          <header className="hero">
            <Container size="sm" className="hero-content">
              <motion.div
                initial={reduce ? false : { opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              >
                <h1>
                  <span className="hero-initial">
                  <svg className="crown" viewBox="0 0 40 25" aria-hidden="true">
                    <path
                      d="M4 5 12 11 20 1 28 11 36 5 32 20H8Z"
                      fill="currentColor"
                    />
                    <path d="M8 24H32" stroke="currentColor" strokeWidth="2" />
                  </svg>
                  P
                  </span>
                  <span>.Charles</span>
                </h1>
                <p className="hero-intro">
                  <strong style={{ textWrap: "balance" }}>
                    Building software that makes sense, and makes a difference.
                  </strong>
                  <br />I enjoy turning complex business requirements into intuitive
                  interfaces, scalable architectures, and reliable software that
                  people enjoy using.
                </p>
                <Group justify="center" gap={12} mt={32}>
                  <Button
                    component="a"
                    href="#about"
                    className="button-primary"
                    rightSection={<IconArrowUpRight size={15} />}
                  >
                    ABOUT ME
                  </Button>
                  <Button
                    component="a"
                    href="#contact"
                    variant="outline"
                    className="button-outline"
                  >
                    CONTACT
                  </Button>
                </Group>
              </motion.div>
              <a className="scroll-cue" href="#about">
                <IconArrowDown size={17} />
                <span>SCROLL TO EXPLORE</span>
              </a>
            </Container>
            <Skills />
          </header>
          <section id="about" className="section surface">
            <Container size="xl" className="split">
              <Reveal>
                <Label>01: THE SURFACE</Label>
                <h2>
                  I started with
                  <br />
                  what people see.
                </h2>
                <p>
                  The colors, the layouts, and the little details that make an
                  interface feel right. Learning how each choice shapes the
                  experience, one screen at a time.
                </p>
              </Reveal>
              <SurfaceGrid />
            </Container>
          </section>
        </div>
        <section className="section beneath">
          <Container size="xl" className="split">
            <Reveal>
              <Label>02: BENEATH THE SURFACE</Label>
              <h2>But an interface is only part of the picture.</h2>
              <p>
                Behind it are the data, the logic, and the connections that
                bring everything together. It’s where the pieces start to make
                sense, turning what people see into something that actually
                works.
              </p>
              <Detail
                title="STUDENT DEVELOPER"
                meta="SPCF — ICT DEVELOPMENT UNIT | 2022 — 2024"
              >
                Started building real-world projects, learned frontend
                development, and collaborated on systems used across the
                college.
              </Detail>
            </Reveal>
            <Photo
              src="2024.jpg"
              alt="Presenting a project with fellow student developers"
            />
          </Container>
        </section>
        <section className="other-side">
          <Container size="xl">
            <div className="split other-intro">
              <DrawnArt />
              <Reveal variant="fade">
                <Label>03: ON THE OTHER SIDE</Label>
                <h2>
                  For a while, I<br />
                  wore two hats.
                </h2>
                <p>
                  Building software, and teaching others. One taught me how to
                  create. The other challenged me to explain, simplify, and see
                  things from a different perspective.
                </p>
              </Reveal>
            </div>
            <div className="experience-list">
              {experiences.map((item, i) => (
                <article
                  className={`experience-row ${i % 2 ? "reverse" : ""}`}
                  key={item.title}
                >
                  <Reveal className="experience-copy">
                    <Label>{item.year}</Label>
                    <div>
                      <h3>{item.title}</h3>
                      <p className="meta">{item.company}</p>
                      <p>{item.description}</p>
                    </div>
                  </Reveal>
                  <Photo src={item.image} alt={item.alt} color={item.color} />
                </article>
              ))}
            </div>
          </Container>
        </section>
        <section className="chapter">
          <Container size="xl">
            <div className="split chapter-row">
              <Photo src="exp5.webp" alt="Converge ICT headquarters" color />
              <Reveal>
                <Label>04: THE BIGGER PICTURE</Label>
                <h2>Then came a new chapter.</h2>
                <p>
                  Working on software in a professional environment, alongside
                  people solving problems at a larger scale. More than writing
                  code, it meant thinking about how the pieces fit together.
                </p>
                <Detail
                  title="SOFTWARE ENGINEER II"
                  meta="CONVERGE ICT SOLUTIONS | 2025 — PRESENT"
                >
                  Solving real problems, working with awesome people, and
                  leveling up every day.
                </Detail>
              </Reveal>
            </div>
            <div className="split chapter-row">
              <Reveal>
                <Label>05: CONNECTING THE PIECES</Label>
                <h2>
                  The more I build,
                  <br />
                  the more I notice.
                </h2>
                <p>
                  The information that needs to come together. The details that
                  need to make sense. The gap between what a system shows and
                  what someone needs to understand.
                </p>
                <Detail
                  title="VIEWMODEM V2"
                  meta="CONVERGE ICT SOLUTIONS | PROJECT: 2025"
                >
                  Unified network monitoring and diagnostics into one platform
                  for nationwide teams, improving workflows and visibility.
                </Detail>
              </Reveal>
              <Photo
                src="converge (2).png"
                alt="ViewModem V2 network monitoring platform login screen"
              />
            </div>
          </Container>
        </section>
      </main>
      <footer id="contact">
        <Container size="xl">
          <div className="signature">
            <img src={asset("brand-mark.svg")} width="40" height="40" alt="" />
            <span>Prince Charles Clemente</span>
          </div>
          <Reveal>
            <div className="closing-copy">
              <p>
                From the first interface I designed to the systems I work on
                today, the goal has stayed close to the same:
              </p>
              <p>
                <strong>
                  Make complicated things easier to understand and use.
                </strong>
                <br />
                There’s still more to learn, more to build, and more problems
                worth solving.
              </p>
            </div>
          </Reveal>
          <Reveal>
            <h2>Let’s build something.</h2>
            <Group gap={12}>
              <Button
                component="a"
                href="mailto:clemente.pcharles@gmail.com"
                className="contact-primary"
                leftSection={<IconMail size={16} />}
              >
                EMAIL
              </Button>
              <Button
                component="a"
                href="https://www.linkedin.com/in/clemente-pcharles"
                target="_blank"
                rel="noopener noreferrer"
                variant="outline"
                className="contact-outline"
                leftSection={<IconBrandLinkedin size={16} />}
              >
                LINKEDIN
              </Button>
            </Group>
          </Reveal>
          <div className="footer-note">
            <span>Thoughtfully built. Always learning.</span>
            <a
              href="#top"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({
                  top: 0,
                  behavior: reduce ? "instant" : "smooth",
                });
              }}
            >
              BACK TO TOP ↑
            </a>
          </div>
        </Container>
      </footer>
    </>
  );
}
