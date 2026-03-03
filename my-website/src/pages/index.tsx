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
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/01_Roadmap_for_backend_from_first_principles">
            Start Reading 📚
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="Transcripts and notes for the Backend from First Principles course">
      <HomepageHeader />
      <main>
        <div className="container margin-vert--xl">
          <div className="row text--center">
            <div className="col">
              <h2>Welcome to the Notes!</h2>
              <p>Dive into detailed transcripts and resources documenting the journey of becoming a backend engineer.</p>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}
