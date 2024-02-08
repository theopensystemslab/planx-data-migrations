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

  async getFlowData(slug) {
    const { data, errors } = await this.graphQL(
      `query GetData($slug: String!) {
        flows(where: {slug: {_eq: $slug}}) {
          id
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
      `,
    {
      slug: slug,
    }
   );
   if (errors || !data) throw new Error(formatJSON({ data, errors }));
   return data.flows;
  }

  async updateFlowAndPublishedFlow(flowId, liveFlowData, publishedFlowId, publishedFlowData) {
    const { data, errors } = await this.graphQL(
      `mutation UpdateFlowAndPublishedFlow ($flowId: uuid!, $liveData: jsonb!, $publishedFlowId: Int!, $publishedData: jsonb!) {
        update_flows_by_pk(pk_columns: {id: $flowId}, _set: {data: $liveData}) {
          id
        }
        update_published_flows_by_pk(pk_columns: {id: $publishedFlowId}, _set: {data: $publishedData}) {
          id
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

  async updateFlow(flowId, liveFlowData) {
    const { data, errors } = await this.graphQL(
      `mutation UpdateFlow ($flowId: uuid!, $liveData: jsonb!) {
        update_flows_by_pk(pk_columns: {id: $flowId}, _set: {data: $liveData}) {
          id
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
}


function formatJSON({ data, errors }) {
  return JSON.stringify({ data, errors }, null, 2);
}

module.exports = Client;
