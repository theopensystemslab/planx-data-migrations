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
        temp_data_migrations_audit(limit: 1, where: {updated: {_eq: false}}) {
          id: flow_id
          flow: flows {
            slug
            team {
              slug
            }
            data
            publishedFlows: published_flows(limit: 1, order_by: {created_at: desc}) {
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

  async updateQueuedFlow(flowId, liveFlowData) {
    const { data, errors } = await this.graphQL(
      `mutation UpdateFlow ($flowId: uuid!, $liveData: jsonb!) {
        update_flows_by_pk(pk_columns: {id: $flowId}, _set: {data: $liveData}) {
          id
        }
        update_temp_data_migrations_audit_by_pk(pk_columns: {flow_id: $flowId}, _set: {updated: true}) {
          flow_id
        }
      }`,
      {
        flowId: flowId,
        liveData: liveFlowData,
      }
    );
    if (errors || !data) throw new Error(formatJSON({ data, errors }));
    return { ...data };
  }

  async updateQueuedPublishedFlow(flowId, liveFlowData, publishedFlowId, publishedFlowData) {
    const { data, errors } = await this.graphQL(
      `mutation UpdateFlowAndPublishedFlow ($flowId: uuid!, $liveData: jsonb!, $publishedFlowId: Int!, $publishedData: jsonb!) {
        update_flows_by_pk(pk_columns: {id: $flowId}, _set: {data: $liveData}) {
          id
        }
        update_published_flows_by_pk(pk_columns: {id: $publishedFlowId}, _set: {data: $publishedData}) {
          id
        }
        update_temp_data_migrations_audit_by_pk(pk_columns: {flow_id: $flowId}, _set: {updated: true}) {
          flow_id
        }
      }`,
      {
        flowId: flowId,
        liveData: liveFlowData,
        publishedFlowId: publishedFlowId,
        publishedData: publishedFlowData,
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
