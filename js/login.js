const handleLogin = async () => {
    const userIdInput = document.getElementById('user-id');
    const userIdPassword = document.getElementById('user-password');
    const errorElemnt = document.getElementById('user-login-error')
    const userid = userIdInput.value;
    const userPassword = userIdPassword.value;

    const user = { userid, userPassword };

    const userInfo = await fetchUserInfo(user);
    console.log(userInfo)
    if (userInfo.length === 0) {
        errorElemnt.classList.remove('hidden');
    } else {
        errorElemnt.classList.add('hidden')
        localStorage.setItem("loggedInUser", JSON.stringify(userInfo[0]))
        window.location.href = '../post.html'
    }

}

const fetchUserInfo = async (user) => {
    try {
        const res = await fetch("http://localhost:5000/getUserInfo", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        });

        data = await res.json();
    } catch (err) {
        console.log("Error:", err);
    }
    return data;

};
