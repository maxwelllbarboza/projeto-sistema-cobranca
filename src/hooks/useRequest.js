import useGlobalContext from "./useGlobalContext";

function useRequest() {
  const { token, exibirErro } = useGlobalContext();
  const baseUrl = "https://api-desafiom05.herokuapp.com";

  function options(method, auth, body) {
    this.method = method;
    this.headers = {
      "Content-Type": "application/json",
      Authorization: auth ? `Bearer ${token}` : "",
    };
    if (body) this.body = JSON.stringify(body);
  }

  async function api(method, { auth, body }, route, id) {
    try {
      const response = await fetch(
        `${baseUrl}/${route}${id ? "/" + id : ""}`,
        new options(method, auth, body)
      );
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      return data;
    } catch (error) {
      exibirErro(error.message);
      return false;
    }
  }

  return { api };
}

export default useRequest;
