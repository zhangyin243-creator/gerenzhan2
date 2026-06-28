import React from "react";
import { createRoot } from "react-dom/client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowUpRight,
  Briefcase,
  ChatsCircle,
  CirclesThreePlus,
  EnvelopeSimple,
  Files,
  GlobeHemisphereEast,
  GraduationCap,
  ImageSquare,
  Lightning,
  Phone,
  Sparkle,
} from "@phosphor-icons/react";
import BorderGlow from "./BorderGlow";
import "./styles.css";

gsap.registerPlugin(ScrollTrigger);

const contact = {
  phone: "15320612087",
  email: "zhangyin243@gmail.com",
};

const maskedPhone = contact.phone.replace(/(\d{3})\d{4}(\d+)/, "$1****$2");

const stats = [
  { value: "CET-6", label: "英语能力" },
  { value: "6+", label: "工具与办公能力" },
  { value: "3", label: "设计方向" },
  { value: "AI / Web3", label: "内容关注领域" },
];

const experiences = [
  {
    title: "重庆移通学院",
    meta: "英语专业 | 本科毕业",
    icon: GraduationCap,
  },
  {
    title: "重庆工商职业学院",
    meta: "商务英语专业 | 专科毕业",
    icon: GraduationCap,
  },
  {
    title: "区块链 / Solana 相关实践",
    meta: "项目资料检索、内容整理、AI辅助视觉构思",
    icon: GlobeHemisphereEast,
  },
  {
    title: "零售与农业一线实习经历",
    meta: "流程执行、现场服务、数据记录与任务跟进",
    icon: Briefcase,
  },
];

const projects = [
  {
    title: "AI视觉方向研究",
    type: "Generative Visual",
    image: "/media/ai-visual/ai-visual-board.webp",
    width: 1672,
    height: 941,
    copy: "用生成式AI辅助图像创意、提示词优化、素材迭代和视觉方案输出。",
  },
  {
    title: "Solana生态内容支持",
    type: "Web3 Content",
    image: "/portfolio-assets/project-solana.webp",
    width: 1536,
    height: 1024,
    copy: "检索、筛选并整理中英文项目资料，将复杂信息转化为可理解的内容素材。",
  },
  {
    title: "品牌物料与社媒视觉",
    type: "Brand System",
    image: "/media/brand-system/brand-social-board.webp",
    width: 1586,
    height: 992,
    copy: "围绕品牌调性、视觉一致性和传播场景，完成基础海报、社媒图和商品视觉。",
  },
  {
    title: "跨境商品信息呈现",
    type: "Commerce Layout",
    image: "/media/commerce-layout/commerce-layout-board.webp",
    width: 1535,
    height: 1024,
    copy: "结合英语与商务英语背景，处理产品信息、英文资料和上架内容表达。",
  },
];

const strengths = [
  {
    title: "AI辅助创意",
    copy: "熟悉ChatGPT、Codex等工具，可将资料归纳、文案优化和视觉构思连接到工作流。",
    icon: Sparkle,
  },
  {
    title: "视觉层级与版式",
    copy: "具备版式、层级、信息呈现意识，适合参与海报、社媒图、商品视觉和基础规范整理。",
    icon: ImageSquare,
  },
  {
    title: "英文资料处理",
    copy: "通过CET-4 / CET-6，可阅读英文资料，支持跨境电商、产品内容和项目资料整理。",
    icon: ChatsCircle,
  },
  {
    title: "稳定执行与细节意识",
    copy: "有一线服务和实习经历，理解标准流程、任务跟进、现场沟通和持续执行的重要性。",
    icon: Lightning,
  },
  {
    title: "内容结构化",
    copy: "能把行业动态、项目资料和产品信息整理为清晰的内容框架，服务运营与传播。",
    icon: Files,
  },
  {
    title: "品牌一致性",
    copy: "理解调性、规范和多触点一致表达，可参与品牌物料、传播内容与视觉资产维护。",
    icon: CirclesThreePlus,
  },
];

const organicVideo =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260619_191346_9d19d66e-86a4-47f7-8dc6-712c1788c3b2.mp4";

