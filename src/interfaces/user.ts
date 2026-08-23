// Координаты пользователя.
export interface IUserGeo {
  lat: string;
  lng: string;
}

// Адрес пользователя.
export interface IUserAddress {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: IUserGeo;
}

// Данные компании пользователя.
export interface IUserCompany {
  name: string;
  catchPhrase: string;
  bs: string;
}

// Полная модель пользователя, получаемая с сервера.
export interface IUser {
  id: number;
  name: string;
  username: string;
  email: string;
  address: IUserAddress;
  phone: string;
  website: string;
  company: IUserCompany;
}
