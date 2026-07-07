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
  Sparkle,
} from "@phosphor-icons/react";
import BorderGlow from "./BorderGlow";
import "./styles.css";

gsap.registerPlugin(ScrollTrigger);

const contact = {
  email: "zhangyin243@gmail.com",
};

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
    image: "/media/ai-visual/ai-visual-research-board.png",
    width: 1672,
    height: 941,
    copy: "用生成式AI辅助图像创意、提示词优化、素材迭代和视觉方案输出。",
  },
  {
    title: "AI设计",
    type: "AI Design",
    image: "/media/ai-design/ai-design-board.png",
    width: 1672,
    height: 941,
    copy: "围绕AI辅助设计流程，展示从需求分析、概念探索、提示词优化到方案呈现的完整工作流。",
  },
  {
    title: "品牌设计",
    type: "Brand Design",
    image: "/media/brand-design/brand-design-board.png",
    width: 1672,
    height: 941,
    copy: "以品牌策略、视觉统一和全触点传播为核心，梳理品牌系统、包装应用与社交媒体视觉。",
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
    image: "/media/commerce-layout/commerce-layout-board-new.png",
    width: 1672,
    height: 941,
    copy: "结合英语与商务英语背景，处理产品信息、英文资料和上架内容表达。",
  },
];

const projectOrder = [
  "/media/ai-visual/ai-visual-research-board.png",
  "/media/ai-design/ai-design-board.png",
  "/media/brand-design/brand-design-board.png",
  "/media/commerce-layout/commerce-layout-board-new.png",
  "/media/brand-system/brand-social-board.webp",
  "/portfolio-assets/project-solana.webp",
];

const orderedProjects = projectOrder
  .map((image) => projects.find((project) => project.image === image))
  .filter(Boolean);

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

function DeferredVideo({ src, eager = false, rootMargin = "900px", autoPlay, preloadMode = "metadata", ...props }) {
  const videoRef = React.useRef(null);
  const [videoSrc, setVideoSrc] = React.useState(eager ? "" : null);

  React.useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;

    if (eager) {
      setVideoSrc(src);
      return undefined;
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
      preload={videoSrc ? preloadMode : "none"}
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
        <strong>ZHANGYING</strong>
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
      <div className="hero-frame">
        <DeferredVideo
          className="hero-video"
          src="/portfolio-assets/rivr-hero-loop-optimized.mp4"
          eager
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
        />
        <div className="hero-scrim" aria-hidden="true" />
        <div className="opening-wipe" aria-hidden="true" />
        <div className="hero-inner">
          <div className="hero-kicker">ZHANGYING Portfolio</div>
          <h1>
            <span className="hero-title-main">Visual Designer</span>
            <span className="hero-title-sub">&amp; AI Brand Designer</span>
          </h1>
          <p>
            视觉设计师、AI设计师、品牌设计师。以英语背景、AI工具和品牌意识，将复杂信息转译为克制、清晰、有质感的视觉表达。
          </p>
          <div className="hero-actions">
            <a className="primary-button" href="#projects">
              查看精选项目
              <ArrowUpRight size={18} weight="bold" />
            </a>
            <a className="text-link" href="#profile">
              了解经历
            </a>
          </div>
        </div>
        <a className="hero-contact-corner" href={`mailto:${contact.email}`} aria-label={`联系我 ${contact.email}`}>
          <span className="hero-corner-mask hero-corner-mask-top" aria-hidden="true" />
          <span className="hero-corner-mask hero-corner-mask-left" aria-hidden="true" />
          <span className="hero-contact-icon" aria-hidden="true">
            <ArrowUpRight size={24} weight="bold" />
          </span>
          <span className="hero-contact-copy">
            <strong>联系我</strong>
            <span>{contact.email}</span>
          </span>
        </a>
      </div>
    </section>
  );
}

