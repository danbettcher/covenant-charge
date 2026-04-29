export type UploadMeta = {
  path: string;
  filename: string;
  uploadedAt: string;
};

export type AssessmentData = {
  // Section 0
  sec_0_1: string[];
  sec_0_2: string;
  // Section 1
  sec_1_1: string; sec_1_2: string; sec_1_3: string; sec_1_4: string;
  sec_1_5: string; sec_1_6: string; sec_1_7: string; sec_1_8: string;
  sec_1_9: string; sec_1_10: string; sec_1_11: string;
  sec_1_12: { name: string; email: string };
  // Section 2
  sec_2_1: string; sec_2_2: string; sec_2_3: string; sec_2_4: string;
  sec_2_5: string; sec_2_6: string; sec_2_7: string; sec_2_8: string;
  // Section 3
  sec_3_1: string; sec_3_2: string; sec_3_3: string[]; sec_3_4: string;
  sec_3_5: { value: string; text: string };
  sec_3_6: string; sec_3_7: string; sec_3_8: string; sec_3_9: string;
  sec_3_10: string[]; sec_3_11: string;
  sec_3_12: { intent: string; stations: string; spaces: string };
  // Section 4
  sec_4_1: string; sec_4_2: string; sec_4_3: string;
  sec_4_4: UploadMeta | null;
  sec_4_5: string; sec_4_6: string; sec_4_7: string; sec_4_8: string;
  sec_4_9: string; sec_4_10: string;
  // Section 5
  sec_5_1: string;
  sec_5_2: { types: string[]; age: string };
  sec_5_3: string; sec_5_4: string[]; sec_5_5: string[];
  sec_5_6: { value: string; sqft: string };
  sec_5_7: string; sec_5_8: string; sec_5_9: string;
  // Section 6
  sec_6_1: string[]; sec_6_2: string; sec_6_3: string[]; sec_6_4: string;
  sec_6_5: string; sec_6_6: string; sec_6_7: string;
  // Section 7
  sec_7_1: string; sec_7_2: string; sec_7_3: string; sec_7_4: string;
  sec_7_5: string; sec_7_6: string; sec_7_7: string;
  // Section 8
  sec_8_1: string; sec_8_2: string[]; sec_8_3: string; sec_8_4: string;
  sec_8_5: { value: string; text: string };
  sec_8_6: string;
  // Section 9
  sec_9_1: string; sec_9_2: string; sec_9_3: string[]; sec_9_4: string;
  // Section 10
  sec_10_1: string; sec_10_2: string; sec_10_3: string; sec_10_4: string;
  sec_10_5: boolean;
  // Section 11
  sec_11_1: string; sec_11_2: string; sec_11_3: string; sec_11_4: string;
  sec_11_5: string;
  // Section 12
  sec_12_1: string; sec_12_2: string;
};

export type SectionProps = {
  data: AssessmentData;
  onChange: <K extends keyof AssessmentData>(field: K, value: AssessmentData[K]) => void;
  errors: Record<string, string>;
  submissionId: string;
};

export const DEFAULT_DATA: AssessmentData = {
  sec_0_1: [], sec_0_2: '',
  sec_1_1: '', sec_1_2: '', sec_1_3: '', sec_1_4: '', sec_1_5: '',
  sec_1_6: '', sec_1_7: '', sec_1_8: '', sec_1_9: '', sec_1_10: '',
  sec_1_11: '', sec_1_12: { name: '', email: '' },
  sec_2_1: '', sec_2_2: '', sec_2_3: '', sec_2_4: '',
  sec_2_5: '', sec_2_6: '', sec_2_7: '', sec_2_8: '',
  sec_3_1: '', sec_3_2: '', sec_3_3: [], sec_3_4: '',
  sec_3_5: { value: '', text: '' },
  sec_3_6: '', sec_3_7: '', sec_3_8: '', sec_3_9: '', sec_3_10: [], sec_3_11: '',
  sec_3_12: { intent: '', stations: '', spaces: '' },
  sec_4_1: '', sec_4_2: '', sec_4_3: '', sec_4_4: null,
  sec_4_5: '', sec_4_6: '', sec_4_7: '', sec_4_8: '', sec_4_9: '', sec_4_10: '',
  sec_5_1: '', sec_5_2: { types: [], age: '' }, sec_5_3: '',
  sec_5_4: [], sec_5_5: [], sec_5_6: { value: '', sqft: '' },
  sec_5_7: '', sec_5_8: '', sec_5_9: '',
  sec_6_1: [], sec_6_2: '', sec_6_3: [], sec_6_4: '',
  sec_6_5: '', sec_6_6: '', sec_6_7: '',
  sec_7_1: '', sec_7_2: '', sec_7_3: '', sec_7_4: '',
  sec_7_5: '', sec_7_6: '', sec_7_7: '',
  sec_8_1: '', sec_8_2: [], sec_8_3: '', sec_8_4: '',
  sec_8_5: { value: '', text: '' }, sec_8_6: '',
  sec_9_1: '', sec_9_2: '', sec_9_3: [], sec_9_4: '',
  sec_10_1: '', sec_10_2: '', sec_10_3: '', sec_10_4: '', sec_10_5: false,
  sec_11_1: '', sec_11_2: '', sec_11_3: '', sec_11_4: '', sec_11_5: '',
  sec_12_1: '', sec_12_2: '',
};

export function getActiveSections(services: string[]): number[] {
  const hasEV      = services.includes('EV charging');
  const hasSolar   = services.includes('Solar');
  const hasBattery = services.includes('Battery storage');
  return [
    0, 1, 2,
    ...(hasEV      ? [3] : []),
    4,
    ...(hasSolar   ? [5] : []),
    ...(hasBattery ? [6] : []),
    7,
    ...(hasEV      ? [8] : []),
    9, 10, 11, 12,
  ];
}

export const SECTION_TITLES: Record<number, string> = {
  0:  'Service Selection',
  1:  'Contact & Institution',
  2:  'Property & Ownership',
  3:  'Parking',
  4:  'Electrical Infrastructure',
  5:  'Solar Assessment',
  6:  'Battery Storage',
  7:  'Zoning & Permitting',
  8:  'Access & Operations',
  9:  'Financial Context',
  10: 'Governance',
  11: 'Mission & Vision',
  12: 'Anything Else',
};
