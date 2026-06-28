// Координаты пользователя.
export interface UserGeo {
  lat: string;
  lng: string;
}

// Адрес пользователя.
export interface UserAddress {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: UserGeo;
}

// Данные компании пользователя.
export interface UserCompany {
  name: string;
  catchPhrase: string;
  bs: string;
}

// Полная модель пользователя, получаемая с сервера.
export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: UserAddress;
  phone: string;
  website: string;
  company: UserCompany;
}