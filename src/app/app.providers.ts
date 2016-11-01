import { UserActions } from './user/user.actions';
import { UserService } from './user/user.service';
import { QuestionsService } from './questions/questions.service';

export const APP_PROVIDERS = [
  UserActions,
  UserService,
  QuestionsService
];
