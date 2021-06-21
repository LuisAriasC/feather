/* External Dependencies */
import { Ability, AbilityTuple, MongoQuery, Subject } from '@casl/ability';
/* Local Module Dependencies */
import { IPermissionHandler } from 'src/modules/authorization';
import { Action } from './action.enum';

export class RestoreHandler implements IPermissionHandler {
  constructor(readonly subject: string) {}

  handle(
    ability: Ability<
      AbilityTuple<string, Subject>,
      MongoQuery<Record<string | number | symbol, unknown>>
    >,
  ) {
    return (
      ability.can(Action.RESTORE, this.subject) ||
      ability.can(Action.ALL, this.subject) ||
      ability.can(Action.ALL, 'all')
    );
  }
}
