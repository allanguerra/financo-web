import { MessageType } from '@src/app/shared/enums/message-type.enum';

export const Messages = {
  SIGNUP_SUCCESS: {
    title: 'E-mail de verificação enviado',
    text: 'Para finalizar o cadastro acesse seu e-mail e click no link que enviamos.',
    type: MessageType.INFO
  },
  FORGOT_EMAIL_SENT: {
    title: 'E-mail de validação enviado',
    text: 'Para redefinir sua senha acesse seu e-mail e click no link que enviamos.',
    type: MessageType.INFO
  }
};
