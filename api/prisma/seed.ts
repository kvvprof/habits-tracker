import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const main = async () => {
  await prisma.habits.create({
    data: {
      title: '💧 Стакан воды перед завтраком',
      description:
        'Употребление стакана воды утром натощак способствует избавлению от лишнего веса. Это происходит за счет выведения из тканей лишней жидкости и ускорения обменных процессов. Вода, выпитая в утреннее время, запускает химические реакции, которые стимулируют обновление клеток.',
      type: 'good',
      duration: 21,
      startLives: 1,
    },
  });

  await prisma.habits.create({
    data: {
      title: '🧍‍♀️ Зарядка',
      description:
        'Утренняя зарядка улучшит метаболизм, поможет зарядить энергией. Организм привыкнет к умеренной физической нагрузке и человек будет бодрым и активным весь день.',
      type: 'good',
      duration: 30,
      startLives: 2,
    },
  });

  await prisma.habits.create({
    data: {
      title: '🏃‍♀️ Занятия спортом 2-3 раза в неделю по 30-60 минут',
      description:
        'Спорт требует непрерывной напряженной работы, что приводит в тонус организм и мышцы нашего тела. Это хороший способ укрепить сердечно-сосудистую систему во время работы на выносливость и силу. ',
      type: 'good',
      duration: 60,
      startLives: 3,
    },
  });

  await prisma.habits.create({
    data: {
      title: '🇺🇸 Учить 10 иностранных слов каждый день',
      description:
        'Изучение иностранных языков дает огромное количество преимуществ. Помимо очевидных — свобода общения, карьерные перспективы, образование и международный опыт, это еще и отличный тренажер для мозга.',
      type: 'good',
      duration: 30,
      startLives: 2,
    },
  });

  await prisma.habits.create({
    data: {
      title: '😴 Здоровый сон',
      description:
        'Здоровый и крепкий сон — это энергия на целый день и светлая голова. Старайтесь спать минимум 8 часов в день.',
      type: 'good',
      duration: 30,
      startLives: 2,
    },
  });

  await prisma.habits.create({
    data: {
      title: '🎰 Азартные игры или лудомания',
      description:
        'Патология игровой зависимости выражается в продолжительной, повторяющейся и, зачастую, возрастающей тяге к азартным играм, которая наносит ущерб социальной жизни человека и приводит к таким последствиям, как долги, разрушение семейных связей и снижение интереса к профессиональному росту.',
      type: 'bad',
      duration: 60,
      startLives: 3,
    },
  });

  await prisma.habits.create({
    data: {
      title: '🚬 Курение',
      description:
        'Курение наносит вред сердцу и кровообращению, увеличивает риск развития ишемической болезни сердца, инсульта, заболевания периферических сосудов (поврежденные кровеносные сосуды) и цереброваскулярных заболеваний (поврежденные артерии, которые снабжают мозг кровью).',
      type: 'bad',
      duration: 30,
      startLives: 2,
    },
  });

  await prisma.habits.create({
    data: {
      title: '🍺 Алкоголизм',
      description:
        'Употребление алкоголя связано с риском развития таких проблем со здоровьем, как психические и поведенческие расстройства, включая алкогольную зависимость, и тяжелые неинфекционные заболевания, такие как цирроз печени, некоторые виды рака и сердечно-сосудистые болезни.',
      type: 'bad',
      duration: 60,
      startLives: 2,
    },
  });

  await prisma.habits.create({
    data: {
      title: '💋 Просмотр порно',
      description:
        'Люди, имеющие пристрастие к просмотру порнографии в Интернете, подвержены риску утраты рабочей, или кратковременной, памяти, что может иметь серьезные последствия для их жизни в целом. Регулярный просмотр порнографии может также негативно отразиться и на тех, кто находится в постоянных отношениях.',
      type: 'bad',
      duration: 90,
      startLives: 3,
    },
  });

  await prisma.habits.create({
    data: {
      title: '🤐 Злоупотребление «словами-паразитами»',
      description:
        'Плохая самооценка и неуверенность говорящего легко считываются слушателями. У такого человека шансы на карьерный рост ничтожно мал, ведь никто не поставит на высокую должность того, кто не может контролировать свою речь, пусть и при умении отлично справляться с основными обязанностями.',
      type: 'bad',
      duration: 30,
      startLives: 2,
    },
  });
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })

  .catch(async (e) => {
    console.error(e);

    await prisma.$disconnect();

    process.exit(1);
  });
