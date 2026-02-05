import type { BaseRecord } from "@refinedev/core";

export type SubjectRecord = BaseRecord & {
  id: string;
  code: string;
  name: string;
  department: string;
  description: string;
  createdAt: string;
};

export const mockSubjects: SubjectRecord[] = [
  {
    id: "SUB-001",
    code: "ENGR 101",
    name: "Introduction to Engineering",
    department: "School of Engineering",
    description: "Foundational overview of engineering disciplines, ethics, and design thinking.",
    createdAt: new Date().toISOString(),
  },
  {
    id: "SUB-002",
    code: "CSCI 201",
    name: "Data Structures",
    department: "Computer Science",
    description: "Covers arrays, linked lists, trees, graphs, and algorithm analysis.",
    createdAt: new Date().toISOString(),
  },
  {
    id: "SUB-003",
    code: "MATH 221",
    name: "Calculus III",
    department: "Mathematics",
    description: "Multivariable calculus with applications to optimization and vector fields.",
    createdAt: new Date().toISOString(),
  },
  {
    id: "SUB-004",
    code: "BIOL 150",
    name: "Principles of Biology",
    department: "Biological Sciences",
    description: "Cell structure, genetics, evolution, and ecology for life science majors.",
    createdAt: new Date().toISOString(),
  },
  {
    id: "SUB-005",
    code: "CHEM 130",
    name: "Organic Chemistry I",
    department: "Chemistry",
    description: "Introduces structure, nomenclature, and reactivity of organic molecules.",
    createdAt: new Date().toISOString(),
  },
  {
    id: "SUB-006",
    code: "HIST 210",
    name: "World History Since 1500",
    department: "History",
    description: "Global political, social, and economic developments from 1500 to present.",
    createdAt: new Date().toISOString(),
  },
  {
    id: "SUB-007",
    code: "PSYC 120",
    name: "Introduction to Psychology",
    department: "Psychology",
    description: "Survey of cognitive, behavioral, and social foundations of human psychology.",
    createdAt: new Date().toISOString(),
  },
  {
    id: "SUB-008",
    code: "BUSN 301",
    name: "Principles of Marketing",
    department: "Business Administration",
    description: "Market research, consumer behavior, and marketing strategy development.",
    createdAt: new Date().toISOString(),
  },
  {
    id: "SUB-009",
    code: "ARTS 115",
    name: "Foundations of Drawing",
    department: "Fine Arts",
    description: "Studio techniques for observational drawing using graphite and charcoal.",
    createdAt: new Date().toISOString(),
  },
  {
    id: "SUB-010",
    code: "NURS 250",
    name: "Health Assessment",
    department: "Nursing",
    description: "Hands-on patient assessment skills including vitals, interviewing, and charting.",
    createdAt: new Date().toISOString(),
  },
  {
    id: "SUB-011",
    code: "ECON 202",
    name: "Macroeconomics",
    department: "Economics",
    description: "National income, fiscal policy, monetary systems, and global economic trends.",
    createdAt: new Date().toISOString(),
  },
  {
    id: "SUB-012",
    code: "ENGL 205",
    name: "Creative Writing Workshop",
    department: "English",
    description: "Peer-led workshops focused on fiction and poetry craft techniques.",
    createdAt: new Date().toISOString(),
  },
];
