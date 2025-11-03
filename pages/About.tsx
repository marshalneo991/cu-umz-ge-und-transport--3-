import React from 'react';
import { AboutContent } from '../types';
import Section, { useAnimateOnScroll } from '../components/Section';

interface AboutProps {
  content: AboutContent;
}

const About: React.FC<AboutProps> = ({ content }) => {
  const [sectionsRef, sectionsVisible] = useAnimateOnScroll<HTMLDivElement>();
  const [teamRef, teamVisible] = useAnimateOnScroll<HTMLDivElement>();

  return (
    <>
      <div className="bg-blue-900 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold">{content.title}</h1>
        </div>
      </div>
      <Section>
        <div ref={sectionsRef} className="max-w-4xl mx-auto">
          {content.sections.map((section, index) => (
            <div 
              key={index} 
              className={`mb-12 transition-all duration-700 ease-out ${sectionsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <h2 className="text-3xl font-bold text-blue-900 mb-4">{section.title}</h2>
              {section.paragraphs.map((p, pIndex) => (
                <p key={pIndex} className="text-gray-700 text-lg leading-relaxed mb-4">{p}</p>
              ))}
            </div>
          ))}

          <div ref={teamRef} className={`mt-16 text-center transition-all duration-700 ease-out ${teamVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
            <h2 className="text-3xl font-bold text-blue-900 mb-8">{content.teamTitle}</h2>
            <div className="flex flex-wrap justify-center gap-8">
              {content.teamMembers.map((member, index) => (
                <div 
                  key={index} 
                  className={`bg-blue-50 p-6 rounded-lg shadow-md w-64 transition-all duration-300 transform hover:scale-105 hover:shadow-xl ease-out ${teamVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`} 
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                    <img src={`https://picsum.photos/200/200?image=2${index}`} alt={member.name} className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-orange-500"/>
                    <h3 className="text-xl font-semibold text-blue-900">{member.name}</h3>
                    <p className="text-orange-500 font-medium">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>
    </>
  );
};

export default About;