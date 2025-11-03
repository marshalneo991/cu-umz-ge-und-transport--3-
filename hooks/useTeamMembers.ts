import { useState, useEffect, useCallback } from 'react';
import { TeamMember } from '../types';
import { content } from '../constants/content';

const TEAM_MEMBERS_STORAGE_KEY = 'teamMembers';

// Using German content as the single source of truth for initialization
const defaultTeamMembers: TeamMember[] = content.de.about.teamMembers;

export const useTeamMembers = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);

  useEffect(() => {
    try {
      const storedMembers = localStorage.getItem(TEAM_MEMBERS_STORAGE_KEY);
      if (storedMembers) {
        setTeamMembers(JSON.parse(storedMembers));
      } else {
        // Initialize with default members if local storage is empty
        localStorage.setItem(TEAM_MEMBERS_STORAGE_KEY, JSON.stringify(defaultTeamMembers));
        setTeamMembers(defaultTeamMembers);
      }
    } catch (error) {
      console.error("Failed to access localStorage for team members:", error);
      setTeamMembers(defaultTeamMembers);
    }
  }, []);

  const updateStorageAndState = (newMembers: TeamMember[]) => {
    setTeamMembers(newMembers);
    localStorage.setItem(TEAM_MEMBERS_STORAGE_KEY, JSON.stringify(newMembers));
  };

  const addTeamMember = useCallback((newMember: TeamMember) => {
    // Prevent adding members with duplicate keys
    if (teamMembers.some(member => member.key === newMember.key)) {
      alert('A team member with this name/key already exists. Please choose a different name.');
      return;
    }
    const updatedMembers = [...teamMembers, newMember];
    updateStorageAndState(updatedMembers);
  }, [teamMembers]);

  const deleteTeamMember = useCallback((key: string) => {
    const filteredMembers = teamMembers.filter(member => member.key !== key);
    updateStorageAndState(filteredMembers);
  }, [teamMembers]);

  const updateTeamMemberImage = useCallback((key: string, newImageSrc: string) => {
    const updatedMembers = teamMembers.map(member => 
      member.key === key ? { ...member, src: newImageSrc } : member
    );
    updateStorageAndState(updatedMembers);
  }, [teamMembers]);
  
  return { teamMembers, addTeamMember, deleteTeamMember, updateTeamMemberImage };
};

export type { TeamMember };