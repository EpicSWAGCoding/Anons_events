export const headerLinks = [
    {
      label: 'Главная',
      route: '/',
    },
    {
      label: 'Создать мероприятие',
      route: '/events/create',
    },
    {
      label: 'Мой профиль',
      route: '/profile',
    },
  ]
  
  export const eventDefaultValues = {
    title: '',
    description: '',
    location: '',
    imageUrl: '',
    startDateTime: new Date(),
    endDateTime: new Date(),
    categoryId: '',
    price: '',
    isFree: false,
    url: '',
  }