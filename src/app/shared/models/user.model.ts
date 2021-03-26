import { BaseModel } from '@src/app/shared/models/base.model';
import { Profile } from '@src/app/shared/models/profile.model';

export class User extends BaseModel {
    email?: string;
    profile?: Profile;
}
