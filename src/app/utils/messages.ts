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
  },
  RESOURCE_STORED: {
    title: 'Lançamento registrado',
    text: 'O lançamento foi registrado.',
    type: MessageType.SUCCESS
  },
  RESOURCE_UPDATED: {
    title: 'Lançamento atualizado',
    text: 'O lançamento foi atualizado.',
    type: MessageType.SUCCESS
  },
  SESSION_EXPIRED: {
    title: 'Sua sessão expirou',
    text: 'Sua sessão expirou! Por favor faça login novamente.',
    type: MessageType.WARNING
  },
  WRONG_LOGIN: {
    title: 'E-mail ou senha inválidos',
    text: 'Por favor verifique o e-mail e senha digitados.',
    type: MessageType.WARNING
  },
  DEFAULT_ERROR: {
    title: 'Ops, tivemos um problema',
    text: 'Nos desculpe, algo aconteceu durante o processamento da sua operação.',
    type: MessageType.DANGER
  },
  SHARED_BOARD: {
    title: 'Board compartilhado',
    text: 'Enviamos um email para o usuário com quem você acaba de compartilhar.',
    type: MessageType.SUCCESS
  },
  UNSHARED_BOARD: {
    title: 'Usuário removido do Board',
    text: 'O usuário foi removido e não terá masi acesso ao Board.',
    type: MessageType.SUCCESS
  }
};
