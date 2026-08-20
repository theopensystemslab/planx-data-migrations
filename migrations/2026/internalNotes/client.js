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
            slug
            team {
              slug
            }
            data
            publishedFlows: published_flows(
              limit: 1, 
              order_by: {created_at: desc}
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

  async updateQueuedFlow(flowId, liveFlowData, logs) {
    const { data, errors } = await this.graphQL(
      `mutation UpdateFlow ($flowId: uuid!, $liveData: jsonb!, $logs: String) {
        update_flows_by_pk(pk_columns: {id: $flowId}, _set: {data: $liveData}) {
          id
        }
        update_temp_data_migrations_audit_by_pk(pk_columns: {flow_id: $flowId}, _set: {updated: true, logs: $logs}) {
          flow_id
        }
      }`,
      {
        flowId: flowId,
        liveData: liveFlowData,
        logs: logs,
      }
    );
    if (errors || !data) throw new Error(formatJSON({ data, errors }));
    return { ...data };
  }

  async updateQueuedPublishedFlow(flowId, liveFlowData, publishedFlowId, publishedFlowData, logs) {
    const { data, errors } = await this.graphQL(
      `mutation UpdateFlowAndPublishedFlow ($flowId: uuid!, $liveData: jsonb!, $publishedFlowId: Int!, $publishedData: jsonb!, $logs: String) {
        update_flows_by_pk(pk_columns: {id: $flowId}, _set: {data: $liveData}) {
          id
        }
        update_published_flows_by_pk(pk_columns: {id: $publishedFlowId}, _set: {data: $publishedData}) {
          id
        }
        update_temp_data_migrations_audit_by_pk(pk_columns: {flow_id: $flowId}, _set: {updated: true, logs: $logs}) {
          flow_id
        }
      }`,
      {
        flowId: flowId,
        liveData: liveFlowData,
        publishedFlowId: publishedFlowId,
        publishedData: publishedFlowData,
        logs: logs
      }
    );
    if (errors || !data) throw new Error(formatJSON({ data, errors }));
    return { ...data };
  }

  async createAttachedNote(flowId, nodeId, text) {
    // Default 'Platform Admin' user ID
    const userId = 466;

    const { data, errors } = await this.graphQL(
      `mutation InsertNoteContent($userId: Int!, $text: String!) {
        insert_flow_note_content_one(
          object: {
            text: $text
            created_by: $userId
            updated_by: $userId
          }
        ) {
          id
        }
      }
    `,
      { userId, text },
    );
    if (errors || !data) throw new Error(formatJSON({ data, errors }));

    const noteId = data?.insert_flow_note_content_one?.id;

    const { data: positionData, errors: positionErrors } = await this.graphQL(
      `mutation InsertNotePosition(
        $flowId: uuid!
        $noteId: uuid!
        $nodeId: String!
        $userId: Int!
      ) {
        insert_flow_note_positions_one(
          object: {
            flow_id: $flowId
            note_id: $noteId
            node_id: $nodeId
            created_by: $userId
          }
        ) {
          note_id
        }
      }
    `,
      { flowId, noteId, nodeId, userId },
    );
    if (positionErrors || !positionData) throw new Error(formatJSON({ data, errors }));
    
    return noteId;
  }
}

function formatJSON({ data, errors }) {
  return JSON.stringify({ data, errors }, null, 2);
}

module.exports = Client;
