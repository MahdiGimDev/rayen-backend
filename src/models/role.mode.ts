export enum UserRoles {
  ADMIN = 'ADMIN',
  RH = 'RH',
  EMPLOYEE = 'EMPLOYEE',
  PROVIDER = 'PROVIDER',
  COMMERCIAL = 'COMMERCIAL',
  CLIENT = 'CLIENT',
  OPERATIONAL = 'OPERATIONAL',
}

export enum UserLevels {
  JUNIOR = 'JUNIOR',
  SENIOR = 'SENIOR',
  EXPERT = 'EXPERT',
}

export enum ProspectStatus {
  SUCCEE = 'Prospecté avec succée',
  REFUS = 'Prospecté avec refus',
  RECONTACTER = 'A recontacter',
  ENCOURS = 'En cours de prospection',
}



export enum VacationType {
  VACATION = 'Repos',
  SICKNESS = 'Maladie',
}
export enum VacationStatus1 {
  PENDING = 'EN ATTENTE',
  ACCEPTED = 'ACCEPTEE',
  REFUSED = 'REFUSEE',
}

export enum FormationType {
  UNIV = 'universitaire',
  PRO = 'professionnelle',
  AUTRE ='autre type'
}



export enum FormationExperienceType {
  EXPERIENCE = 'Experience',
  FORMATION = 'Formation',
  PROJET ='Projet',
  PRO = 'proffesionnel',
  AUTRE = 'autre type',
}

export enum FormationStatus1 {
  PENDING = 'NON APPROUVEE',
  ACCEPTED = 'APPROUVEE',
  REFUSED = 'REFUSEE',
}

export enum FormationStatus2 {
  PENDING = 'EN COURS',
  ACCEPTED = 'ACCOMPLIE',
  REFUSED = 'NON COMMENCER',
}

export enum ExperienceStatus1 {
  PENDING = 'EN ATTENTE ',
  ACCEPTED = 'ACCEPTEE',
  REFUSED = 'REFUSEE',
}

export enum ContratType {
  CDI = 'CDI',
  CDD = 'CDD',
  STAGE = 'STAGE',
  SVP = 'SVP',
  AUTRE = 'AUTRE',
}

export enum UserGender {
  HOMME = 'HOMME',
  FEMME = 'FEMME',
}

export enum UserSituation {
  CELIBATAIRE = 'CELIBATAIRE',
  MARIE = 'MARIE',
  DIVORCE = 'DIVORCE',
  VEUF = 'VEUF',
  VEUVE = 'VEUVE',
  AUTRE = 'AUTRE',
}

export enum UserFormation {
  Bac = 'BAC',
  Bac1 = 'BAC+2',
  Bac2 = 'BAC+3',
  Bac3 = 'BAC+4',
  Bac4 = 'BAC+5',
  Bac5 = 'DOCTORANT',
  Bac6 = 'AUTRE',
}
export enum TypeContrat {
  Cdi = 'CDI',
  Cdd = 'CDD',
  Svp = 'SVP',
  Stage = 'STAGE',
  Autre = 'AUTRE',
}

export enum MissionType {
  FORMATION = 'FORMATION',
  AUDIT = 'AUDIT',
  CONSULTING = 'CONSULTING',
  OTHER = 'OTHER',
}

export enum DocumentType {
  FACTURE = 'FACTURE CLIENT',
  BONCOMMANDE = 'BON DE COMMANDE CLIENT',
  BONCOMMANDEF = 'BON DE COMMANDE FOURNISSEUR',
  CONTRATE = 'CONTRAT EMPLOYEE',
  CONTRATF = 'CONTRAT FOURNISSEUR PHYSIQUE',
  CONTRATFM = 'CONTRAT FOURNISSEUR MORAL',
  CONTRATC = 'CONTRAT CLIENT',
  COMPTABILITE = 'DOCUMENT COMPTABILITE',
  PAIE = 'DOCUMENT DE PAIE',
  AUTRE = 'AUTRE',
}
export enum TypeProvider {
  MORAL = 'PERSONNE MORAL',
  PHYSIQUE = 'PERSONNE PHYSIQUE',

}

export enum DocumentVersion {
  REMPLIE = 'VERSION REMPLIE',
  BASIQUE = 'VERSION BASIQUE',

}


export enum ClienStatus2 {
  NOUVEAU = 'client nouveau',
  REGULIER = 'regulier',
  ENTHOUSIASTE = 'enthousiaste',
  NONREGULIER = 'non régulier',
}

export enum MissionStatus {
  AVAILABLE = 'LIBRE',
  OPTION = 'EN OPTION',
  BLOCKED = 'BLOCKEE',
  CONFIRMED = 'CONFIRMEE',
  CANCELLED = 'ANNULEE',
  ENCOURS = 'EN COURS',
  REALISE = 'REALISEE',

}
export enum MissionCategorie {
  DISTANCIEL = 'EN DISTANCIEL',
  PRESENTIEL = 'EN PRESENTIEL',
}
export enum JobStatus {
  FINDING = 'non affecteE',
  ASSIGNED = 'Affectee',
}

export enum JobsOffersStatus {
  INSEARCH = 'INSEARCH',
  ASSIGNED = 'ASSIGNED',
  FINISHED = 'NOT FOUND',
  CANCELLED = 'CANCELLED',
}
