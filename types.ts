export type Language = 'de' | 'en';
export type Page = 'home' | 'about' | 'services' | 'gallery' | 'contact' | 'login' | 'admin';

export interface NavContent {
  home: string;
  about: string;
  services: string;
  gallery: string;
  contact: string;
  admin: string;
  login: string;
  logout: string;
}

export interface HeaderContent {
  nav: NavContent;
  cta: string;
}

export interface HeroContent {
  headline: string;
  subheadline: string;
  cta: string;
}

export interface BenefitItem {
  icon: string;
  title: string;
  description: string;
}

export interface BenefitsContent {
  title: string;
  items: BenefitItem[];
}

export interface ServiceItemSummary {
  title: string;
  description: string;
}

export interface HomeServicesContent {
  title: string;
  description: string;
  cta: string;
  items: ServiceItemSummary[];
}

export interface Review {
  quote: string;
  author: string;
  rating: number;
}

export interface ReviewsContent {
  title: string;
  addReviewTitle: string;
  form: {
    name: string;
    review: string;
    rating: string;
    submit: string;
    success: string;
  };
  items: Review[];
}

export interface HomeGalleryContent {
  title: string;
  cta: string;
}

export interface HomeContactContent {
  title: string;
  description: string;
  cta: string;
}

export interface HomeContent {
  hero: HeroContent;
  benefits: BenefitsContent;
  services: HomeServicesContent;
  reviews: ReviewsContent;
  gallery: HomeGalleryContent;
  contact: HomeContactContent;
}

export interface AboutSection {
  title: string;
  paragraphs: string[];
}

export interface TeamMember {
  key: string;
  name: string;
  role: string;
  src: string;
}

export interface AboutContent {
  title: string;
  sections: AboutSection[];
  teamTitle: string;
  teamMembers: TeamMember[];
}

export interface Service {
  key: string;
  title: string;
  description: string;
  features: string[];
}

export interface ServicesContent {
  title: string;
  intro: string;
  services: Service[];
}

export interface GalleryImage {
  src: string;
  alt: string;
}

export interface GalleryContent {
  title: string;
  description: string;
  images: GalleryImage[];
}

export interface ContactFormContent {
  name: string;
  email: string;
  phone: string;
  message: string;
  submit: string;
  success: string;
}

export interface ContactDetailsContent {
  title: string;
  address: string;
  phone: string;
  email: string;
}

export interface ContactCtaContent {
  whatsapp: string;
  call: string;
}

export interface ContactContent {
  title: string;
  description: string;
  form: ContactFormContent;
  details: ContactDetailsContent;
  cta: ContactCtaContent;
}

export interface FooterCompanyContent {
  name: string;
  description: string;
}

export interface FooterLinkItem {
  name: string;
  page: Page;
}

export interface FooterLinksContent {
  title: string;
  items: FooterLinkItem[];
}

export interface FooterContactContent {
  title: string;
  address: string;
  phone: string;
  email: string;
}

export interface FooterContent {
  company: FooterCompanyContent;
  links: FooterLinksContent;
  contact: FooterContactContent;
  copyright: string;
}

export interface LoginContent {
    title: string;
    form: {
        username: string;
        password: string;
        submit: string;
        error: string;
    };
    loggedInMessage: string;
}

export interface AdminContent {
    title: string;
    heroManagement: {
        title: string;
        currentImageTitle: string;
        resetButton: string;
        changeImage: string;
    };
    serviceImageManagement: {
        title: string;
        changeImage: string;
        resetButton: string;
    };
    teamManagement: {
        title: string;
        currentTeam: string;
        addMemberTitle: string;
        form: {
            name: string;
            role: string;
            imageFile: string;
            submit: string;
        };
        deleteButton: string;
        changeImage: string;
    };
    galleryManagement: {
        title: string;
        uploadTitle: string;
        form: {
            imageFile: string;
            altText: string;
            submit: string;
        };
        currentImagesTitle: string;
        deleteButton: string;
        noImages: string;
    };
}

export interface LanguageContent {
  header: HeaderContent;
  home: HomeContent;
  about: AboutContent;
  services: ServicesContent;
  gallery: GalleryContent;
  contact: ContactContent;
  footer: FooterContent;
  login: LoginContent;
  admin: AdminContent;
}