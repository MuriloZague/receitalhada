const DDD = [
  '11',
  '12',
  '13',
  '14',
  '15',
  '16',
  '17',
  '18',
  '19',
  '21',
  '22',
  '24',
  '27',
  '31',
  '32',
  '41',
  '42',
  '51',
  '53',
  '54',
  '55',
  '61',
  '62',
  '63',
  '65',
  '67',
  '68',
  '69',
  '71',
  '79',
  '81',
  '82',
  '83',
  '84',
  '85',
  '86',
  '91',
  '92',
  '95',
  '96',
  '98',
  '99',
];

// Exemplo de uso
export function isValidDDD(ddd: string): boolean {
  return Object.values(DDD).includes(ddd);
}
