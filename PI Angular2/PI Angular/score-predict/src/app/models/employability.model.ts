export interface EmployabilityData {
  sexe: string;
  code_nationalite: string;
  code_gouv: string;
  score_final: number;
  moy_bac_et: number;
  nature_bac: string;
  code_cursus: string;
  code_diplome: string;
  code_spec: string;
}

export interface EmployabilityResult {
  employability: number;
  input_data: EmployabilityData;
}
