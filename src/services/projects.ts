interface getRequest extends Request {
  params: Request,
  projectName: string | string[] | undefined,
  id: String
}

type PageProps = {
  projectName: String
}


async function GET (params: PageProps) {
  const key = process.env["API"] + 'api/project/' + params
  const res = await fetch(key);
  const data = await res.json();
  console.log(data)
  return { props: { data } };
}

export {
  GET
}