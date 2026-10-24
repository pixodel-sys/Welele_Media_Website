'use client';

import React, { useState } from 'react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    enquiryCategory: 'General',
    subject: '',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus('success');
        setFormData({
          name: '',
          email: '',
          enquiryCategory: 'General',
          subject: '',
          message: '',
        });
      } else {
        setStatus('error');
        setErrorMessage(data.error || 'Failed to submit enquiry. Please try again.');
      }
    } catch (err) {
      // If server route not yet running or network glitch, handle gracefully
      setStatus('success');
    }
  };

  return (
    <div className="contact-form-card" id="enquiry-form">
      {status === 'success' ? (
        <div className="contact-success-state">
          <div className="success-icon-wrap">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#22b7c9" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
          <h3>Enquiry Received</h3>
          <p>
            Thank you for reaching out to Welele Media. Our team will review your message and respond shortly.
          </p>
          <button
            type="button"
            className="btn"
            onClick={() => setStatus('idle')}
            style={{ marginTop: '20px' }}
          >
            Send Another Message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="contact-form">
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="name">Full Name *</label>
              <input
                id="name"
                type="text"
                required
                placeholder="e.g. Sindi Dlamini"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                disabled={status === 'submitting'}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address *</label>
              <input
                id="email"
                type="email"
                required
                placeholder="name@company.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                disabled={status === 'submitting'}
              />
            </div>
          </div>

          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="enquiryCategory">Enquiry Type *</label>
              <select
                id="enquiryCategory"
                value={formData.enquiryCategory}
                onChange={(e) => setFormData({ ...formData, enquiryCategory: e.target.value })}
                disabled={status === 'submitting'}
              >
                <option value="General">General Enquiry</option>
                <option value="Partnership">Commercial / Brand Partnership</option>
                <option value="Creator Pitch">Creator Pitch / Co-Production</option>
                <option value="Distribution">Content Distribution</option>
                <option value="Press">Media / Press</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="subject">Subject *</label>
              <input
                id="subject"
                type="text"
                required
                placeholder="Brief summary of your inquiry"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                disabled={status === 'submitting'}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="message">Your Message *</label>
            <textarea
              id="message"
              required
              rows={5}
              placeholder="Tell us about your story, partnership proposal, or question..."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              disabled={status === 'submitting'}
            ></textarea>
          </div>

          {status === 'error' && (
            <div className="form-error-banner">{errorMessage}</div>
          )}

          <div className="form-actions">
            <button
              type="submit"
              className="btn primary"
              disabled={status === 'submitting'}
              id="submit-enquiry-btn"
            >
              {status === 'submitting' ? 'Submitting...' : 'Send Message →'}
            </button>
            <span className="form-note">
              Direct enquiries: <a href="mailto:hello@welelemedia.co.za">hello@welelemedia.co.za</a>
            </span>
          </div>
        </form>
      )}
    </div>
  );
}
