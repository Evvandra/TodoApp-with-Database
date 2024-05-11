
export const handleCredentials = (e, userCredentials, setUserCredentials, setError) => {
  setUserCredentials({ ...userCredentials, [e.target.name]: e.target.value });
  // console.log(userCredentials);
};