function DeferredVideo({ src, eager = false, rootMargin = "900px", autoPlay, ...props }) {
  const videoRef = React.useRef(null);
  const [videoSrc, setVideoSrc] = React.useState(eager ? "" : null);

  React.useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;

    if (eager) {
      const load = () => setVideoSrc(src);
      const timeoutId = window.setTimeout(load, 450);
      return () => window.clearTimeout(timeoutId);
    }

    if (!("IntersectionObserver" in window)) {
      setVideoSrc(src);
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        setVideoSrc(src);
        observer.disconnect();
      },
      { rootMargin },
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [eager, rootMargin, src]);

  React.useEffect(() => {
    const video = videoRef.current;
    if (!videoSrc || !autoPlay || !video) return;
    video.load();
    video.play().catch(() => {});
  }, [autoPlay, videoSrc]);

  return (
    <video
      ref={videoRef}
      src={videoSrc || undefined}
      preload={videoSrc ? "metadata" : "none"}
      autoPlay={autoPlay}
      {...props}
    />
  );
}

function DeferredImage({ src, rootMargin = "700px", ...props }) {
  const imageRef = React.useRef(null);
  const [imageSrc, setImageSrc] = React.useState(null);

  React.useEffect(() => {
    const image = imageRef.current;
    if (!image) return undefined;

    if (!("IntersectionObserver" in window)) {
      setImageSrc(src);
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        setImageSrc(src);
        observer.disconnect();
      },
      { rootMargin },
    );

    observer.observe(image);
    return () => observer.disconnect();
  }, [rootMargin, src]);

  return <img ref={imageRef} src={imageSrc || undefined} data-src={src} {...props} />;
}

function Nav() {
  return (
    <nav className="nav" aria-label="主导航">
      <a className="nav-brand" href="#top" aria-label="返回首页">
        <span>ZY</span>
        <strong>ZHANG YING</strong>
      </a>
      <div className="nav-links">
        <a href="#profile">经历</a>
        <a href="#projects">项目</a>
        <a href="#strengths">优势</a>
        <a href="#contact">联系</a>
      </div>
      <a className="nav-cta" href={`mailto:${contact.email}`}>
        联系我
        <EnvelopeSimple size={18} weight="bold" />
      </a>
    </nav>
  );
}

function Hero() {
  return (
    <section id="top" className="hero">
      <DeferredVideo
        className="hero-video"
        src="/portfolio-assets/hero-loop.mp4"
        poster="/portfolio-assets/hero-poster.png"
        eager
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
      />
      <div className="hero-inner page-shell">
        <div className="hero-kicker">Zhang Ying Portfolio</div>
        <h1>
          <span className="hero-title-main">Visual Designer</span>
          <span className="hero-title-sub">&amp; AI Brand Designer</span>
        </h1>
        <p>
          视觉设计师、AI设计师、品牌设计师。以英语背景、AI工具和品牌意识，将复杂信息转译为克制、清晰、有质感的视觉表达。
        </p>
        <div className="hero-actions">
          <a className="primary-button" href={`mailto:${contact.email}`}>
            联系我
            <ArrowUpRight size={18} weight="bold" />
          </a>
          <a className="text-link" href="#projects">
            查看精选项目
          </a>
        </div>
      </div>
    </section>
  );
}

function ZyVisual() {
  const orbitPath =
    "M 201 1022 C 96 781 188 488 407 280 C 631 68 869 136 922 419 C 972 683 851 945 620 1105 C 415 1247 261 1157 201 1022 Z";

  return (
    <BorderGlow className="profile-glow profile-glow-visual" animated>
      <div className="profile-visual-panel zy-visual-panel" aria-label="ZY brand visual">
        <DeferredImage
          className="zy-visual-bg"
          src="/portfolio-assets/zy-bg.webp"
          rootMargin="1100px"
          width="1086"
          height="1448"
          loading="lazy"
          decoding="async"
          alt=""
          aria-hidden="true"
        />
        <DeferredImage
          className="zy-flower-layer"
          src="/portfolio-assets/zy-flower.webp"
          rootMargin="1100px"
          width="1086"
          height="1448"
          loading="lazy"
          decoding="async"
          alt=""
          aria-hidden="true"
        />
        <div className="zy-petal-shimmer" aria-hidden="true" />
        <svg className="zy-orbit-svg" viewBox="0 0 1086 1448" aria-hidden="true">
          <defs>
            <path id="zyOrbitPath" d={orbitPath} />
            <filter id="zyParticleGlow" x="-80%" y="-80%" width="260%" height="260%">
              <feGaussianBlur stdDeviation="9" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <use className="zy-orbit-line" href="#zyOrbitPath" />
          <use className="zy-orbit-flow" href="#zyOrbitPath" />
          <circle className="zy-orbit-particle is-main" r="9" filter="url(#zyParticleGlow)">
            <animateMotion dur="19s" repeatCount="indefinite" rotate="auto">
              <mpath href="#zyOrbitPath" />
            </animateMotion>
          </circle>
          <circle className="zy-orbit-particle is-soft" r="6" filter="url(#zyParticleGlow)">
            <animateMotion dur="25s" begin="-8s" repeatCount="indefinite" rotate="auto">
              <mpath href="#zyOrbitPath" />
            </animateMotion>
          </circle>
          <circle className="zy-orbit-particle is-faint" r="4" filter="url(#zyParticleGlow)">
            <animateMotion dur="34s" begin="-17s" repeatCount="indefinite" rotate="auto">
              <mpath href="#zyOrbitPath" />
            </animateMotion>
          </circle>
        </svg>
        <div className="zy-visual-caption">
          <span>Available for</span>
          <strong>Visual / AI / Brand Design</strong>
        </div>
      </div>
    </BorderGlow>
  );
}

