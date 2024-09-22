import {useEffect, useState} from "react";
import Container from "react-bootstrap/Container";

import {useAuth} from "../../App/auth/authProvider.tsx";
import axios from "axios";
import './Account.scss'


interface User {
    id?: number;
    password?: string;
    username?: string,
    email?: string,
    role?: string,
    surname?: string,
    name?: string,
}

function Account() {
    const auth = useAuth();

    const [activeTab, setActiveTab] = useState('info');
    const [user, setUser] = useState<User | null>(null);

    // Обновление состояния вкладок при изменении хэша
    useEffect(() => {
        window.onhashchange = () => {
            setActiveTab(window.location.hash.substring(1));
        };
    }, []);

    /*  Получение данных пользователя  при входе на страницу*/
    useEffect(() => {
        if(auth?.accessToken){
            getProfile(auth.accessToken).then((data) => {
                setUser(data);
            });
        }
    }, []);

    /**
     * Получение профиля пользователя
     * @param {string} token - Токен доступа пользователя
     */
    async function getProfile(token: string): Promise<User> {
        try {
            const userRequest = await axios.get(`${import.meta.env.VITE_API_URL}/user/myProfile/`, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
            });
            return userRequest.data;
        }
        catch (error) {

            if (axios.isAxiosError(error) && error.response) {
                const status = error.response.status;

                if(status == 401
                    && auth?.refreshToken && auth?.refreshAccessToken) {
                    const accessToken = await auth?.refreshAccessToken(auth?.refreshToken);
                    if(accessToken) {
                        try {
                            const userRequest = await axios.get(`${import.meta.env.VITE_API_URL}/user/myProfile/`, {
                                headers: {
                                    "Authorization": `Bearer ${accessToken}`,
                                },
                            });
                            return userRequest.data;
                        } catch {
                            console.error("An unexpected error occurred");
                            return {id: 0, password: "", username: "Undefined", email: "", role: "", surname: "", name: ""};
                        }
                    }
                    else {
                        logOut();
                        return {id: 0, password: "", username: "Undefined", email: "", role: "", surname: "", name: ""};
                    }
                }
                else {
                    console.error("An unexpected error occurred");
                    return {id: 0, password: "", username: "Undefined", email: "", role: "", surname: "", name: ""};
                }
            }
            else {
                console.error("An unexpected error occurred");
                return {id: 0, password: "", username: "Undefined", email: "", role: "", surname: "", name: ""};
            }
        }
    }

    /**
     *  Выход из аккаунта */
    function logOut():void{
        if (auth && auth.logOut) {
            auth.logOut();
        }
    }

    /**
     *  хэш URL при изменении вкладки
    * @param {string} tab - Название вкладки
     */
    function handleTabChange(tab: string) {
        setActiveTab(tab);
        window.location.hash = tab;
    };
    /**
     * Обработка изменения ввода данных
     * @param {keyof User} property - Свойство пользователя
     * @param {string | number} value - Значение свойства
     */
    function handleInputChange(property: keyof User, value: string | number) {
        setUser((prevUser) => {
            if (prevUser) {
                return { ...prevUser, [property]: value };
            }
            return prevUser;
        });
        console.log(user);
    }

    return (
        <Container className={"myProfile-container"}>
            <div className={"myProfile"}>
                <div className={"myProfile-left"}>
                    <button
                        className={[activeTab === 'info' ? 'active' : '', "myProfile-left__button"].join(' ')}
                        onClick={() => handleTabChange('info')}>
                        <div className={'myProfile-account myProfile-icon'}>Account</div>
                    </button>
                    <button
                        className={[activeTab === 'data' ? 'active' : '', "myProfile-left__button"].join(' ')}
                        onClick={() => handleTabChange('data')}>
                        <div className={'myProfile-data myProfile-icon'}>Data</div>
                    </button>
                </div>
                <div className={"myProfile-right"}>
                    {activeTab === 'info' && <>
                        <div className={"myProfile-right__info"}>
                            <div className={"myProfile-right__info-title"}>
                                Personal information
                            </div>
                            <table className={"myProfile-right__info-inputs"}>
                                <tbody>
                                <tr className={"myProfile-right__info-input"}>
                                    <td className="myProfile-right__info-column1">Username</td>
                                    <td className="myProfile-right__info-column2">
                                        <input className={"myProfile-right__information"} type="text" name="username" value={user?.username || ""} readOnly={true} onChange={(e) => handleInputChange('username', e.target.value)}></input>
                                    </td>
                                </tr>
                                <tr className={"myProfile-right__info-input"}>
                                    <td className="myProfile-right__info-column1">Email</td>
                                    <td className="myProfile-right__info-column2">
                                        <input className={"myProfile-right__information"} type="text" name="email" value={user?.email || ""} readOnly={true} onChange={(e) => handleInputChange('email', e.target.value)}></input>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        <button className={"myProfile-right__logout"} onClick={logOut}>LogOut</button>
                    </>}
                    {activeTab === 'data' && <>
                        <div className={"myProfile-right__info"}>
                            <div className={"myProfile-right__info-title"}>
                                Personal data
                            </div>
                            <table className={"myProfile-right__info-inputs"}>
                                <tbody>
                                <tr className={"myProfile-right__info-input"}>
                                    <td className="myProfile-right__info-column1">Role</td>
                                    <td className="myProfile-right__info-column2">
                                        <input className={"myProfile-right__information"} type="text" name={"role"}
                                               value={user?.role || ""} readOnly={true}
                                               onChange={(e) => handleInputChange('role', e.target.value)}></input>
                                    </td>
                                </tr>
                                <tr className={"myProfile-right__info-input"}>
                                    <td className="myProfile-right__info-column1">Surname</td>
                                    <td className="myProfile-right__info-column2">
                                        <input className={"myProfile-right__information"} type="text" name={"username"}
                                               value={user?.surname || ""} readOnly={true}
                                               onChange={(e) => handleInputChange('surname', e.target.value)}></input>
                                    </td>
                                </tr>
                                <tr className={"myProfile-right__info-input"}>
                                    <td className="myProfile-right__info-column1">Name</td>
                                    <td className="myProfile-right__info-column2">
                                        <input className={"myProfile-right__information"} type="text" name={"name"}
                                               value={user?.name || ""} readOnly={true}
                                               onChange={(e) => handleInputChange('name', e.target.value)}></input>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </>}

                </div>
            </div>
        </Container>
    );
}

export default Account;