import type { APIGatewayProxyResultV2 } from 'aws-lambda';

export function httpResponse(
  statusCode: number,
  body?: Record<string, any>,
): APIGatewayProxyResultV2 {
  return {
    statusCode,
    body: body && JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  };
}