function Profile() {
  return (
    <section id="profile" className="profile section page-shell">
      <div className="section-heading">
        <span>Profile</span>
        <h2 className="split-heading profile-heading">
          <span className="heading-line">英语专业出身，</span>
          <span className="heading-line">用 AI 与设计</span>
          <span className="heading-line">把复杂信息转化为清晰视觉。</span>
        </h2>
      </div>
      <div className="profile-grid">
        <ZyVisual />
        <div className="profile-visual-panel" aria-label="张颖个人品牌视觉">
          <div className="profile-visual-orbit" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <div className="profile-visual-core" aria-hidden="true">
            <strong>ZY</strong>
          </div>
          <div className="profile-visual-caption">
            <span>Available for</span>
            <strong>Visual / AI / Brand Design</strong>
          </div>
        </div>
        <BorderGlow className="profile-glow profile-glow-copy">
          <div className="profile-copy">
            <p>
              我是张颖，应届毕业生，本科英语专业，专科商务英语专业。我的目标方向聚焦视觉设计、AI设计、品牌设计，同时具备跨境电商、英文资料处理和区块链内容支持的学习与实践基础。
            </p>
            <p>
              我能使用办公软件完成归档、表格和汇报材料，也能用AI工具辅助英文写作、资料归纳、文案优化、提示词迭代和视觉素材构思。对我来说，设计不只是画面，更是信息的筛选、排序和表达，让内容更清晰、更准确，也更具传播力。
            </p>
            <div className="contact-strip" aria-label="联系方式">
              <a href={`tel:${contact.phone}`}>
                <Phone size={18} weight="bold" />
                {maskedPhone}
              </a>
              <a href={`mailto:${contact.email}`}>
                <EnvelopeSimple size={18} weight="bold" />
                {contact.email}
              </a>
            </div>
            <div className="experience-list">
              {experiences.map((item) => {
                const Icon = item.icon;
                return (
                  <article key={item.title}>
                    <Icon size={22} weight="duotone" />
                    <div>
                      <h3>{item.title}</h3>
                      <p>{item.meta}</p>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </BorderGlow>
        <BorderGlow className="profile-glow profile-glow-stats">
          <div className="stats-panel">
            {stats.map((item) => (
              <div key={item.label}>
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </BorderGlow>
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section id="projects" className="projects section page-shell">
      <div className="section-heading compact">
        <span>Selected Projects</span>
        <h2 className="split-heading projects-heading">
          <span className="heading-line">以方向型项目呈现</span>
          <span className="heading-line">设计方法与能力，</span>
          <span className="heading-line">持续沉淀为可落地的完整作品。</span>
        </h2>
      </div>
      <div className="project-grid">
        {projects.map((project, index) => (
          <BorderGlow
            className={`project-glow project-glow-${index + 1}`}
            key={project.title}
            animated={index === 0}
          >
            <article className={`project-card project-card-${index + 1}`}>
              <DeferredImage
                src={project.image}
                rootMargin="560px"
                width={project.width}
                height={project.height}
                loading="lazy"
                decoding="async"
                alt={`${project.title}作品视觉`}
              />
              <div className="project-card-content">
                <span>{project.type}</span>
                <h3>{project.title}</h3>
                <p>{project.copy}</p>
              </div>
            </article>
          </BorderGlow>
        ))}
      </div>
    </section>
  );
}

function Strengths() {
  return (
    <section id="strengths" className="strengths section page-shell">
      <div className="section-heading">
        <span>Capabilities</span>
        <h2>把语言能力、工具意识和视觉判断合并为可执行的设计支持。</h2>
      </div>
      <div className="strength-grid">
        {strengths.map((item) => {
          const Icon = item.icon;
          return (
            <BorderGlow className="strength-glow" key={item.title}>
              <article className="strength-card">
                <div className="strength-icon">
                  <Icon size={26} weight="duotone" />
                </div>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </article>
            </BorderGlow>
          );
        })}
      </div>
    </section>
  );
}

function ContactFinale() {
  return (
    <section id="contact" className="contact-finale">
      <DeferredVideo
        className="contact-video"
        src={organicVideo}
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
      />
      <div className="contact-bg" aria-hidden="true" />
      <div className="page-shell contact-inner">
        <span>Contact</span>
        <div className="contact-actions">
          <a className="primary-button" href={`mailto:${contact.email}`}>
            {contact.email}
            <ArrowUpRight size={18} weight="bold" />
          </a>
          <a className="secondary-button" href={`tel:${contact.phone}`}>
            {maskedPhone}
            <Phone size={18} weight="bold" />
          </a>
        </div>
      </div>
    </section>
  );
}

function usePortfolioMotion() {
  React.useLayoutEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const heroTargets =
      ".nav, .hero-video, .hero-kicker, .hero-title-main, .hero-title-sub, .hero p, .hero-actions";
    const hasTargets = (target) => {
      if (!target) return false;
      if (typeof target === "string") return Boolean(document.querySelector(target));
      if (typeof target.length === "number") return target.length > 0;
      return true;
    };
    const safeSet = (target, vars) => {
      if (hasTargets(target)) gsap.set(target, vars);
    };

    const revealHeroFallback = () => {
      window.__portfolioHeroOpened = true;
      gsap.killTweensOf(heroTargets);
      gsap.set(heroTargets, {
        autoAlpha: 1,
        clipPath: "inset(0 0 0% 0)",
        clearProps: "transform,opacity,visibility,clipPath",
      });
      ScrollTrigger.refresh();
    };

    if (reduceMotion) {
      document.documentElement.classList.add("motion-reduced");
      revealHeroFallback();
      return () => document.documentElement.classList.remove("motion-reduced");
    }

    const fallbackId = window.setTimeout(() => {
      if (!window.__portfolioHeroOpened) revealHeroFallback();
    }, 2600);

    const ctx = gsap.context(() => {
      const slowEase = "power4.out";
      const revealEase = "expo.out";

      safeSet(".nav", { y: -72, autoAlpha: 0 });
      safeSet(".hero-video", { scale: 1.16, autoAlpha: 0.42 });
      safeSet(".hero-kicker", { y: 28, autoAlpha: 0, clipPath: "inset(0 0 100% 0)" });
      safeSet(".hero-title-main, .hero-title-sub", {
        yPercent: 118,
        scaleY: 0.58,
        autoAlpha: 0,
        clipPath: "inset(0 0 100% 0)",
        transformOrigin: "50% 100%",
      });
      safeSet(".hero p, .hero-actions", { y: 34, autoAlpha: 0 });

      gsap
        .timeline({
          defaults: { ease: slowEase },
          onComplete: () => {
            window.__portfolioHeroOpened = true;
            ScrollTrigger.refresh();
          },
        })
        .to(".hero-video", { scale: 1.03, autoAlpha: 1, duration: 1.9 }, 0)
        .to(".nav", { y: 0, autoAlpha: 1, duration: 1.05 }, 0.18)
        .to(
          ".hero-kicker",
          { y: 0, autoAlpha: 1, clipPath: "inset(0 0 0% 0)", duration: 0.9 },
          0.42,
        )
        .to(
          ".hero-title-main",
          {
            yPercent: 0,
            scaleY: 1,
            autoAlpha: 1,
            clipPath: "inset(0 0 0% 0)",
            duration: 1.35,
            ease: revealEase,
          },
          0.62,
        )
        .to(
          ".hero-title-sub",
          {
            yPercent: 0,
            scaleY: 1,
            autoAlpha: 1,
            clipPath: "inset(0 0 0% 0)",
            duration: 1.45,
            ease: revealEase,
          },
          0.82,
        )
        .to(".hero p", { y: 0, autoAlpha: 1, duration: 1.0 }, 1.35)
        .to(".hero-actions", { y: 0, autoAlpha: 1, duration: 0.95 }, 1.52);

      gsap.utils.toArray(".section").forEach((section) => {
        const eyebrow = section.querySelector(".section-heading > span");
        const titleTargets = section.querySelectorAll(".section-heading .heading-line");
        const title = titleTargets.length ? titleTargets : section.querySelectorAll(".section-heading h2");
        const cards = section.querySelectorAll(
          ".profile-grid > .profile-glow, .project-grid > .project-glow, .strength-grid > .strength-glow",
        );

        safeSet(eyebrow, { y: 42, autoAlpha: 0, clipPath: "inset(0 0 100% 0)" });
        safeSet(title, {
          yPercent: 128,
          scaleY: 0.66,
          autoAlpha: 0,
          clipPath: "inset(0 0 100% 0)",
          transformOrigin: "50% 100%",
        });
        safeSet(cards, {
          y: 120,
          rotationX: 8,
          autoAlpha: 0,
          clipPath: "inset(18% 0 0 0)",
          transformOrigin: "50% 100%",
        });

        gsap
          .timeline({
            scrollTrigger: {
              trigger: section,
              start: "top 72%",
              once: true,
            },
            defaults: { ease: slowEase },
          })
          .to(eyebrow, { y: 0, autoAlpha: 1, clipPath: "inset(0 0 0% 0)", duration: 0.72 })
          .to(
            title,
            {
              yPercent: 0,
              scaleY: 1,
              autoAlpha: 1,
              clipPath: "inset(0 0 0% 0)",
              duration: 1.15,
              stagger: 0.08,
              ease: revealEase,
            },
            "-=0.24",
          )
          .to(
            cards,
            {
              y: 0,
              rotationX: 0,
              autoAlpha: 1,
              clipPath: "inset(0% 0 0 0)",
              duration: 1.15,
              stagger: { each: 0.13, from: "start" },
            },
            "-=0.42",
          );
      });

      gsap.utils.toArray(".project-card > img").forEach((image) => {
        gsap.fromTo(
          image,
          { clipPath: "inset(0 0 100% 0)", scale: 1.08, yPercent: -5 },
          {
            clipPath: "inset(0 0 0% 0)",
            scale: 1.02,
            yPercent: 0,
            duration: 1.25,
            ease: revealEase,
            scrollTrigger: {
              trigger: image,
              start: "top 82%",
              once: true,
            },
          },
        );

        gsap.to(image, {
          yPercent: 5,
          ease: "none",
          scrollTrigger: {
            trigger: image.closest(".project-glow") || image,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.8,
          },
        });
      });

      gsap.to(".zy-visual-bg", {
        yPercent: 6,
        scale: 1.06,
        ease: "none",
        scrollTrigger: {
          trigger: ".profile-glow-visual",
          start: "top bottom",
          end: "bottom top",
          scrub: 0.9,
        },
      });

      gsap.to(".zy-flower-layer", {
        yPercent: -5,
        scale: 1.05,
        ease: "none",
        scrollTrigger: {
          trigger: ".profile-glow-visual",
          start: "top bottom",
          end: "bottom top",
          scrub: 0.9,
        },
      });

      gsap.fromTo(
        ".contact-inner > span, .contact-actions",
        { y: 72, autoAlpha: 0, clipPath: "inset(24% 0 0 0)" },
        {
          y: 0,
          autoAlpha: 1,
          clipPath: "inset(0% 0 0 0)",
          duration: 1.25,
          stagger: 0.16,
          ease: revealEase,
          scrollTrigger: {
            trigger: ".contact-finale",
            start: "top 70%",
            once: true,
          },
        },
      );

      gsap.to(".contact-video", {
        scale: 1.08,
        yPercent: -4,
        ease: "none",
        scrollTrigger: {
          trigger: ".contact-finale",
          start: "top bottom",
          end: "bottom top",
          scrub: 0.85,
        },
      });

      window.__portfolioMotion = {
        triggerCount: ScrollTrigger.getAll().length,
      };
    });

    return () => {
      window.clearTimeout(fallbackId);
      ctx.revert();
      delete window.__portfolioHeroOpened;
      delete window.__portfolioMotion;
    };
  }, []);
}

function App() {
  usePortfolioMotion();

  React.useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    window.requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });

      if (window.location.hash) {
        window.history.replaceState(null, "", window.location.pathname + window.location.search);
      }
    });
  }, []);

  return (
    <>
      <Nav />
      <Hero />
      <Profile />
      <Projects />
      <Strengths />
      <ContactFinale />
    </>
  );
}

const rootElement = document.getElementById("root");
const root = window.__portfolioReactRoot || createRoot(rootElement);
window.__portfolioReactRoot = root;
root.render(<App />);
