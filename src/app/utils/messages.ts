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
  },
  CHANGE_PASSWORD_SUCCESS: {
    title: 'Senha alterada',
    text: 'Sua senha foi alterada.',
    type: MessageType.SUCCESS
  },
  ACTIVE_BOARD_NOT_FOUND: {
    title: 'Nenhum board está ativo',
    text: 'Por favor verifique seus boards e selecione um.',
    type: MessageType.WARNING
  },
  RESOURCE_REMOVED: {
    title: 'Lançamento excluido',
    text: 'O lançamento foi excluido.',
    type: MessageType.SUCCESS
  }
};
