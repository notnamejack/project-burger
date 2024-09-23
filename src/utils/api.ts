import { FormLogin, FormRegister } from "../services/auth/actions";
import { apiConfig } from "./apiConfig";

const checkReponse = (res: any) => {
	return res.ok ? res.json() : res.json().then((err: any) => Promise.reject(err));
  };

const refreshToken = () => {
return fetch(`${apiConfig.baseUrl}/auth/token`, {
	method: "POST",
	headers: {
	"Content-Type": "application/json;charset=utf-8",
	},
	body: JSON.stringify({
	token: localStorage.getItem("refreshToken"),
	}),
})
.then(checkReponse)
.then((refreshData) => {
	if (!refreshData.success) {
		return Promise.reject(refreshData);
	}
	localStorage.setItem("refreshToken", refreshData.refreshToken);
	localStorage.setItem("accessToken", refreshData.accessToken);
	return refreshData;
});
};

const fetchWithRefresh = async ({url, options}: {url: string, options: any}) => {
	try {
	  const res = await fetch(url, options);
	  return await checkReponse(res);
	} catch (err: any) {
	  if (err.message === "jwt expired") {
		const refreshData = await refreshToken(); //обновляем токен
		options.headers.authorization = refreshData.accessToken;
		const res = await fetch(url, options); //повторяем запрос
		return await checkReponse(res);
	  } else {
		return Promise.reject(err);
	  }
	}
  };

const login = async (form: FormLogin) => {
	return await fetch(`${apiConfig.baseUrl}/auth/login`, {
		method: "POST",
		headers: {
		  "Content-Type": "application/json;charset=utf-8",
		},
		body: JSON.stringify(form),
	  })
	  .then(checkReponse)
	  .then((data) => {
		if (!data.success) {
			return Promise.reject(data);
		  }
		localStorage.setItem("refreshToken", data.refreshToken);
		localStorage.setItem("accessToken", data.accessToken);
		return data.user;
	  });
}

const register = async (form: FormRegister) => {
	return await fetch(`${apiConfig.baseUrl}/auth/register`, {
		method: "POST",
		headers: {
		  "Content-Type": "application/json;charset=utf-8",
		},
		body: JSON.stringify(form),
	  })
	  .then(checkReponse)
	  .then((data) => {
		if (!data.success) {
			return Promise.reject(data);
		  }
		localStorage.setItem("refreshToken", data.refreshToken);
		localStorage.setItem("accessToken", data.accessToken);
		return data.user;
	  });
}

const logout = async () => {
	return await fetch(`${apiConfig.baseUrl}/auth/logout`, {
		method: "POST",
		headers: {
		  "Content-Type": "application/json;charset=utf-8",
		},
		body: JSON.stringify({
		  token: localStorage.getItem("refreshToken"),
		}),
	  })
	  .then(checkReponse)
	  .then((data) => {
		if (!data.success) {
			return Promise.reject(data);
		  }
		localStorage.removeItem("refreshToken");
		localStorage.removeItem("accessToken");
		return data.message;
	  });
}

const getUser = async () => {
	fetchWithRefresh(`${apiConfig.baseUrl}/user`,
	{
		method: "GET",
		headers: {
		  "Content-Type": "application/json;charset=utf-8",
		  authorization = refreshData.accessToken
		}
	}).then(data => {
		if (!data.success) {
			return Promise.reject(data);
		  }
		return data.user
	});
}

const patchUser = async () => {

}

export const api = {
    login,
	register,
    logout,
	getUser,
	patchUser
};