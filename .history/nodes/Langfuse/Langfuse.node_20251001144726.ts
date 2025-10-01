import { INodeType, INodeTypeDescription, NodeConnectionType } from 'n8n-workflow';

export class Langfuse implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Langfuse',
		name: 'langfuse',
		icon: 'file:langfuse.svg',
		group: ['transform'],
		version: 1,
		description: 'Advanced Langfuse Prompt Management for retrieving, searching, and creating prompts',
		defaults: {
			name: 'Langfuse',
		},
		usableAsTool: true,
		inputs: [NodeConnectionType.Main],
		outputs: [NodeConnectionType.Main],
		credentials: [
			{
				name: 'langfuseApi',
				required: true,
			},
		],
		requestDefaults: {
			baseURL: '={{$credentials.host}}',
		},
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Prompt',
						value: 'prompt',
					},
				],
				default: 'prompt',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['prompt'],
					},
				},
				options: [
					{
						name: 'Create Prompt',
						value: 'create',
						action: 'Create a prompt',
						description: 'Create a new prompt in Langfuse',
						routing: {
							request: {
								method: 'POST',
								url: '/api/public/v2/prompts',
							},
						},
					},
					{
						name: 'Get Prompt',
						value: 'get',
						action: 'Get a prompt',
						description: 'Retrieve a specific prompt by name',
						routing: {
							request: {
								method: 'GET',
								url: '=/api/public/v2/prompts/{{$parameter["promptName"]}}',
							},
						},
					},
					{
						name: 'List Prompts',
						value: 'list',
						action: 'List prompts',
						description: 'List all prompts with pagination and filtering',
						routing: {
							request: {
								method: 'GET',
								url: '/api/public/v2/prompts',
							},
						},
					},
				],
				default: 'get',
			},
			{
				displayName: 'Prompt Name',
				name: 'promptName',
				type: 'string',
				required: true,
				default: '',
				description: 'The name of the prompt to retrieve from LangFuse',
				displayOptions: {
					show: {
						resource: ['prompt'],
						operation: ['get'],
					},
				},
			},
			{
				displayName: 'Prompt Label',
				name: 'label',
				type: 'string',
				required: true,
				default: 'production',
				description: 'Deployment label of the prompt version to retrieve (defaults to Production)',
				displayOptions: {
					show: {
						resource: ['prompt'],
						operation: ['get'],
					},
				},
				routing: {
					request: {
						qs: {
							label: '={{$value}}',
						},
					},
				},
			},
		],
	};
}
