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

export type PaymentParams = {
  ticketId: number;
  cardData: {
    issuer: string;
    number: string;
    name: string;
    expirationDate: string;
    cvv: number;
  };
};

export type TicketSchema = {
  ticketTypeId: number;
};

export enum Status {
  reserved = 'RESERVED',
  paid = 'PAID',
}

export type TicketInsert = {
  ticketTypeId: number;
  enrollmentId: number;
  status: Status;
};
