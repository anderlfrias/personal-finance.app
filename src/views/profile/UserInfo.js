import { Button } from "components/ui";
import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import useAuth from "utils/hooks/useAuth";

const p = 'profile.userInfo'
const UserInfo = () => {
    const { t } = useTranslation()
	const { id: userId} = useSelector((state) => state.auth.user)
    const { getUserById } = useAuth();
    const [user, setUser] = useState({});

    const fetchData = useCallback(async (id) => {
        const resp = await getUserById(id);
        console.log(resp);

        if (resp.status === 'success') {
            setUser(resp.data);
        }
    }, [getUserById]);

    useEffect(() => {
        return async() => {
            console.log(userId)
            await fetchData(userId);
        }
    }, [userId, fetchData]);
    return (
        <>
            <div className="mb-2">
                <h4>
                    {t(`${p}.title`)}
                </h4>
                <p>
                    {t(`${p}.subTitle`)}
                </p>
            </div>

            <div>
                <div className="mb-2">
                    <span>{t(`${p}.username`)}</span>
                    <p className="text-gray-700 dark:text-gray-200 font-semibold">
                        {user?.username}
                    </p>
                </div>

                <div className="mb-2">
                    <span>{t(`${p}.email`)}</span>
                    <p className="text-gray-700 dark:text-gray-200 font-semibold">
                        {user?.email}
                    </p>
                </div>

                <div className="mb-2">
                    <span>{t(`${p}.name`)}</span>
                    <p className="text-gray-700 dark:text-gray-200 font-semibold">
                        {user?.name}
                    </p>
                </div>

                <div className="mb-2">
                    <span>{t(`${p}.lastname`)}</span>
                    <p className="text-gray-700 dark:text-gray-200 font-semibold">
                        {user?.firstSurname} {user?.secondSurname}
                    </p>
                </div>

                <div className="mb-2">
                    <Button variant='solid' >
                        {t(`${p}.edit`)}
                    </Button>
                </div>
            </div>
        </>
    )
}

export default UserInfo