import type { ReactNode } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx('hero', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
      </div>
    </header>
  );
}

const FeatureList = [
  {
    title: 'Backend Engineering',
    description: 'Complete transcripts and deep-dive notes for backend systems.',
    icon: '🏗️',
    link: '/docs/Backend Engineering/Modern Version 2/01_Roadmap',
  },
  {
    title: 'DevOps',
    description: 'CI/CD, containerization, orchestration, and infrastructure as code.',
    icon: '🚀',
    link: '/docs/DevOps/Version 1/intro',
  },
  {
    title: 'System Design',
    description: 'Architecting scalable, highly available, and resilient large-scale systems.',
    icon: '📐',
    link: '/docs/System Design/Version 1/intro',
  },
  {
    title: 'Operating System',
    description: 'Understanding memory management, processes, threads, and concurrency.',
    icon: '💻',
    link: '/docs/Operating System/Version 1/intro',
  },
  {
    title: 'DBMS',
    description: 'Relational, NoSQL, indexing, transaction isolation, and query optimization.',
    icon: '🗄️',
    link: '/docs/DBMS/Version 1/intro',
  },
  {
    title: 'Computer Network',
    description: 'Mastering TCP/IP, DNS, HTTP, WebSockets, and network security.',
    icon: '🌐',
    link: '/docs/Computer Network/Version 1/intro',
  },
];

function Feature({ title, description, icon, link }: { title: string; description: string; icon: string; link?: string }) {
  const CardContent = (
    <div className={styles.featureCard}>
      <div className={styles.featureIcon}>{icon}</div>
      <Heading as="h3">{title}</Heading>
      <p>{description}</p>
    </div>
  );

  return (
    <div className={clsx('col col--4')} style={{ marginBottom: '2rem' }}>
      {link ? (
        <Link to={link} style={{ textDecoration: 'none', color: 'inherit', display: 'block', height: '100%' }}>
          {CardContent}
        </Link>
      ) : (
        CardContent
      )}
    </div>
  );
}

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="Deep engineering notes for the backend developer path from first principles.">
      <HomepageHeader />
      <main>
        <section className={styles.features}>
          <div className="container">
            <div className="row">
              {FeatureList.map((props, idx) => (
                <Feature key={idx} {...props} />
              ))}
            </div>
          </div>
        </section>

        <section className="padding-vert--xl text--center">
          <div className="container">
            <Heading as="h2">Architecture, not just code.</Heading>
            <p className="hero__subtitle">
              Learn how to build systems that scale, endure, and operate predictably under load.
            </p>
          </div>
        </section>
      </main>
    </Layout>
  );
}
