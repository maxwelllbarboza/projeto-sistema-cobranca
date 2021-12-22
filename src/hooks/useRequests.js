import useGlobalContext from "./useGlobalContext";

function useRequests() {
  const { token, exibirErro } = useGlobalContext();
  const baseUrl = "https://api-desafiom05.herokuapp.com";

  async function get(route) {
    try {
      const response = await fetch(`${baseUrl}/${route}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }
      return data;
    } catch (error) {
      exibirErro(error.message);
      return false;
    }
  }
  
  async function getOne(route, id) {
    try {
      const response = await fetch(`${baseUrl}/${route}/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      return data;
    } catch (error) {
      exibirErro(error.message);
      return false;
    }
  }

  async function post(route, body, withToken) {
    const config = withToken
      ? {
          Authorization: `Bearer ${token}`,
        }
      : {};

    try {
      const response = await fetch(`${baseUrl}/${route}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...config,
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      return data;
    } catch (error) {
      exibirErro(error.message);
      return false;
    }
  }

  async function del(route, id) {
    try {
      const response = await fetch(`${baseUrl}/${route}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      return data;
    } catch (error) {
      exibirErro(error.message);
      return false;
    }
  }

  async function put(route, body, id) {
    try {
      const response = await fetch(`${baseUrl}/${route}/${id}`, {
        method: "PUT",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      return data;
    } catch (error) {
      exibirErro(error.message);
      return false;
    }
  }

  return {
    get,
    getOne,
    post,
    del,
    put,
  };
}

export default useRequests;
