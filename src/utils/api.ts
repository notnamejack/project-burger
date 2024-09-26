import { IFormLogin, IFormRegister, IFormReset, IFormForgot } from "../services/auth/actions";
import { apiConfig } from "./apiConfig";

const BASE_URL = apiConfig.baseUrl;

const checkReponse = (res: any) => {
	return res.ok ? res.json() : res.json().then((err: any) => Promise.reject(err));
  };

const checkSuccess = (res: any) => {
	return res && res.success ? res : Promise.reject(`Ответ не success: ${res}`);
};

const request = (url: string, options: any) => {
	return fetch(`${BASE_URL}${url}`, options)
		.then(checkReponse)
		.then(checkSuccess);
};

export const refreshToken = () => {
	return request('/auth/token',{
		method: "POST",
		headers: {
		"Content-Type": "application/json;charset=utf-8",
		},
		body: JSON.stringify({
		token: localStorage.getItem("refreshToken"),
		}),
		}).then((refreshData) => {
			localStorage.setItem("refreshToken", refreshData.refreshToken);
			localStorage.setItem("accessToken", refreshData.accessToken.split('Bearer ')[1]);
			return refreshData;
		});
};

const fetchWithRefresh = async (url: string, options: any) => {
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
		return Promise.reject(err.message);
	  }
	}
  };

const login = async (form: IFormLogin) => {
	return await request('/auth/login', {
		method: "POST",
		headers: {
		  "Content-Type": "application/json;charset=utf-8",
		},
		body: JSON.stringify(form),
	  }).then((data) => {
			localStorage.setItem("refreshToken", data.refreshToken);
			localStorage.setItem("accessToken", data.accessToken.split('Bearer ')[1]);
			localStorage.removeItem("resetPassword");
			return data.user
		});
}

const register = async (form: IFormRegister) => {
	return await request('/auth/register', {
		method: "POST",
		headers: {
		  "Content-Type": "application/json;charset=utf-8",
		},
		body: JSON.stringify(form),
	  })
	  .then((data) => {
		localStorage.setItem("refreshToken", data.refreshToken);
		localStorage.setItem("accessToken", data.accessToken.split('Bearer ')[1]);
		return data.user;
	  });
}

const forgot = async (form: IFormForgot) => {
	return await request('/password-reset', {
		method: "POST",
		headers: {
		  "Content-Type": "application/json;charset=utf-8",
		},
		body: JSON.stringify(form),
	  })
	  .then((data) => {
		localStorage.setItem("resetPassword", data.success);
		return data.message;
	  });
}

const reset = async (form: IFormReset) => {
	return await request('/password-reset/reset', {
		method: "POST",
		headers: {
		  "Content-Type": "application/json;charset=utf-8",
		},
		body: JSON.stringify(form),
	  })
	  .then((data) => {
		localStorage.removeItem("resetPassword");
		return data.message;
	  });
}

const logout = async () => {
	return await request('/auth/logout', {
		method: "POST",
		headers: {
		  "Content-Type": "application/json;charset=utf-8",
		},
		body: JSON.stringify({
		  token: localStorage.getItem("refreshToken"),
		}),
	  })
	  .then((data) => {
		localStorage.removeItem("refreshToken");
		localStorage.removeItem("accessToken");
		return data.message;
	  });
}

const getUser = async () => {
	const request = await fetchWithRefresh(`${BASE_URL}/auth/user`, {
		method: "GET",
		headers: {
		"Content-Type": "application/json;charset=utf-8",
		authorization: `Bearer ${localStorage.getItem('accessToken')}`
		}})
	try {
		return await request.user
    } catch (error) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        throw error;
    }
}

const patchUser = async (form: IFormRegister) => {
	const request = await fetchWithRefresh(`${BASE_URL}/auth/user`, {
		method: "PATCH",
		headers: {
		  "Content-Type": "application/json;charset=utf-8",
		  authorization: `Bearer ${localStorage.getItem('accessToken')}`
		},
		body:JSON.stringify(form)
	})
	return await request.user;

}

export const api = {
    login,
	register,
	forgot,
	reset,
    logout,
	getUser,
	patchUser
};