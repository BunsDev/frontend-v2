import axios from 'axios';
import { jsonToGraphQLQuery } from 'json-to-graphql-query';
import { configService as _configService } from '@/services/config/config.service';

export default class BalancerSubgraphClient {
  url: string;

  constructor(private readonly configService = _configService) {
    this.url = configService.network.subgraph;
  }

  public async get(query) {
    try {
      const payload = this.toPayload(query);
      const {
        data: { data }
      } = await axios.post(this.url, payload, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return data;
    } catch (error) {
      console.error(error);
    }
  }

  public toPayload(query) {
    return JSON.stringify({ query: jsonToGraphQLQuery({ query }) });
  }
}

export const balancerSubgraphClient = new BalancerSubgraphClient();
