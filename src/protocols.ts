export type ApplicationError = {
  name: string;
  message: string;
};

export type ViaCEPAddress = {
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
};

export type AddressEnrollment = {
  logradouro: string;
  complemento: string;
  bairro: string;
  cidade: string;
  uf: string;
  error?: string;
};

export type RequestError = {
  status: number;
  data: object | null;
  statusText: string;
  name: string;
  message: string;
};

export enum cardIssuer {
  visa = 'VISA',
  mastercard = 'MASTERCARD',
}

export type PaymentParams = {
  ticketId: number;
  cardData: {
    issuer: cardIssuer;
    number: number;
    name: string;
    expirationDate: Date;
    cvv: number;
  };
};

export type TicketSchema ={
  ticketTypeId:number
}

