import React from 'react';
import StatusBadge from './StatusBadge';

interface DeviceMockupProps {
  screenshots?: string[];
  heroImage?: string;
  thumbs?: string[];
}

/**
 * CSS phone frame. If the CMS provides real screenshots, the first one is shown.
 * Otherwise an editorial concept screen is rendered and labelled "Concept preview"
 * so it is never mistaken for the shipping Welele App UI.
 */
export default function DeviceMockup({ screenshots = [], heroImage, thumbs = [] }: DeviceMockupProps) {
  const hasScreenshot = screenshots.length > 0;

  return (
    <div className="device-stage" aria-label="Welele platform preview">
      {hasScreenshot && screenshots[1] && (
        <div className="device back" aria-hidden="true">
          <div className="device-screen">
            <img src={screenshots[1]} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        </div>
      )}

      <div className="device">
        <div className="device-screen">
          <span className="device-notch" aria-hidden="true" />
          {hasScreenshot ? (
            <img
              src={screenshots[0]}
              alt="Welele platform concept preview"
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center' }}
            />
          ) : (
            <>
              <div className="screen-hero" style={{ backgroundImage: `url(${heroImage ?? '/images/welele-hero-clean.jpg'})` }}>
                <span className="screen-brand">welele</span>
                <span className="screen-tag">New on Welele</span>
                <span className="screen-title">Stories that<br />move you.</span>
                <span className="screen-btn">▶ Discover</span>
              </div>
              <div className="screen-rail">
                <div className="screen-rail-title">Trending stories</div>
                <div className="screen-thumbs">
                  {(thumbs.length ? thumbs : ['/images/stage-c/eco-watch.jpg', '/images/stage-c/eco-create.jpg', '/images/stage-c/eco-connect.jpg'])
                    .slice(0, 3)
                    .map((t) => (
                      <span key={t} style={{ backgroundImage: `url(${t})` }} />
                    ))}
                </div>
              </div>
              <div className="screen-nav" aria-hidden="true">
                <span className="on">⌂</span>
                <span>◎</span>
                <span>✦</span>
                <span>◯</span>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="device-caption">
        <StatusBadge status="CONCEPT" label="Concept preview" />
      </div>
    </div>
  );
}