function ZyVisual() {
  return (
    <BorderGlow className="profile-glow profile-glow-visual" animated>
      <div className="profile-visual-panel zy-visual-panel" aria-label="ZY brand visual">
        <DeferredImage
          className="zy-profile-scene"
          src="/portfolio-assets/profile-scene.png"
          rootMargin="1100px"
          width="1200"
          height="1978"
          loading="lazy"
          decoding="async"
          alt=""
          aria-hidden="true"
        />
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
        <div className="profile-visual-panel" aria-label="ZHANGYING个人品牌视觉">
          <div className="profile-visual-orbit" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <div className="profile-visual-core" aria-hidden="true">
            <strong>ZY</strong>
          </div>
        </div>
        <BorderGlow className="profile-glow profile-glow-copy">
          <div className="profile-copy">
            <p>
              我是ZHANGYING，应届毕业生，本科英语专业，专科商务英语专业。我的目标方向聚焦视觉设计、AI设计、品牌设计，同时具备跨境电商、英文资料处理和区块链内容支持的学习与实践基础。
            </p>
            <p>
              我能使用办公软件完成归档、表格和汇报材料，也能用AI工具辅助英文写作、资料归纳、文案优化、提示词迭代和视觉素材构思。对我来说，设计不只是画面，更是信息的筛选、排序和表达，让内容更清晰、更准确，也更具传播力。
            </p>
            <div className="contact-strip" aria-label="联系方式">
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
  const [activeIndex, setActiveIndex] = React.useState(0);
  const galleryRef = React.useRef(null);
  const activeProject = orderedProjects[activeIndex];

  const handleGalleryPointerMove = React.useCallback((event) => {
    const gallery = galleryRef.current;
    if (
      !gallery ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !window.matchMedia("(hover: hover) and (pointer: fine)").matches
    ) return;

    const rect = gallery.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5).toFixed(3);
    const y = ((event.clientY - rect.top) / rect.height - 0.5).toFixed(3);

    gallery.style.setProperty("--project-x", x);
    gallery.style.setProperty("--project-y", y);
  }, []);

  const resetGalleryPointer = React.useCallback(() => {
    const gallery = galleryRef.current;
    if (!gallery) return;
    gallery.style.setProperty("--project-x", "0");
    gallery.style.setProperty("--project-y", "0");
  }, []);

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
      <div
        className="project-gallery"
        ref={galleryRef}
        onPointerMove={handleGalleryPointerMove}
        onPointerLeave={resetGalleryPointer}
      >
        <div className="project-gallery-panel">
          <span className="project-gallery-kicker">Project Index</span>
          <div className="project-gallery-list" role="list" aria-label="Selected project list">
            {orderedProjects.map((project, index) => (
              <button
                className={`project-gallery-item${index === activeIndex ? " is-active" : ""}`}
                type="button"
                key={project.title}
                onMouseEnter={() => setActiveIndex(index)}
                onFocus={() => setActiveIndex(index)}
                onClick={() => setActiveIndex(index)}
                aria-pressed={index === activeIndex}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{project.title}</strong>
                <em>{project.type}</em>
              </button>
            ))}
          </div>
        </div>

        <div className="project-stage" aria-live="polite">
          <div className="project-stage-bg" aria-hidden="true" />
          <div className="project-stack" aria-hidden="true">
            {orderedProjects.map((project, index) => {
              const stackIndex = index;
              const stackDepth = orderedProjects.length - index;
              return (
                <span
                  className={`project-stack-card${index === activeIndex ? " is-current" : ""}`}
                  style={{ "--stack-index": stackIndex, "--stack-depth": stackDepth }}
                  key={project.title}
                >
                  <img src={project.image} alt="" loading="lazy" decoding="async" />
                </span>
              );
            })}
          </div>
          <article className="project-stage-card">
            <div className="project-stage-media" style={{ aspectRatio: `${activeProject.width} / ${activeProject.height}` }}>
              <DeferredImage
                key={activeProject.image}
                className="project-stage-image"
                src={activeProject.image}
                rootMargin="560px"
                width={activeProject.width}
                height={activeProject.height}
                loading="lazy"
                decoding="async"
                alt={`${activeProject.title} project visual`}
              />
            </div>
            <div className="project-stage-copy">
              <span>{String(activeIndex + 1).padStart(2, "0")} / {String(orderedProjects.length).padStart(2, "0")}</span>
              <h3>{activeProject.title}</h3>
              <p>{activeProject.copy}</p>
              <div className="project-stage-tags" aria-label="Project tags">
                <small>{activeProject.type}</small>
                <small>Visual Direction</small>
                <small>Portfolio Work</small>
              </div>
            </div>
          </article>
        </div>
      </div>
      <div className="project-grid">
        {orderedProjects.map((project, index) => (
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
  const contactRef = React.useRef(null);

  const handlePointerMove = React.useCallback((event) => {
    const section = contactRef.current;
    if (!section || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const rect = section.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5).toFixed(3);
    const y = ((event.clientY - rect.top) / rect.height - 0.5).toFixed(3);

    section.style.setProperty("--contact-x", x);
    section.style.setProperty("--contact-y", y);
  }, []);

  const handlePointerLeave = React.useCallback(() => {
    const section = contactRef.current;
    if (!section) return;
    section.style.setProperty("--contact-x", "0");
    section.style.setProperty("--contact-y", "0");
  }, []);

  return (
    <section
      id="contact"
      className="contact-finale"
      ref={contactRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <div className="contact-scene-layer" aria-hidden="true">
        <DeferredVideo
          className="contact-scene-video"
          src="/portfolio-assets/rivr-hero-loop.mp4"
          rootMargin="1800px"
          preloadMode="auto"
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="contact-cinematic-scrim" />
      </div>
      <div className="page-shell contact-inner">
        <a className="contact-badge" href={`mailto:${contact.email}`}>
          Contact by email
          <span aria-hidden="true">{"->"}</span>
        </a>
        <h2>
          <a className="contact-email-link" href={`mailto:${contact.email}`} aria-label={`Send email to ${contact.email}`}>
            {contact.email}
          </a>
        </h2>
        <div className="contact-actions">
          <a className="primary-button" href={`mailto:${contact.email}`} aria-label={`Send email to ${contact.email}`}>
            Send email
            <span aria-hidden="true">{"->"}</span>
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
      ".nav, .hero-frame, .hero-video, .hero-scrim, .opening-wipe, .hero-kicker, .hero-title-main, .hero-title-sub, .hero p, .hero-actions, .hero-contact-corner";
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
      gsap.set(".opening-wipe", { autoAlpha: 0 });
      ScrollTrigger.refresh();
    };

    if (reduceMotion) {
      document.documentElement.classList.add("motion-reduced");
      revealHeroFallback();
      return () => document.documentElement.classList.remove("motion-reduced");
    }

    const fallbackId = window.setTimeout(() => {
      if (!window.__portfolioHeroOpened) revealHeroFallback();
    }, 3600);

    const ctx = gsap.context(() => {
      const slowEase = "power4.out";
      const revealEase = "expo.out";
      const openingEase = "power4.inOut";

      safeSet(".nav", { y: -72, autoAlpha: 0 });
      safeSet(".hero-frame", { scale: 0.985, clipPath: "inset(4% 4% 4% 4% round 36px)" });
      safeSet(".hero-video", { scale: 1.22, autoAlpha: 0.48 });
      safeSet(".hero-scrim", { autoAlpha: 0.9 });
      safeSet(".opening-wipe", { autoAlpha: 1, clipPath: "inset(0% 0% 0% 0%)", scaleY: 1 });
      safeSet(".hero-kicker", { y: 42, autoAlpha: 0, clipPath: "inset(0 0 100% 0)" });
      safeSet(".hero-title-main, .hero-title-sub", {
        yPercent: 126,
        scaleY: 0.46,
        autoAlpha: 0,
        clipPath: "inset(0 0 100% 0)",
        transformOrigin: "50% 100%",
      });
      safeSet(".hero p, .hero-actions", { y: 54, autoAlpha: 0 });
      safeSet(".hero-contact-corner", { y: 42, autoAlpha: 0, scale: 0.96 });

      gsap
        .timeline({
          defaults: { ease: slowEase },
          onComplete: () => {
            window.__portfolioHeroOpened = true;
            ScrollTrigger.refresh();
          },
        })
        .to(".opening-wipe", { clipPath: "inset(0% 0% 100% 0%)", duration: 1.28, ease: openingEase }, 0.05)
        .set(".opening-wipe", { autoAlpha: 0 }, 1.36)
        .to(".hero-frame", { scale: 1, clipPath: "inset(0% 0% 0% 0% round 52px)", duration: 1.65, ease: openingEase }, 0)
        .to(".hero-video", { scale: 1.02, autoAlpha: 1, duration: 2.25, ease: slowEase }, 0)
        .to(".nav", { y: 0, autoAlpha: 1, duration: 1.18 }, 0.42)
        .to(
          ".hero-kicker",
          { y: 0, autoAlpha: 1, clipPath: "inset(0 0 0% 0)", duration: 1.08 },
          0.7,
        )
        .to(
          ".hero-title-main",
          {
            yPercent: 0,
            scaleY: 1,
            autoAlpha: 1,
            clipPath: "inset(0 0 0% 0)",
            duration: 1.55,
            ease: revealEase,
          },
          0.88,
        )
        .to(
          ".hero-title-sub",
          {
            yPercent: 0,
            scaleY: 1,
            autoAlpha: 1,
            clipPath: "inset(0 0 0% 0)",
            duration: 1.68,
            ease: revealEase,
          },
          1.04,
        )
        .to(".hero p", { y: 0, autoAlpha: 1, duration: 1.15 }, 1.62)
        .to(".hero-actions", { y: 0, autoAlpha: 1, duration: 1.08 }, 1.78)
        .to(".hero-contact-corner", { y: 0, scale: 1, autoAlpha: 1, duration: 1.0 }, 1.92);

      gsap.utils.toArray(".section").forEach((section) => {
        const eyebrow = section.querySelector(".section-heading > span");
        const titleTargets = section.querySelectorAll(".section-heading .heading-line");
        const title = titleTargets.length ? titleTargets : section.querySelectorAll(".section-heading h2");
        const cards = section.querySelectorAll(
          ".profile-grid > .profile-glow, .profile-visual-panel, .stats-panel, .project-gallery-panel, .project-stage-card, .project-stack-card, .strength-grid > .strength-glow",
        );
        const images = section.querySelectorAll(
          ".section-motion-image",
        );

        safeSet(eyebrow, {
          x: -84,
          y: 132,
          scaleX: 1.34,
          scaleY: 0.72,
          autoAlpha: 0,
          clipPath: "inset(0 0 100% 0)",
          transformOrigin: "0% 100%",
        });
        safeSet(title, {
          yPercent: 112,
          scaleY: 0.56,
          autoAlpha: 0,
          clipPath: "inset(0 0 100% 0)",
          transformOrigin: "50% 100%",
        });
        safeSet(cards, {
          y: 118,
          scale: 0.965,
          rotationX: 9,
          autoAlpha: 0,
          clipPath: "inset(18% 0 0 0)",
          transformOrigin: "50% 100%",
        });
        safeSet(images, {
          yPercent: 8,
          scale: 1.055,
          clipPath: "inset(0 0 100% 0)",
          transformOrigin: "50% 50%",
        });

        const sectionTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top 76%",
            once: true,
          },
          defaults: { ease: slowEase },
        });

        if (hasTargets(eyebrow)) {
          sectionTimeline.to(eyebrow, {
            x: 0,
            y: 0,
            scaleX: 1,
            scaleY: 1,
            autoAlpha: 1,
            clipPath: "inset(0 0 0% 0)",
            duration: 1.28,
            ease: revealEase,
          });
        }

        if (hasTargets(title)) {
          sectionTimeline.to(
            title,
            {
              yPercent: 0,
              scaleY: 1,
              autoAlpha: 1,
              clipPath: "inset(0 0 0% 0)",
              duration: 1.48,
              stagger: 0.1,
              ease: revealEase,
            },
            "-=0.32",
          );
        }

        if (hasTargets(cards)) {
          sectionTimeline.to(
            cards,
            {
              y: 0,
              scale: 1,
              rotationX: 0,
              autoAlpha: 1,
              clipPath: "inset(0% 0 0 0)",
              duration: 1.26,
              stagger: { each: 0.12, from: "start" },
            },
            "-=1.08",
          );
        }

        if (hasTargets(images)) {
          sectionTimeline.to(
            images,
            {
              yPercent: 0,
              scale: 1,
              clipPath: "inset(0 0 0% 0)",
              duration: 1.55,
              stagger: 0.08,
              ease: revealEase,
            },
            "-=1.24",
          );
        }
      });

      gsap.utils.toArray(".project-card > img").forEach((image) => {
        gsap.to(image, {
          yPercent: 5,
          ease: "none",
          scrollTrigger: {
            trigger: image.closest(".project-glow") || image,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.15,
          },
        });
      });

      gsap.fromTo(
        ".project-stage-image",
        { yPercent: -4, scale: 1.04 },
        {
          yPercent: 4,
          scale: 1.08,
          ease: "none",
          scrollTrigger: {
            trigger: ".project-stage",
            start: "top bottom",
            end: "bottom top",
            scrub: 1.1,
          },
        },
      );

      safeSet(".contact-scene-video", { scale: 1.18, autoAlpha: 0.72, clipPath: "inset(8% 6% 8% 6% round 34px)" });
      safeSet(".contact-cinematic-scrim", { autoAlpha: 0.96 });
      safeSet(".contact-badge", {
        y: 62,
        scaleY: 0.7,
        autoAlpha: 0,
        clipPath: "inset(0 0 100% 0)",
        transformOrigin: "50% 100%",
      });
      safeSet(".contact-inner h2", {
        yPercent: 92,
        scaleY: 0.48,
        autoAlpha: 0,
        clipPath: "inset(0 0 100% 0)",
        transformOrigin: "50% 100%",
      });
      safeSet(".contact-actions", { y: 54, autoAlpha: 0, clipPath: "inset(0 0 100% 0)" });

      gsap
        .timeline({
          scrollTrigger: {
            trigger: ".contact-finale",
            start: "top 78%",
            once: true,
          },
          defaults: { ease: slowEase },
        })
        .to(".contact-scene-video", {
          scale: 1.02,
          autoAlpha: 1,
          clipPath: "inset(0% 0% 0% 0% round 0px)",
          duration: 1.9,
          ease: openingEase,
        }, 0)
        .to(".contact-cinematic-scrim", { autoAlpha: 1, duration: 1.2 }, 0.12)
        .to(".contact-badge", {
          y: 0,
          scaleY: 1,
          autoAlpha: 1,
          clipPath: "inset(0 0 0% 0)",
          duration: 0.96,
        }, 0.48)
        .to(".contact-inner h2", {
          yPercent: 0,
          scaleY: 1,
          autoAlpha: 1,
          clipPath: "inset(0 0 0% 0)",
          duration: 1.45,
          ease: revealEase,
        }, 0.64)
        .to(".contact-actions", {
          y: 0,
          autoAlpha: 1,
          clipPath: "inset(0 0 0% 0)",
          duration: 1.05,
        }, 1.06);

      gsap.to(".contact-scene-video", {
        yPercent: 5,
        scale: 1.08,
        ease: "none",
        scrollTrigger: {
          trigger: ".contact-finale",
          start: "top bottom",
          end: "bottom top",
          scrub: 1.15,
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
