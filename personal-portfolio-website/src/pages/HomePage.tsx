import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { StructuredData } from "@/components/shared/StructuredData";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import SkillsSection from "@/components/sections/SkillsSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import CertificationsSection from "@/components/sections/CertificationsSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import ServicesSection from "@/components/sections/ServicesSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import BlogSection from "@/components/sections/BlogSection";
import ContactSection from "@/components/sections/ContactSection";
import NewsletterSection from "@/components/sections/NewsletterSection";
import profileData from "@/content/profile.json";
import type { Profile } from "@/types/index";

const profile = profileData as Profile;

export default function HomePage() {
  return (
    <>
      <Helmet>
        <title>
          {profile.name} | {profile.title}
        </title>
        <meta name="description" content={profile.tagline} />
        {/* Open Graph */}
        <meta property="og:title" content={`${profile.name} | ${profile.title}`} />
        <meta property="og:description" content={profile.tagline} />
        <meta property="og:image" content={profile.photo} />
        <meta property="og:type" content="website" />
      </Helmet>
      <StructuredData />
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ExperienceSection />
        <CertificationsSection />
        <ProjectsSection />
        <ServicesSection />
        <TestimonialsSection />
        <BlogSection />
        <ContactSection />
        <NewsletterSection />
      </main>
      <Footer />
    </>
  );
}
