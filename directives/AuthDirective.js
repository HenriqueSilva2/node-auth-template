import {
  SchemaDirectiveVisitor,
  AuthenticationError,
  ForbiddenError,
} from "apollo-server";
import { defaultFieldResolver } from "graphql";

export class AuthDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const { resolve = defaultFieldResolver, name } = field;
    const { roles } = this.args;

    field.resolve = async function (source, args, context, info) {
      const user = context.authUser;
      if (!user) throw new AuthenticationError(`Unauthenticated field ${name}`);
      const userRolesIds = user.roles.map(({ id }) => id);
      if (
        roles.length > 0 &&
        roles.filter((id) => userRolesIds.includes(id)).length === 0
      )
        throw new ForbiddenError(`Unauthorized field ${name}`);

      const result = await resolve.call(this, source, args, context, info);
      return result;
    };
  }
}
