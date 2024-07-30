const createUrl = (path: string) => window.location.origin + path;

const updateUserPromptUsage = async (promptContentLength: number) => {
  const url = createUrl('/api/user');

  const rest = await fetch(
    new Request(url, {
      method: 'PATCH',
      body: JSON.stringify({ promptContentLength }),
    }),
  );

  if (rest.ok) {
    const data = await rest.json();
    return data.data;
  }
};

const createNewEntry = async (content: string) => {
  const url = createUrl('/api/dashboard');

  const res = await fetch(
    new Request(url, {
      method: 'POST',
      body: JSON.stringify({ content }),
    }),
  );

  if (res.ok) {
    const data = await res.json();
    return data.data;
  }
};

const updateEntry = async (id: string, content: string) => {
  const url = createUrl(`/api/dashboard/${id}`);

  const rest = await fetch(
    new Request(url, {
      method: 'PATCH',
      body: JSON.stringify({ content }),
    }),
  );

  if (rest.ok) {
    const data = await rest.json();
    return data.data;
  }
};
export { createUrl, updateUserPromptUsage, createNewEntry, updateEntry };