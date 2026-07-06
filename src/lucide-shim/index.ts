import React from 'react';

type IconProps = React.SVGProps<SVGSVGElement> & {
  size?: number;
};

// Create a simple icon component factory (no JSX to avoid .tsx requirement)
function createIcon(name: string) {
  return function Icon({ size = 24, ...props }: IconProps) {
    return React.createElement('svg', {
      width: size,
      height: size,
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: 'currentColor',
      strokeWidth: 2,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      'aria-label': name,
      ...props,
    });
  };
}

export const Mail = createIcon('Mail');
export const Terminal = createIcon('Terminal');
export const ArrowRight = createIcon('ArrowRight');
export const Server = createIcon('Server');
export const BrainCircuit = createIcon('BrainCircuit');
export const ExternalLink = createIcon('ExternalLink');
export const BookOpen = createIcon('BookOpen');
export const Video = createIcon('Video');
export const Volume2 = createIcon('Volume2');
export const AlignLeft = createIcon('AlignLeft');
export const BarChart3 = createIcon('BarChart3');
export const Radio = createIcon('Radio');
export const GraduationCap = createIcon('GraduationCap');
export const FileText = createIcon('FileText');
export const Calendar = createIcon('Calendar');
export const MapPin = createIcon('MapPin');
export const Award = createIcon('Award');
export const ChevronRight = createIcon('ChevronRight');
export const Briefcase = createIcon('Briefcase');
export const Brain = createIcon('Brain');
export const Cpu = createIcon('Cpu');
export const ShieldCheck = createIcon('ShieldCheck');
export const Database = createIcon('Database');
