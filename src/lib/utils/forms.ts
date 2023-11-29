const required = (fieldName: string) =>
  `Le champ "${fieldName}" est obligatoire`;

const number = (fieldName: string) =>
  `Le champ ${fieldName} doit être un chiffre`;

export const formErrorMessages = { required, number };
