export const dummyUser = {
  id: '1',
  name: 'Aizhan',
  phone: '+7 701 123 4567',
  balance: 15000,
  city: 'Almaty',
  bio: '',
  instagram: '',
  tiktok: ''
};

export const dummyChildren = [
  { id: '1', name: 'Amir', age: 7, hasSubscription: true },
  { id: '2', name: 'Aruzhan', age: 4, hasSubscription: false },
];

export const dummyCategories = [
  { id: 'sports', name: 'Sports', icon: 'Trophy' },
  { id: 'music', name: 'Music', icon: 'Music' },
  { id: 'education', name: 'Education', icon: 'BookOpen' },
  { id: 'art', name: 'Art', icon: 'Palette' },
  { id: 'dance', name: 'Dance', icon: 'Activity' },
];

export const dummyActivities = [
  {
    id: '1',
    title: 'Swimming for Kids',
    center: 'AquaStars Almaty',
    category: 'sports',
    ageRange: '5-12',
    price: 3000,
    rating: 4.8,
    image: 'https://picsum.photos/seed/swim/400/300',
    location: 'Abay Ave 50',
    lat: 43.2389,
    lng: 76.8897,
  },
  {
    id: '2',
    title: 'Piano Lessons',
    center: 'Mozart Academy',
    category: 'music',
    ageRange: '6-15',
    price: 4500,
    rating: 4.9,
    image: 'https://picsum.photos/seed/piano/400/300',
    location: 'Dostyk Ave 100',
    lat: 43.2289,
    lng: 76.9597,
  },
  {
    id: '3',
    title: 'Robotics Basics',
    center: 'TechKids',
    category: 'education',
    ageRange: '8-14',
    price: 5000,
    rating: 4.7,
    image: 'https://picsum.photos/seed/robot/400/300',
    location: 'Al-Farabi Ave 15',
    lat: 43.2189,
    lng: 76.9297,
  },
];

export const dummyHistory = [
  { id: '1', childId: '1', activityTitle: 'Swimming for Kids', date: '2023-10-25', status: 'visited' },
  { id: '2', childId: '1', activityTitle: 'Robotics Basics', date: '2023-10-28', status: 'missed' },
  { id: '3', childId: '2', activityTitle: 'Art Class', date: '2023-10-26', status: 'visited' },
];

export const dummyPosts = [
  {
    id: 1,
    author: {
      name: 'Maia_Sha',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150',
      date: '8 апреля'
    },
    content: 'У меня назрел вопрос. Обращаюсь к тем, кто тренируется в тренажерных залах: часто ли встречаете там женщин моего возраста, то есть старше 50 лет?...',
    image: 'https://images.unsplash.com/photo-1576610616656-d3aa5d1f4534?auto=format&fit=crop&q=80&w=800',
    likes: 188,
    comments: 106,
    views: '6,7k'
  },
  {
    id: 2,
    author: {
      name: 'Assekaa',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150',
      date: '7 апреля'
    },
    content: 'Всем привет 🤍 Купила абонемент на год, но уже идёт третий месяц, а в бассейн сходила всего...',
    image: 'https://images.unsplash.com/photo-1514222709107-a180c68d72b4?auto=format&fit=crop&q=80&w=800',
    likes: 54,
    comments: 12,
    views: '2,1k'
  }
];
