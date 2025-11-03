// Fix: Moved Language and Page types here from constants/content.ts
// to resolve circular dependency and fix 'Cannot find name 'Page'' error.
export type Language = 'de' | 'en';
export type Page = 'home' | 'about' | 'services' | 'gallery' | 'contact' | 'login' | 'admin';

export interface GalleryImage {
  src: string;
  alt: string;
}

export interface HeaderContent {
  nav: {
    home: string;
    about: string;
    services: string;
    gallery: string;
    contact: string;
    admin: string;
    login: string;
    logout: string;
  };
  cta: string;
}

export interface HomeContent {
  hero: {
    headline: string;
    subheadline: string;
    cta: string;
  };
  benefits: {
    title: string;
    items: {
      icon: string;
      title: string;
      description: string;
    }[];
  };
  services: {
    title: string;
    description: string;
    cta: string;
    items: {
      title: string;
      description: string;
    }[];
  };
  reviews: {
    title: string;
    items: {
      quote: string;
      author: string;
    }[];
  };
  gallery: {
    title: string;
    cta: string;
  };
  contact: {
    title: string;
    description: string;
    cta: string;
  };
}

export interface AboutContent {
  title: string;
  sections: {
    title: string;
    paragraphs: string[];
  }[];
  teamTitle: string;
  teamMembers: {
    name: string;
    role: string;
  }[];
}

export interface ServicesContent {
  title: string;
  intro: string;
  services: {
    title: string;
    description: string;
    features: string[];
  }[];
}

export interface GalleryContent {
  title: string;
  description: string;
  images: GalleryImage[];
}

export interface ContactContent {
    title: string;
    description: string;
    form: {
        name: string;
        email: string;
        phone: string;
        message: string;
        submit: string;
        success: string;
    };
    details: {
        title: string;
        address: string;
        phone: string;
        email: string;
    };
    cta: {
        whatsapp: string;
        call: string;
    }
}

export interface FooterContent {
  company: {
    name: string;
    description: string;
  };
  links: {
    title: string;
    items: {
      name: string;
      page: Page;
    }[];
  };
  contact: {
    title: string;
    address: string;
    phone: string;
    email: string;
  };
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
    uploadTitle: string;
    currentImageTitle: string;
    form: {
      imageFile: string;
      submit: string;
    };
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