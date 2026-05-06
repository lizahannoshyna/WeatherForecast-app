import React from 'react';
import Container from '../components/Container';
import s from './Contacts.module.css';
import { HiOutlineMail, HiOutlineClock, HiOutlineUserGroup } from 'react-icons/hi';
import { LuExternalLink, LuArrowRight } from 'react-icons/lu';
import mapPlaceholder from '../assets/img/map.jpg';

const Contacts = () => {
  return (
    <div className={s.contactsSection}>
      <Container>
        <section className={s.header}>
          <h1>Atmospheric <span>Inquiry</span></h1>
          <p>
            Connect with our team of meteorologists and technical experts. Whether you're
            seeking API integration or weather insights, we're here to illuminate the details.
          </p>
        </section>
        <div className={s.mainGrid}>

          <div className={s.formCard}>
            <h2>Get in Touch</h2>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className={s.inputGroup}>
                <div className={s.field}>
                  <label>Name</label>
                  <input type="text" placeholder="Alex Rivers" />
                </div>
                <div className={s.field}>
                  <label>Email</label>
                  <input type="email" placeholder="alex@lumina.io" />
                </div>
              </div>
              <div className={s.field}>
                <label>Message</label>
                <textarea placeholder="How can we help you navigate the atmosphere?"></textarea>
              </div>
              <button className={s.sendBtn}>Send Message</button>
            </form>
          </div>


          <div className={s.infoColumn}>
            <div className={s.infoCard}>
              <HiOutlineUserGroup size={32} color="#ff9f43" />
              <h3>Technical Support</h3>
              <p>Real-time troubleshooting for API and enterprise dashboard users.</p>
              <a href="mailto:support@luminawether.com" className={s.contactLink}>
                <HiOutlineMail color="#ff9f43" /> support@luminawether.com
              </a>
              <div className={s.contactLink}>
                <HiOutlineClock color="#ff9f43" /> 24/7 Global Response
              </div>
            </div>

            <div className={s.mapCard}>
              <img src={mapPlaceholder} alt="Headquarters" className={s.mapImg} />
              <div className={s.mapContent}>
                <h3>Nexus SF</h3>
                <p>HEADQUARTERS</p>
                <p>450 Atmospheric Way<br />San Francisco, CA 94105<br />United States</p>
              </div>
            </div>
          </div>
        </div>


        <div className={s.footerGrid}>
          <div className={s.footerItem}>
            <h4>Partnerships</h4>
            <p>Looking to integrate Lumina's atmospheric data into your platform?</p>
            <a href="#" className={s.footerLink}>Media Kit <LuExternalLink /></a>
          </div>
          <div className={s.footerItem}>
            <h4>Press Inquiry</h4>
            <p>Direct contact for journalists, weather enthusiasts, and academic researchers.</p>
            <a href="mailto:press@lumina.io" className={s.footerLink}>press@lumina.io <HiOutlineMail /></a>
          </div>
          <div className={s.footerItem}>
            <h4>Careers</h4>
            <p>We are always searching for meteorologists and software architects.</p>
            <a href="#" className={s.footerLink}>View Openings <LuArrowRight /></a>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Contacts;