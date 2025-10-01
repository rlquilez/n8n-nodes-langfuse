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
				default: '',
				description: 'Deployment label of the prompt version to retrieve (optional)',
				displayOptions: {
					show: {
						resource: ['prompt'],
						operation: ['get'],
					},
				},
				routing: {
					request: {
						qs: {
							label: '={{$value || undefined}}',
						},
					},
				},
			},
			{
				displayName: 'Version',
				name: 'version',
				type: 'number',
				default: '',
				description: 'Specific version number to retrieve (optional)',
				displayOptions: {
					show: {
						resource: ['prompt'],
						operation: ['get'],
					},
				},
				routing: {
					request: {
						qs: {
							version: '={{$value || undefined}}',
						},
					},
				},
			},

			// List Prompts fields
			{
				displayName: 'Page',
				name: 'page',
				type: 'number',
				default: '',
				description: 'Page number for pagination (optional, defaults to 1)',
				displayOptions: {
					show: {
						resource: ['prompt'],
						operation: ['list'],
					},
				},
				routing: {
					request: {
						qs: {
							page: '={{$value || undefined}}',
						},
					},
				},
			},
			{
				displayName: 'Limit',
				name: 'limit',
				type: 'number',
				typeOptions: {
					minValue: 1,
				},
				default: 50,
				description: 'Max number of results to return',
				displayOptions: {
					show: {
						resource: ['prompt'],
						operation: ['list'],
					},
				},
				routing: {
					request: {
						qs: {
							limit: '={{$value}}',
						},
					},
				},
			},
			{
				displayName: 'Name Filter',
				name: 'nameFilter',
				type: 'string',
				default: '',
				description: 'Filter prompts by exact name match (optional)',
				displayOptions: {
					show: {
						resource: ['prompt'],
						operation: ['list'],
					},
				},
				routing: {
					request: {
						qs: {
							name: '={{$value || undefined}}',
						},
					},
				},
			},
			{
				displayName: 'Tag Filter',
				name: 'tagFilter',
				type: 'string',
				default: '',
				description: 'Filter prompts by specific tag (optional)',
				displayOptions: {
					show: {
						resource: ['prompt'],
						operation: ['list'],
					},
				},
				routing: {
					request: {
						qs: {
							tag: '={{$value || undefined}}',
						},
					},
				},
			},
			{
				displayName: 'Label Filter',
				name: 'labelFilter',
				type: 'string',
				default: '',
				description: 'Filter prompts by specific label (optional)',
				displayOptions: {
					show: {
						resource: ['prompt'],
						operation: ['list'],
					},
				},
				routing: {
					request: {
						qs: {
							label: '={{$value || undefined}}',
						},
					},
				},
			},
			{
				displayName: 'Version Filter',
				name: 'versionFilter',
				type: 'number',
				default: '',
				description: 'Filter prompts by specific version number (optional)',
				displayOptions: {
					show: {
						resource: ['prompt'],
						operation: ['list'],
					},
				},
				routing: {
					request: {
						qs: {
							version: '={{$value || undefined}}',
						},
					},
				},
			},

			// Create Prompt fields
			{
				displayName: 'Prompt Name',
				name: 'createPromptName',
				type: 'string',
				required: true,
				default: '',
				description: 'Name for the new prompt',
				displayOptions: {
					show: {
						resource: ['prompt'],
						operation: ['create'],
					},
				},
				routing: {
					request: {
						body: {
							name: '={{$value}}',
						},
					},
				},
			},
			{
				displayName: 'Prompt Type',
				name: 'promptType',
				type: 'options',
				options: [
					{
						name: 'Text',
						value: 'text',
						description: 'Simple text prompt',
					},
					{
						name: 'Chat',
						value: 'chat',
						description: 'Chat-style prompt with messages',
					},
				],
				default: 'text',
				required: true,
				description: 'The type of prompt to create',
				displayOptions: {
					show: {
						resource: ['prompt'],
						operation: ['create'],
					},
				},
				routing: {
					request: {
						body: {
							type: '={{$value}}',
						},
					},
				},
			},
			{
				displayName: 'Prompt Content',
				name: 'promptContent',
				type: 'string',
				typeOptions: {
					rows: 4,
				},
				required: true,
				default: '',
				description: 'The content of the text prompt',
				displayOptions: {
					show: {
						resource: ['prompt'],
						operation: ['create'],
						promptType: ['text'],
					},
				},
				routing: {
					request: {
						body: {
							prompt: '={{$value}}',
						},
					},
				},
			},
			{
				displayName: 'Chat Messages',
				name: 'chatMessages',
				type: 'json',
				required: true,
				default: '[\n  {\n    "role": "system",\n    "content": "You are a helpful assistant"\n  },\n  {\n    "role": "user",\n    "content": "{{question}}"\n  }\n]',
				description: 'Array of chat messages with role and content',
				displayOptions: {
					show: {
						resource: ['prompt'],
						operation: ['create'],
						promptType: ['chat'],
					},
				},
				routing: {
					request: {
						body: {
							prompt: '={{JSON.parse($value)}}',
						},
					},
				},
			},
			{
				displayName: 'Labels',
				name: 'labels',
				type: 'string',
				default: '',
				description: 'Comma-separated list of labels for the prompt (optional)',
				displayOptions: {
					show: {
						resource: ['prompt'],
						operation: ['create'],
					},
				},
				routing: {
					request: {
						body: {
							labels: '={{$value ? $value.split(",").map(l => l.trim()).filter(l => l) : []}}',
						},
					},
				},
			},
			{
				displayName: 'Tags',
				name: 'tags',
				type: 'string',
				default: '',
				description: 'Comma-separated list of tags for the prompt (optional)',
				displayOptions: {
					show: {
						resource: ['prompt'],
						operation: ['create'],
					},
				},
				routing: {
					request: {
						body: {
							tags: '={{$value ? $value.split(",").map(t => t.trim()).filter(t => t) : []}}',
						},
					},
				},
			},
			{
				displayName: 'Config (JSON)',
				name: 'config',
				type: 'json',
				default: '{}',
				description: 'Configuration object for the prompt (optional)',
				displayOptions: {
					show: {
						resource: ['prompt'],
						operation: ['create'],
					},
				},
				routing: {
					request: {
						body: {
							config: '={{JSON.parse($value)}}',
						},
					},
				},
			},
			{
				displayName: 'Commit Message',
				name: 'commitMessage',
				type: 'string',
				default: '',
				description: 'Optional commit message for the prompt version',
				displayOptions: {
					show: {
						resource: ['prompt'],
						operation: ['create'],
					},
				},
				routing: {
					request: {
						body: {
							commitMessage: '={{$value || null}}',
						},
					},
				},
			},
		],
	};
}
