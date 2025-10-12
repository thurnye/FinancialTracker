export interface ICharityCategories {
    label: string;
    value: string
}

export const charityCategories: ICharityCategories[] = [
  { label: "Religious Giving", value: "religious_giving" },
  { label: "Humanitarian Aid", value: "humanitarian_aid" },
  { label: "Education & Scholarships", value: "education_scholarships" },
  { label: "Health & Medical Support", value: "health_medical_support" },
  { label: "Animal Welfare", value: "animal_welfare" },
  { label: "Environmental Causes", value: "environmental_causes" },
  { label: "Community Development", value: "community_development" },
  { label: "Arts & Culture", value: "arts_culture" },
  { label: "Children & Youth", value: "children_youth" },
  { label: "Elderly Care", value: "elderly_care" },
  { label: "Social Justice & Advocacy", value: "social_justice_advocacy" },
  { label: "International Aid", value: "international_aid" },
];
