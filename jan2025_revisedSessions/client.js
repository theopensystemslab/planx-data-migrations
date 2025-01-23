require("isomorphic-fetch");

class Client {
  constructor({ hasuraSecret, targetURL }) {
    this.secret = hasuraSecret;
    this.url = targetURL;
  }

  async graphQL(query, variables) {
    const result = await fetch(this.url, {
      method: "POST",
      body: JSON.stringify({ query, variables }),
      headers: {
        "x-hasura-admin-secret": this.secret,
      },
    });
    return result.json();
  }

  async getQueuedFlow() {
    const { data, errors } = await this.graphQL(
      `query GetQueuedFlow {
        temp_data_migrations_audit(
          limit: 1, 
          where: {updated: {_eq: false}}
        ) {
          id: flow_id
          flow {
            data
            slug
            team {
              slug
            }
            sessions: lowcal_sessions(
              where: {
                created_at: {_gte: "2024-12-22"},
                submitted_at: {_is_null: true}, 
              }
            ) {
              id
              data
            }
          }
        }
      }`
    );

    if (errors || !data) throw new Error(formatJSON({ data, errors }));
    return data.temp_data_migrations_audit[0];
  }

  async updateSessionData(sessionId, sessionData) {
    const { data, errors } = await this.graphQL(
      `mutation UpdateLowcalSession ($id: uuid!, $data: jsonb!) {
        update_lowcal_sessions_by_pk(pk_columns: {id: $id}, _set: {data: $data}) {
          id
        }
      }`,
      {
        id: sessionId,
        data: sessionData,
      }
    );
    if (errors || !data) throw new Error(formatJSON({ data, errors }));
    return { ...data };
  }

  async updateAuditTable(flowId) {
    const { data, errors } = await this.graphQL(
      `mutation UpdateFlow ($flowId: uuid!) {
        update_temp_data_migrations_audit_by_pk(pk_columns: {flow_id: $flowId}, _set: {updated: true}) {
          flow_id
        }
      }`,
      {
        flowId: flowId,
      }
    );
    if (errors || !data) throw new Error(formatJSON({ data, errors }));
    return { ...data };
  }
}

function formatJSON({ data, errors }) {
  return JSON.stringify({ data, errors }, null, 2);
}

module.exports = Client;
