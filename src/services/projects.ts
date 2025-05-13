interface getRequest extends Request {
  params: Request,
  projectName: string | string[] | undefined,
  id: String
}

async function GET (params: string) {
  const key = process.env["NEXT_PUBLIC_API"] + 'api/project/' + params
  const res = await fetch(key);
  const data = await res.json();
  
  return data;
}

export {
  GET
}