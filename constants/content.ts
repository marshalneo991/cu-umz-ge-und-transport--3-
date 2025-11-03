// Fix: Removed local Page and Language types and imported from types.ts to break circular dependency.
import { LanguageContent, Language } from '../types';

type AllContent = {
  [key in Language]: LanguageContent;
};

export const content: AllContent = {
  de: {
    header: {
      nav: {
        home: 'Startseite',
        about: 'Über uns',
        services: 'Leistungen',
        gallery: 'Galerie',
        contact: 'Kontakt',
        admin: 'Admin',
        login: 'Anmelden',
        logout: 'Abmelden',
      },
      cta: 'Angebot anfordern',
    },
    home: {
      hero: {
        headline: 'Ihr zuverlässiger Partner für Umzüge und Transporte',
        subheadline: 'Stressfrei umziehen mit CU Umzüge und Transport. Professionell, schnell und sicher.',
        cta: 'Kostenloses Angebot',
      },
      benefits: {
        title: 'Warum Sie uns wählen sollten',
        items: [
          { icon: 'fast', title: 'Schnell', description: 'Effiziente Planung und Durchführung für einen zügigen Umzug.' },
          { icon: 'reliable', title: 'Zuverlässig', description: 'Pünktlichkeit und Sorgfalt sind unser oberstes Gebot.' },
          { icon: 'professional', title: 'Professionell', description: 'Erfahrene Mitarbeiter und moderne Ausrüstung.' },
          { icon: 'insured', title: 'Versichert', description: 'Ihr Hab und Gut ist bei uns in besten Händen und voll versichert.' },
        ],
      },
      services: {
        title: 'Unsere Leistungen',
        description: 'Wir bieten ein breites Spektrum an Dienstleistungen, um Ihren Umzug so einfach wie möglich zu gestalten.',
        cta: 'Alle Leistungen ansehen',
        items: [
          { title: 'Privatumzüge', description: 'Komplettservice für Ihren privaten Wohnungswechsel.' },
          { title: 'Firmenumzüge', description: 'Minimale Ausfallzeiten bei Ihrem Büroumzug.' },
          { title: 'Möbeltransport', description: 'Sicherer Transport einzelner Möbelstücke oder ganzer Einrichtungen.' },
        ],
      },
      reviews: {
        title: 'Was unsere Kunden sagen',
        items: [
          { quote: 'Der Umzug war super organisiert und ging blitzschnell. Das Team war sehr freundlich und professionell. Absolut empfehlenswert!', author: 'Anna S.' },
          { quote: 'Vom ersten Kontakt bis zum letzten Karton alles top. Faire Preise und ein super Service. Jederzeit wieder!', author: 'Markus T.' },
          { quote: 'CU Umzüge hat unseren Büroumzug am Wochenende gemeistert. Alles lief nach Plan. Vielen Dank!', author: 'Global Tech GmbH' },
        ],
      },
      gallery: {
        title: 'Einblicke in unsere Arbeit',
        cta: 'Zur Galerie',
      },
      contact: {
        title: 'Planen Sie Ihren Umzug?',
        description: 'Kontaktieren Sie uns noch heute für ein unverbindliches und kostenloses Angebot. Wir beraten Sie gerne!',
        cta: 'Jetzt kontaktieren',
      },
    },
    about: {
      title: 'Über CU Umzüge und Transport',
      sections: [
        {
          title: 'Unsere Geschichte',
          paragraphs: [
            'CU Umzüge und Transport wurde mit der Vision gegründet, den Umzugsprozess für unsere Kunden so einfach und stressfrei wie möglich zu gestalten. Seit unserer Gründung haben wir hunderten von Familien und Unternehmen geholfen, sicher in ihr neues Zuhause oder ihre neuen Geschäftsräume zu ziehen.',
            'Unser Erfolg basiert auf den Grundwerten Zuverlässigkeit, Professionalität und Kundenzufriedenheit. Wir verstehen, dass jeder Umzug einzigartig ist und erfordert eine individuelle Planung und Sorgfalt.',
          ],
        },
        {
          title: 'Unsere Mission',
          paragraphs: [
            'Unsere Mission ist es, erstklassige Umzugs- und Transportdienstleistungen anzubieten, die die Erwartungen unserer Kunden übertreffen. Wir setzen auf geschultes Personal, moderne Fahrzeuge und hochwertige Verpackungsmaterialien, um die Sicherheit Ihres Eigentums zu gewährleisten.',
            'Wir streben danach, in jeder Phase des Umzugs ein vertrauenswürdiger Partner zu sein, von der ersten Beratung bis zum Auspacken des letzten Kartons.',
          ],
        },
      ],
      teamTitle: 'Unser Team',
      teamMembers: [
        { name: 'Ivan Curcic', role: 'Gründer & Geschäftsführer' },
        { name: 'Team von Fachleuten', role: 'Erfahrene Umzugshelfer' },
      ],
    },
    services: {
      title: 'Unsere Dienstleistungen',
      intro: 'Wir bieten eine umfassende Palette von Umzugsdienstleistungen, die auf Ihre individuellen Bedürfnisse zugeschnitten sind. Egal ob kleiner Privatumzug oder großer Firmenumzug, wir haben die richtige Lösung für Sie.',
      services: [
        { title: 'Privatumzüge', description: 'Wir kümmern uns um den kompletten Umzug Ihrer Wohnung oder Ihres Hauses. Von der Planung über das Verpacken bis zum Aufbau Ihrer Möbel am Zielort.', features: ['Kostenlose Besichtigung & Angebot', 'Ein- und Auspackservice', 'Möbelde- und -montage', 'Küchenmontage'] },
        { title: 'Firmenumzüge', description: 'Effiziente und professionelle Umzüge für Büros und Unternehmen jeder Größe. Wir minimieren die Ausfallzeiten, damit Ihr Geschäft reibungslos weiterlaufen kann.', features: ['Detaillierte Umzugsplanung', 'IT- und Akten-Transport', 'Möbelentsorgung', 'Wochenend- und Nachtumzüge'] },
        { title: 'Möbeltransport & Beiladung', description: 'Sie haben nur wenige Möbelstücke zu transportieren? Kein Problem! Wir bieten kostengünstige Lösungen für Einzeltransporte und Beiladungen.', features: ['Sicherer Transport von Einzelstücken', 'Flexible Terminvereinbarung', 'Versicherter Transport', 'Deutschland- & europaweit'] },
        { title: 'Entrümpelung & Entsorgung', description: 'Wir schaffen Platz! Professionelle Entrümpelung von Kellern, Dachböden oder ganzen Wohnungen mit fachgerechter Entsorgung.', features: ['Besenreine Übergabe', 'Wertanrechnung möglich', 'Umweltgerechte Entsorgung', 'Diskret und zuverlässig'] },
      ],
    },
    gallery: {
      title: 'Unsere Galerie',
      description: 'Sehen Sie selbst, wie wir arbeiten. Hier finden Sie eine Auswahl an Bildern von unseren erfolgreich durchgeführten Umzügen und Transporten.',
      images: [
        { src: 'https://picsum.photos/600/400?image=100', alt: 'Ein Umzugswagen wird beladen' },
        { src: 'https://picsum.photos/600/400?image=101', alt: 'Team von Umzugshelfern trägt eine Couch' },
        { src: 'https://picsum.photos/600/400?image=102', alt: 'Sorgfältig verpackte Kartons' },
        { src: 'https://picsum.photos/600/400?image=103', alt: 'Möbel werden in einer Wohnung montiert' },
        { src: 'https://picsum.photos/600/400?image=104', alt: 'Ein sauberes und modernes Umzugsfahrzeug' },
        { src: 'https://picsum.photos/600/400?image=105', alt: 'Lächelnde Mitarbeiter in Firmenkleidung' },
        { src: 'https://picsum.photos/600/400?image=106', alt: 'Ein großes Büro wird umgezogen' },
        { src: 'https://picsum.photos/600/400?image=107', alt: 'Schwere Gegenstände werden professionell transportiert' },
        { src: 'https://picsum.photos/600/400?image=108', alt: 'Ein glücklicher Kunde schüttelt einem Mitarbeiter die Hand' },
      ],
    },
    contact: {
      title: 'Kontaktieren Sie uns',
      description: 'Haben Sie Fragen oder möchten Sie ein kostenloses Angebot? Füllen Sie das Formular aus oder rufen Sie uns an. Wir sind für Sie da!',
      form: {
        name: 'Ihr Name',
        email: 'Ihre E-Mail',
        phone: 'Ihre Telefonnummer (optional)',
        message: 'Ihre Nachricht',
        submit: 'Nachricht senden',
        success: 'Vielen Dank! Ihre Nachricht wurde gesendet. Wir melden uns in Kürze bei Ihnen.',
      },
      details: {
        title: 'Kontaktdetails',
        address: 'Birkenallee 13, 22147 Hamburg, Deutschland',
        phone: '+49 123 456 7890',
        email: 'info@cu-umzuege.de',
      },
      cta: {
        whatsapp: 'Via WhatsApp kontaktieren',
        call: 'Jetzt anrufen',
      },
    },
    footer: {
      company: {
        name: 'CU Umzüge und Transport',
        description: 'Ihr Experte für stressfreie Umzüge in Deutschland und Europa.',
      },
      links: {
        title: 'Schnell-Links',
        items: [
          { name: 'Startseite', page: 'home' },
          { name: 'Über uns', page: 'about' },
          { name: 'Leistungen', page: 'services' },
          { name: 'Kontakt', page: 'contact' },
        ],
      },
      contact: {
        title: 'Kontakt',
        address: 'Birkenallee 13, 22147 Hamburg',
        phone: '+49 123 456 7890',
        email: 'info@cu-umzuege.de',
      },
      copyright: '© 2024 CU Umzüge und Transport. Alle Rechte vorbehalten.',
    },
    login: {
      title: 'Admin-Anmeldung',
      form: {
          username: 'Benutzername',
          password: 'Passwort',
          submit: 'Anmelden',
          error: 'Falscher Benutzername oder Passwort.'
      },
      loggedInMessage: 'Sie sind bereits angemeldet.'
    },
    admin: {
        title: 'Admin-Dashboard',
        heroManagement: {
            title: 'Startseiten-Bild Verwaltung',
            uploadTitle: 'Neues Startseiten-Bild hochladen',
            currentImageTitle: 'Aktuelles Bild',
            form: {
                imageFile: 'Bilddatei auswählen',
                submit: 'Bild aktualisieren'
            }
        },
        galleryManagement: {
            title: 'Galerieverwaltung',
            uploadTitle: 'Neues Bild hochladen',
            form: {
                imageFile: 'Bilddatei auswählen',
                altText: 'Alternativtext',
                submit: 'Bild hinzufügen'
            },
            currentImagesTitle: 'Aktuelle Bilder',
            deleteButton: 'Löschen',
            noImages: 'Die Galerie ist derzeit leer.'
        }
    },
  },
  en: {
    header: {
      nav: {
        home: 'Home',
        about: 'About Us',
        services: 'Services',
        gallery: 'Gallery',
        contact: 'Contact',
        admin: 'Admin',
        login: 'Login',
        logout: 'Logout',
      },
      cta: 'Request a Quote',
    },
    home: {
      hero: {
        headline: 'Your Reliable Partner for Removals and Transports',
        subheadline: 'Move without stress with CU Removals and Transport. Professional, fast, and secure.',
        cta: 'Get a Free Quote',
      },
      benefits: {
        title: 'Why Choose Us',
        items: [
          { icon: 'fast', title: 'Fast', description: 'Efficient planning and execution for a swift move.' },
          { icon: 'reliable', title: 'Reliable', description: 'Punctuality and care are our top priorities.' },
          { icon: 'professional', title: 'Professional', description: 'Experienced staff and modern equipment.' },
          { icon: 'insured', title: 'Insured', description: 'Your belongings are in the best hands and fully insured with us.' },
        ],
      },
      services: {
        title: 'Our Services',
        description: 'We offer a wide range of services to make your move as easy as possible.',
        cta: 'View All Services',
        items: [
          { title: 'Private Moves', description: 'Full service for your private home relocation.' },
          { title: 'Business Moves', description: 'Minimal downtime for your office relocation.' },
          { title: 'Furniture Transport', description: 'Safe transport of single pieces of furniture or entire households.' },
        ],
      },
      reviews: {
        title: 'What Our Customers Say',
        items: [
          { quote: 'The move was perfectly organized and went incredibly fast. The team was very friendly and professional. Highly recommended!', author: 'Anna S.' },
          { quote: 'Everything was top-notch from the first contact to the last box. Fair prices and great service. I would use them again anytime!', author: 'Markus T.' },
          { quote: 'CU Removals handled our office move over the weekend flawlessly. Everything went according to plan. Thank you!', author: 'Global Tech Ltd.' },
        ],
      },
      gallery: {
        title: 'A Glimpse of Our Work',
        cta: 'Go to Gallery',
      },
      contact: {
        title: 'Planning Your Move?',
        description: 'Contact us today for a non-binding and free quote. We are happy to advise you!',
        cta: 'Contact Us Now',
      },
    },
    about: {
      title: 'About CU Removals and Transport',
      sections: [
        {
          title: 'Our History',
          paragraphs: [
            'CU Removals and Transport was founded with the vision of making the moving process as simple and stress-free as possible for our customers. Since our inception, we have helped hundreds of families and businesses move safely into their new homes or business premises.',
            'Our success is based on the core values of reliability, professionalism, and customer satisfaction. We understand that every move is unique and requires individual planning and care.',
          ],
        },
        {
          title: 'Our Mission',
          paragraphs: [
            'Our mission is to provide first-class removal and transport services that exceed our customers\' expectations. We rely on trained personnel, modern vehicles, and high-quality packing materials to ensure the safety of your property.',
            'We strive to be a trusted partner in every phase of the move, from the initial consultation to unpacking the last box.',
          ],
        },
      ],
      teamTitle: 'Our Team',
      teamMembers: [
        { name: 'Ivan Curcic', role: 'Founder & CEO' },
        { name: 'Team of Professionals', role: 'Experienced Movers' },
      ],
    },
    services: {
      title: 'Our Services',
      intro: 'We offer a comprehensive range of moving services tailored to your individual needs. Whether it\'s a small private move or a large corporate relocation, we have the right solution for you.',
      services: [
        { title: 'Private Moves', description: 'We take care of the entire move of your apartment or house. From planning and packing to assembling your furniture at the destination.', features: ['Free on-site survey & quote', 'Packing and unpacking service', 'Furniture disassembly and assembly', 'Kitchen fitting'] },
        { title: 'Business Moves', description: 'Efficient and professional relocations for offices and companies of all sizes. We minimize downtime so your business can continue to run smoothly.', features: ['Detailed move planning', 'IT and archive transport', 'Furniture disposal', 'Weekend and night moves'] },
        { title: 'Furniture Transport & Part Loads', description: 'Do you only have a few pieces of furniture to transport? No problem! We offer cost-effective solutions for single-item transports and part loads.', features: ['Safe transport of single items', 'Flexible scheduling', 'Insured transport', 'Germany & Europe-wide'] },
        { title: 'Clearance & Disposal', description: 'We create space! Professional clearance of basements, attics, or entire apartments with proper disposal.', features: ['Broom-clean handover', 'Valuation of items possible', 'Environmentally friendly disposal', 'Discreet and reliable'] },
      ],
    },
    gallery: {
      title: 'Our Gallery',
      description: 'See for yourself how we work. Here you will find a selection of images from our successfully completed removals and transports.',
      images: [
        { src: 'https://picsum.photos/600/400?image=100', alt: 'A moving truck being loaded' },
        { src: 'https://picsum.photos/600/400?image=101', alt: 'Team of movers carrying a sofa' },
        { src: 'https://picsum.photos/600/400?image=102', alt: 'Carefully packed boxes' },
        { src: 'https://picsum.photos/600/400?image=103', alt: 'Furniture being assembled in an apartment' },
        { src: 'https://picsum.photos/600/400?image=104', alt: 'A clean and modern moving vehicle' },
        { src: 'https://picsum.photos/600/400?image=105', alt: 'Smiling employees in company clothing' },
        { src: 'https://picsum.photos/600/400?image=106', alt: 'A large office being relocated' },
        { src: 'https://picsum.photos/600/400?image=107', alt: 'Heavy items are transported professionally' },
        { src: 'https://picsum.photos/600/400?image=108', alt: 'A happy customer shaking hands with a mover' },
      ],
    },
    contact: {
      title: 'Contact Us',
      description: 'Do you have questions or would you like a free quote? Fill out the form or give us a call. We are here for you!',
      form: {
        name: 'Your Name',
        email: 'Your Email',
        phone: 'Your Phone (optional)',
        message: 'Your Message',
        submit: 'Send Message',
        success: 'Thank you! Your message has been sent. We will get back to you shortly.',
      },
      details: {
        title: 'Contact Details',
        address: 'Birkenallee 13, 22147 Hamburg, Germany',
        phone: '+49 123 456 7890',
        email: 'info@cu-umzuege.de',
      },
      cta: {
        whatsapp: 'Contact via WhatsApp',
        call: 'Call Now',
      },
    },
    footer: {
      company: {
        name: 'CU Removals and Transport',
        description: 'Your expert for stress-free moves in Germany and Europe.',
      },
      links: {
        title: 'Quick Links',
        items: [
          { name: 'Home', page: 'home' },
          { name: 'About Us', page: 'about' },
          { name: 'Services', page: 'services' },
          { name: 'Contact', page: 'contact' },
        ],
      },
      contact: {
        title: 'Contact',
        address: 'Birkenallee 13, 22147 Hamburg',
        phone: '+49 123 456 7890',
        email: 'info@cu-umzuege.de',
      },
      copyright: '© 2024 CU Removals and Transport. All rights reserved.',
    },
    login: {
      title: 'Admin Login',
      form: {
          username: 'Username',
          password: 'Password',
          submit: 'Login',
          error: 'Incorrect username or password.'
      },
      loggedInMessage: 'You are already logged in.'
    },
    admin: {
        title: 'Admin Dashboard',
        heroManagement: {
            title: 'Hero Image Management',
            uploadTitle: 'Upload New Hero Image',
            currentImageTitle: 'Current Image',
            form: {
                imageFile: 'Select Image File',
                submit: 'Update Image'
            }
        },
        galleryManagement: {
            title: 'Gallery Management',
            uploadTitle: 'Upload New Image',
            form: {
                imageFile: 'Select Image File',
                altText: 'Alt Text',
                submit: 'Add Image'
            },
            currentImagesTitle: 'Current Images',
            deleteButton: 'Delete',
            noImages: 'The gallery is currently empty.'
        }
    },
  },
};