const projects = [
  {
    id: 'nord-120',
    name: 'Норд 120',
    area: 120,
    bedrooms: 3,
    bathrooms: 2,
    floors: 1,
    material: 'Газобетон',
    garage: false,
    terrace: true,
    priceFrom: 6400000,
    style: 'Скандинавский',
    buildTimeMonths: 6,
    energyClass: 'A',
    heroImage:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1400&q=80'
    ],
    description:
      'Компактный одноэтажный дом с панорамным остеклением, большой кухней-гостиной и мастер-спальней.',
    features: ['Терраса 24 м²', 'Кухня-гостиная 39 м²', 'Два санузла', 'Постирочная'],
    techSpecs: {
      foundation: 'Монолитная плита',
      facade: 'Декоративная штукатурка + планкен',
      roof: 'Металлочерепица, утепление 250 мм',
      glazing: 'Энергоэффективные окна Rehau'
    },
    packages: [
      {
        name: 'Базовая',
        price: 6400000,
        includes: ['Теплый контур', 'Окна ПВХ', 'Черновая электрика', 'Фасад под штукатурку']
      },
      {
        name: 'Комфорт',
        price: 7900000,
        includes: ['Предчистовая отделка', 'Тёплые полы', 'Котел и разводка отопления', 'Система вентиляции']
      },
      {
        name: 'Премиум',
        price: 9600000,
        includes: ['Чистовая отделка', 'Кухня и встроенная техника', 'Умный дом', 'Ландшафтный свет']
      }
    ]
  },
  {
    id: 'city-brick-180',
    name: 'Сити Брик 180',
    area: 180,
    bedrooms: 4,
    bathrooms: 3,
    floors: 2,
    material: 'Кирпич',
    garage: true,
    terrace: true,
    priceFrom: 10900000,
    style: 'Современная классика',
    buildTimeMonths: 10,
    energyClass: 'B',
    heroImage:
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1400&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=1400&q=80'
    ],
    description:
      'Двухэтажный кирпичный дом для большой семьи с кабинетом, кладовой и гаражом на один автомобиль.',
    features: ['Гараж 22 м²', '4 спальни', 'Кабинет на 1 этаже', 'Кладовая при кухне'],
    techSpecs: {
      foundation: 'УШП + ребра жесткости',
      facade: 'Клинкерный кирпич',
      roof: 'Фальцевая кровля',
      glazing: 'Алюминиевые панорамные окна'
    },
    packages: [
      {
        name: 'Базовая',
        price: 10900000,
        includes: ['Фундамент УШП', 'Кирпичный фасад', 'Черновая инженерия', 'Энергоэффективные окна']
      },
      {
        name: 'Комфорт',
        price: 12800000,
        includes: ['Предчистовая отделка', 'Система кондиционирования', 'Подготовка под камин', 'Видео-домофон']
      },
      {
        name: 'Премиум',
        price: 15600000,
        includes: ['Дизайнерская отделка', 'Гаражные ворота с автоматикой', 'Сауна', 'Система безопасности']
      }
    ]
  },
  {
    id: 'forest-timber-95',
    name: 'Форест 95',
    area: 95,
    bedrooms: 2,
    bathrooms: 1,
    floors: 1,
    material: 'Клееный брус',
    garage: false,
    terrace: true,
    priceFrom: 5600000,
    style: 'Шале',
    buildTimeMonths: 5,
    energyClass: 'A',
    heroImage:
      'https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=1400&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1448630360428-65456885c650?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1400&q=80'
    ],
    description:
      'Уютный дом из клееного бруса для отдыха и постоянного проживания. Отлично подходит для участка у леса или озера.',
    features: ['Потолок до 4,2 м', 'Большая терраса', 'Каминная зона', 'Панорамный фронтон'],
    techSpecs: {
      foundation: 'Свайно-ростверковый',
      facade: 'Клееный брус премиум-класса',
      roof: 'Мягкая черепица',
      glazing: 'Дерево-алюминиевые окна'
    },
    packages: [
      {
        name: 'Базовая',
        price: 5600000,
        includes: ['Домокомплект из бруса', 'Кровля и окна', 'Черновой пол', 'Входная дверь']
      },
      {
        name: 'Комфорт',
        price: 6900000,
        includes: ['Инженерия под ключ', 'Сантехника', 'Отделка имитацией бруса', 'Терраса с ограждением']
      },
      {
        name: 'Премиум',
        price: 8300000,
        includes: ['Финская сауна', 'Кухня и мебель', 'Панорамный камин', 'Система очистки воды']
      }
    ]
  },
  {
    id: 'metro-frame-140',
    name: 'Метро 140',
    area: 140,
    bedrooms: 3,
    bathrooms: 2,
    floors: 2,
    material: 'Каркас',
    garage: true,
    terrace: true,
    priceFrom: 7200000,
    style: 'Минимализм',
    buildTimeMonths: 7,
    energyClass: 'A+',
    heroImage:
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1600566752227-8f3b9bd8ca8f?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?auto=format&fit=crop&w=1400&q=80'
    ],
    description:
      'Энергоэффективный каркасный проект с лаконичной архитектурой, мастер-спальней и вторым светом в гостиной.',
    features: ['Второй свет', 'Мастер-спальня с гардеробом', 'Навес для авто', 'Рекуперация воздуха'],
    techSpecs: {
      foundation: 'Монолитная плита',
      facade: 'Фиброцемент + термодерево',
      roof: 'Плоская кровля ПВХ-мембрана',
      glazing: 'Панорамное остекление Guardian'
    },
    packages: [
      {
        name: 'Базовая',
        price: 7200000,
        includes: ['Силовой каркас', 'Утепление 200 мм', 'Окна с мультифункциональным стеклом', 'Внешняя отделка']
      },
      {
        name: 'Комфорт',
        price: 8600000,
        includes: ['Предчистовая отделка', 'Отопление и вентиляция', 'Подготовка под солнечные панели', 'Теплый контур террасы']
      },
      {
        name: 'Премиум',
        price: 10100000,
        includes: ['Полная меблировка', 'Умные сценарии освещения', 'Система рекуперации', 'Зарядка для электромобиля']
      }
    ]
  },
  {
    id: 'vista-210',
    name: 'Виста 210',
    area: 210,
    bedrooms: 5,
    bathrooms: 3,
    floors: 2,
    material: 'Газобетон',
    garage: true,
    terrace: true,
    priceFrom: 13200000,
    style: 'Хай-тек',
    buildTimeMonths: 11,
    energyClass: 'A+',
    heroImage:
      'https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1400&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1600585152915-d208bec867a1?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1400&q=80'
    ],
    description:
      'Просторный семейный дом с приватной зоной на втором этаже, SPA-блоком и террасой для летней кухни.',
    features: ['5 спален', 'SPA-зона', 'Гараж на 2 авто', 'Терраса 46 м²'],
    techSpecs: {
      foundation: 'Монолитная плита с утеплением 300 мм',
      facade: 'Керамогранит + алюминиевые кассеты',
      roof: 'Плоская эксплуатируемая',
      glazing: 'Структурное остекление'
    },
    packages: [
      {
        name: 'Базовая',
        price: 13200000,
        includes: ['Тепловой контур', 'Остекление', 'Черновая инженерия', 'Лестница монолит']
      },
      {
        name: 'Комфорт',
        price: 15100000,
        includes: ['Предчистовая отделка', 'Тепловой насос', 'Система увлажнения', 'Подготовка под бассейн']
      },
      {
        name: 'Премиум',
        price: 18300000,
        includes: ['Дизайнерский интерьер', 'SPA-зона и хаммам', 'Премиальная техника', 'Солнечные панели']
      }
    ]
  },
  {
    id: 'linea-88',
    name: 'Линеа 88',
    area: 88,
    bedrooms: 2,
    bathrooms: 1,
    floors: 1,
    material: 'Каркас',
    garage: false,
    terrace: false,
    priceFrom: 4900000,
    style: 'Минимализм',
    buildTimeMonths: 4,
    energyClass: 'A',
    heroImage:
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1400&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1575517111478-7f6afd0973db?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1400&q=80'
    ],
    description:
      'Доступный и быстрый в строительстве дом с продуманной планировкой для пары или молодой семьи.',
    features: ['Срок строительства от 4 месяцев', 'Кухня-гостиная 30 м²', 'Низкие эксплуатационные расходы'],
    techSpecs: {
      foundation: 'Винтовые сваи',
      facade: 'Фасадная доска + штукатурка',
      roof: 'Скатная, металлочерепица',
      glazing: 'Пятикамерные ПВХ окна'
    },
    packages: [
      {
        name: 'Базовая',
        price: 4900000,
        includes: ['Силовой каркас', 'Теплый контур', 'Внешняя отделка', 'Базовая электрика']
      },
      {
        name: 'Комфорт',
        price: 6100000,
        includes: ['Внутренние перегородки', 'Сантехника', 'Отопление', 'Предчистовая отделка']
      },
      {
        name: 'Премиум',
        price: 7400000,
        includes: ['Чистовая отделка', 'Кухонный гарнитур', 'Техника', 'Система умного дома']
      }
    ]
  }
];

const filterOptions = {
  materials: ['Газобетон', 'Кирпич', 'Клееный брус', 'Каркас'],
  styles: ['Скандинавский', 'Современная классика', 'Шале', 'Минимализм', 'Хай-тек']
};

function formatPrice(value) {
  return new Intl.NumberFormat('ru-RU').format(value) + ' ₽';
}
