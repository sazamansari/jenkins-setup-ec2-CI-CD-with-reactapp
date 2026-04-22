import React from 'react';

const cards = [
  { icon: '🌐', title: 'Full Stack Dev', desc: 'React, Node.js, Express, MongoDB' },
  { icon: '☁️', title: 'AWS Deployment', desc: 'EC2, S3, Lambda, API Gateway' },
  { icon: '🐳', title: 'Docker / K8s', desc: 'Containerized deployments at scale' },
  { icon: '🔁', title: 'CI/CD Pipelines', desc: 'Jenkins, GitHub Actions automation' },
];

const highlights = [
  {
    title: '🚀 Scalable Cloud Architectures',
    desc: 'Designed, deployed, and automated scalable solutions on AWS. Migrated infrastructure to AWS Graviton, cutting costs by 40%.',
  },
  {
    title: '🎓 Educator & Mentor',
    desc: 'Mentored 1000+ students across Full Stack, MERN, and AWS Cloud through workshops at colleges and online academies.',
  },
  {
    title: '🛠️ 20+ Delivered Projects',
    desc: 'Delivered 15+ cloud-hosted projects, optimizing infrastructure cost, performance, and reliability through automation and IaC.',
  },
];

export default function About() {
  return (
    <section className="section about" id="about">
      <div className="container">
        <div className="badge">⚡ About Me</div>
        <h2 className="section-title">Who Am I?</h2>
        <p className="section-subtitle">
          A passionate engineer who loves building things that scale. and I'm always eager to learn new technologies and take on challenging projects that push my limits.
        </p>

        <div className="about-grid">
          {/* LEFT */}
          <div className="about-text">
            <p>
              I'm <strong style={{ color: 'var(--text-primary)' }}>Md Shadab Azam Ansari</strong> — a
              Software Engineer, Cloud Engineer, and DevOps practitioner based in India.
              I specialize in designing, deploying, and automating scalable cloud-native
              architectures on AWS.
            </p>
            <p>
              With expertise in CI/CD pipelines using Jenkins and GitHub Actions, container
              orchestration with Docker &amp; Kubernetes, and Infrastructure as Code via Terraform,
              I bring modern DevOps practices to every project I touch.
            </p>
            <p>
              On the full-stack side, I'm proficient in <strong style={{ color: 'var(--accent-secondary)' }}>
              React.js, Node.js, Express, and MongoDB</strong>, crafting APIs and UIs that are both
              performant and maintainable. I enjoy troubleshooting complex production issues and
              streamlining delivery pipelines.
            </p>

            <div className="about-cards">
              {cards.map((card, i) => (
                <div className="about-card" key={i}>
                  <div className="about-card-icon">{card.icon}</div>
                  <div className="about-card-title">{card.title}</div>
                  <div className="about-card-desc">{card.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT */}
          <div className="highlights">
            {highlights.map((h, i) => (
              <div className="highlight-item" key={i}>
                <div className="highlight-title">{h.title}</div>
                <div className="highlight-desc">{h.desc}</div>
              </div>
            ))}

            {/* Quick info */}
            <div style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-glass)',
              borderRadius: 'var(--radius-md)',
              padding: '24px',
            }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                {[
                  { label: 'Location', value: '🇮🇳 India' },
                  { label: 'Email', value: 'md.shadab@gmail.com' },
                  { label: 'Availability', value: '✅ Open to work' },
                  { label: 'Experience', value: '5+ Years' },
                ].map(info => (
                  <div key={info.label}>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>
                      {info.label}
                    </div>
                    <div style={{ fontSize: '0.88rem', color: 'var(--text-primary)', fontWeight: 600 }}>
                      {info.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
