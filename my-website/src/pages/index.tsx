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
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/transcripts/01_Roadmap_for_backend_from_first_principles">
            View the Roadmap 🚀
          </Link>
        </div>
      </div>
    </header>
  );
}

const FeatureList = [
  {
    title: 'Backend Engineering',
    description: 'Complete transcripts and deep-dive notes from the Backend from First Principles series.',
    icon: '🏗️',
    link: '/docs/transcripts/01_Roadmap_for_backend_from_first_principles',
  },
  {
    title: 'Core Systems',
    description: 'Understanding how operating systems, processes, and memory management work at the lowest level.',
    icon: '💻',
  },
  {
    title: 'Databases & Storage',
    description: 'Deep dives into PostgreSQL, indexing, transaction isolation, and distributed data systems.',
    icon: '🗄️',
  },
  {
    title: 'Networking & APIs',
    description: 'Mastering TCP/IP, DNS, HTTP, WebSockets, and building robust communication layers.',
    icon: '🌐',
  },
];

function Feature({ title, description, icon, link }: { title: string; description: string; icon: string; link?: string }) {
  return (
    <div className={clsx('col col--4')}>
      <div className={styles.featureCard}>
        <div className={styles.featureIcon}>{icon}</div>
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
        {link && (
          <Link className="button button--primary button--sm" to={link}>
            Explore Transcripts →
          </Link>
        )}
      </div>
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
