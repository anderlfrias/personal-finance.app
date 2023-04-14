import { Loading } from "components/shared";
import { Button, Drawer } from "components/ui";
import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { useSelector } from "react-redux";
import useUser from "utils/hooks/custom/useUser";
import UserForm from "./UserForm";
import openNotification from "utils/openNotification";
import useScreenSize from 'utils/hooks/custom/useScreenSize'
import ProfilePic from "components/helpers/ProfilePic";

const p = 'profile.userInfo'
const UserInfo = () => {
    const { t } = useTranslation()
    const { width: screenWidth } = useScreenSize()
	const { id: userId } = useSelector((state) => state.auth.user)
    const { getUserById, updateUser } = useUser();
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(false);
    const [isFormOpen, setIsFormOpen] = useState(false);

    const openForm = () => {
        setIsFormOpen(true);
    }

    const closeForm = () => {
        setIsFormOpen(false);
    }

    const onSubmit = async(values) => {
        console.log(values);

        const data = {
            name: values.name,
            firstSurname: values.firstSurname,
            secondSurname: values.secondSurname,
            profilePic: values.profilePic,
        }

        const resp = await updateUser(userId, data);

        if (resp.status === 'success') {
            openNotification({title: t(`message.success`), subtitle: t(`${p}.message.success`), type: 'success'});
            setUser(resp.data.user);
            closeForm();
        }

        if (resp.status === 'error') {
            openNotification({title: t(`message.error`), subtitle: t(`${p}.message.error`), type: 'danger'});
        }
    }

    const fetchData = useCallback(async (id) => {
        setLoading(true);
        const resp = await getUserById(id);
        console.log(resp);

        if (resp.status === 'success') {
            setUser(resp.data);
        }
        setLoading(false);
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
                {/* <p>
                    {t(`${p}.subTitle`)}
                </p> */}
            </div>

            {/* Imagen de perfil */}
            <div className="mb-2">
                <ProfilePic size={96} image={user?.profilePic} />
            </div>

            <Loading loading={loading} >
                <div className="mb-2">
                    <span>{t(`${p}.form.username.label`)}</span>
                    <p className="text-gray-700 dark:text-gray-200 font-semibold">
                        {user?.username}
                    </p>
                </div>

                <div className="mb-2">
                    <span>{t(`${p}.form.email.label`)}</span>
                    <p className="text-gray-700 dark:text-gray-200 font-semibold">
                        {user?.email}
                    </p>
                </div>

                <div className="mb-2">
                    <span>{t(`${p}.form.name.label`)}</span>
                    <p className="text-gray-700 dark:text-gray-200 font-semibold">
                        {user?.name}
                    </p>
                </div>

                <div className="mb-2">
                    <span>{t(`${p}.surnames`)}</span>
                    <p className="text-gray-700 dark:text-gray-200 font-semibold">
                        {user?.firstSurname} {user?.secondSurname}
                    </p>
                </div>

                <div className="mb-2 mt-4">
                    <Button variant='solid' icon={<HiOutlinePencilAlt />} onClick={openForm}>
                        {t(`${p}.edit`)}
                    </Button>
                </div>
            </Loading>

            <Drawer
                title={t(`${p}.form.title`)}
                isOpen={isFormOpen}
                onClose={closeForm}
                width={ screenWidth >= 768 ? 500 : screenWidth}
            >
                <UserForm initialValues={user} onSubmit={onSubmit} onCancel={closeForm} />
            </Drawer>
        </>
    )
}

export default UserInfo