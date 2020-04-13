import query from "~/typeDefs/query";
import mutation from "~/typeDefs/mutation";
import types from "~/typeDefs/types";

const setup = `
    enum AuthRole {
        admin
        moderator
        regular
    }

    # Directives
        directive @auth(roles: [AuthRole] = []) on FIELD_DEFINITION
`;

export default [setup, ...types, query, mutation];
