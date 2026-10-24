import React from 'react';
import StatusBadge from './StatusBadge';

const STEPS = [
  {
    num: '01',
    title: 'Real Product',
    copy: 'We start with what exists — a simple, honest product shot.',
    image: '/images/stage-c/studio-concept-product.jpg',
  },
  {
    num: '02',
    title: 'Creative World',
    copy: 'Human creative direction plus generative tools build a world around it.',
    image: '/images/stage-c/studio-concept-world.jpg',
  },
  {
    num: '03',
    title: 'Finished Campaign',
    copy: 'Cast, culture and craft turn the world into a campaign people feel.',
    image: '/images/stage-c/studio-concept-campaign.jpg',
    campaign: true,
  },
];

/**
 * REAL PRODUCT → CREATIVE WORLD → FINISHED CAMPAIGN.
 * Every frame is clearly labelled as a concept — this is not client work.
 */
export default function StudioTransformation() {
  return (
    <>
      <div className="transform-strip">
        {STEPS.map((step, i) => (
          <React.Fragment key={step.num}>
            <figure className="transform-step">
              <div className="transform-media">
                <img src={step.image} alt={`Concept demo — ${step.title}`} loading="lazy" />
                {step.campaign && (
                  <div className="campaign-overlay" aria-hidden="true">
                    <strong>Taste the golden hour.</strong>
                    <span>Concept campaign</span>
                  </div>
                )}
                <StatusBadge status="CONCEPT" />
              </div>
              <figcaption className="transform-body">
                <span className="transform-step-num">STEP {step.num}</span>
                <h3 className="transform-step-title">{step.title}</h3>
                <p className="transform-step-copy">{step.copy}</p>
              </figcaption>
            </figure>
            {i < STEPS.length - 1 && (
              <span className="transform-arrow" aria-hidden="true">→</span>
            )}
          </React.Fragment>
        ))}
      </div>
      <p className="concept-disclaimer">
        <span aria-hidden="true">ⓘ</span>
        Concept demonstration created by Welele Studio to illustrate our process. Not client work; the product is fictional.
      </p>
    </>
  );
}
