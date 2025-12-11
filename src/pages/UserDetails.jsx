import React, { useState, useEffect } from "react";
import { useTokens } from "../store/tokenStore";

const UserDetails = () => {
    const [user, setUser] = useState({});
    const { accessToken, refreshToken, setAccessToken, clearTokens } = useTokens();

    const refreshAccessToken = async (callback) => {
        if (!refreshToken) {
            clearTokens();
            return;
        }

        try {
            const res = await fetch("https://ilkinibadov.com/api/v1/auth/refresh", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ refreshToken }),
            });

            const data = await res.json();
            console.log("Refresh response:", data);


            if (!res.ok) {
                console.error("Refresh token expired");
                clearTokens();
                return;
            }

            setAccessToken(data.accessToken);

            if (callback) callback();

        } catch (error) {
            console.error("Token refresh failed:", error);
            clearTokens();
        }
    };

    const getUserInfo = async () => {
        try {
            if (!accessToken) return;

            let response = await fetch(`https://ilkinibadov.com/api/v1/auth/me`, {
                headers: { Authorization: `Bearer ${accessToken}` },
            });

            if (response.status === 401) {
                await refreshAccessToken(getUserInfo);
                return;
            }

            if (response.ok) {
                const data = await response.json();
                console.log("Fetched user data:", data);
                setUser(data);
            } else {
                console.error("Failed to fetch user:", response.status);
            }
        } catch (error) {
            console.error("Error fetching user info:", error);
        }
    };

    useEffect(() => {
        getUserInfo();
    }, [accessToken]);

    return (
        <div className="w-full h-screen flex flex-col justify-center items-center gap-4">
            <h1 className="text-4xl font-bold">User Details Page</h1>
            {user?.email ? <p>User: {user.email}</p> : <p>Loading user data...</p>}
        </div>
    );
};

export default UserDetails;
