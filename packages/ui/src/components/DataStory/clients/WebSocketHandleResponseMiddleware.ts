// Store the resolve and reject functions of the Promise for pending responses.
const pendingResponses: Map<string, {resolve: Function; reject: Function}> = new Map();

export const processWaitingResponse = (message: any) => {
  const response: any = message;

  // check if there is a response pending for this id
  const pending = pendingResponses.get(response.id);
  if (pending) {
    pending.resolve(response);
    pendingResponses.delete(response.id);
  }
}

// send a message and wait for the response
export async function waitForResponse(params: any): Promise<any> {
  const { id } = params;

  return new Promise((resolve, reject) => {
    pendingResponses.set(id, { resolve, reject });

    // config 10s timeout for the rejection
    setTimeout(() => {
      if (pendingResponses.has(id)) {
        pendingResponses.delete(id);
        reject(new Error('Request timed out'));
      }
    }, 10000);
  });
}
