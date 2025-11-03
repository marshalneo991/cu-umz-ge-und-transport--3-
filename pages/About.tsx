import React from 'react';
import { AboutContent } from '../types';
import Section, { useAnimateOnScroll } from '../components/Section';
import { useTeamMembers } from '../hooks/useTeamMembers';

interface AboutProps {
  content: AboutContent;
}

const About: React.FC<AboutProps> = ({ content }) => {
  const [sectionsRef, sectionsVisible] = useAnimateOnScroll<HTMLDivElement>();
  const [teamRef, teamVisible] = useAnimateOnScroll<HTMLDivElement>();
  const { teamMembers: teamMembersFromHook } = useTeamMembers();

  // Combine dynamic data (from localStorage via hook) with static translated content (from props)
  // This ensures images can be changed in admin, while names/roles are translated.
  const displayedTeamMembers = teamMembersFromHook.map(memberFromHook => {
    // Find the corresponding text content for the current language
    const memberContent = content.teamMembers.find(tm => tm.key === memberFromHook.key);

    return {
      ...memberFromHook, // Takes key and src from the hook
      name: memberContent ? memberContent.name : memberFromHook.name, // Use translated name if available, otherwise fallback
      role: memberContent ? memberContent.role : memberFromHook.role, // Use translated role if available, otherwise fallback
    };
  });

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
              {displayedTeamMembers.map((member, index) => (
                <div 
                  key={member.key} 
                  className={`bg-blue-50 p-6 rounded-lg shadow-md w-64 transition-all duration-300 transform hover:scale-105 hover:shadow-xl ease-out ${teamVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`} 
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                    <img src={member.src} alt={member.name} className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-orange-500 object-cover"/>
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