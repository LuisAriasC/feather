/* External dependencies */
import * as Joi from '@hapi/joi';

export default Joi.object({
  VAULT_ENV: Joi.required(),
});
