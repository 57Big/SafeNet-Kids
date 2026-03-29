/**
 * Toxic/harmful words database in Uzbek (Latin)
 * Categories: offensive, violence, adult, hate
 */

const toxicWords = {
  // High severity - offensive and harmful words
  high: [
    'ahmoq',
    'telba',
    'harom',
    'jinni',
    'yomon',
    'yovuz',
    'o\'ldir',
    'urish',
    'kaltakla',
    'jazola',
    'qon',
    'o\'ldirish',
    'narkotik',
    'giyohvand',
    'alkogol',
    'ichki',
    'mast',
  ],

  // Medium severity - potentially harmful
  medium: [
    'yolg\'on',
    'aldash',
    'o\'g\'irla',
    'g\'ijirla',
    'bema\'ni',
    'ahmoqona',
    'axlat',
    'arzimas',
    'qochqin',
    'talash',
    'janjal',
    'urush',
    'zo\'ravonlik',
    'tashlash',
    'tashlab ketish',
  ],

  // Low severity - warning words
  low: [
    'yomon ko\'r',
    'nafrat',
    'qasos',
    'achchiq',
    'xafa',
    'g\'azab',
    'jahli',
    'g\'ash',
    'beixtiyor',
    'qo\'rqitish',
  ]
};

/**
 * Topics that are inappropriate for children
 */
const inappropriateTopics = [
  'ota-onasiz qochish',
  'maktabdan qochish',
  'yashirin uchrashish',
  'begona odamlar bilan uchrashish',
  'noma\'lum joyga borish',
  'internet orqali shaxsiy ma\'lumot berish',
  'kredit karta',
  'parol',
  'yashirin parol',
  'uy manzili',
  'telefon raqami',
  'shaxsiy rasm',
  'yolg\'iz uchrashish',
];

module.exports = {
  toxicWords,
  inappropriateTopics
};
