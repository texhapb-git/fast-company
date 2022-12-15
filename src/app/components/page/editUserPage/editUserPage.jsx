import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import { useUser } from "../../../hooks/useUsers";
import { useQualities } from "../../../hooks/useQualities";
import { useProfessions } from "../../../hooks/useProfession";

import { validator } from "../../../utils/validator";

import TextField from "../../common/form/textField";
import SelectField from "../../common/form/selectField";
import RadioField from "../../common/form/radioField";
import MultiSelectField from "../../common/form/multiSelectField";
import BackHistoryButton from "../../common/backButton";

const EditUserPage = () => {
    const { userId } = useParams();
    const { currentUser, updateUser, setUser } = useAuth();
    const { getUserById, setUsers } = useUser();
    const history = useHistory();

    // console.log(currentUser);

    if (userId !== currentUser._id) {
        history.push(`/users/${currentUser._id}/edit`);
    }

    const validatorConfig = {
        email: {
            isRequired: {
                message: "Электронная почта обязательна для заполнения"
            },
            isEmail: {
                message: "Email введен некорректно"
            }
        },
        name: {
            isRequired: {
                message: "Введите ваше имя"
            }
        }
    };

    const [data, setData] = useState({});

    const [isLoading, setIsLoading] = useState(true);
    const [errors, setErrors] = useState({});

    const { qualities, isLoading: qualitiesLoading } = useQualities();
    const { professions, isLoading: professionsLoading } = useProfessions();

    const qualitiesList = qualities.map((q) => ({
        label: q.name,
        value: q._id
    }));

    const professionsList = professions.map((p) => ({
        label: p.name,
        value: p._id
    }));

    useEffect(() => {
        // проверяем, что загрузились качества и профессии
        if (!qualitiesLoading && !professionsLoading) {
            const userData = getUserById(currentUser._id);

            // данные для обновления
            // будем менять только то, что есть в форме
            // остальное не трогаем
            const formData = {
                name: userData.name,
                email: userData.email,
                profession: userData.profession,
                sex: userData.sex,
                qualities: qualitiesList.filter(qual => currentUser.qualities.includes(qual.value)) // выбираем качества пользователя (в нужном виде)
            };
            // console.log(formData);
            setData(formData);
        }
    }, [qualitiesLoading, professionsLoading]);

    useEffect(() => {
        // снимаем прелоадер, если данные для формы готовы
        if (Object.entries(data).length !== 0) {
            setIsLoading(false);
        }

        validate();
    }, [data]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;

        // формируем итоговый объект для обновления в нужном виде
        const newData = {
            ...data,
            _id: currentUser._id,
            qualities: data.qualities.map((q) => q.value)
        };

        try {
            await updateUser(newData);

            // устанавливаем новый state в userContext
            // я не придумал другого способа обновить данные без перезагрузки
            // выглядит, конечно, стремно
            setUsers(prevState => prevState.map(user => {
                if (user._id === newData._id) {
                    return { ...user, ...newData };
                }

                return user;
            }));

            // обновляем state в useContext
            setUser(prevState => {
                return { ...prevState, ...newData };
            });

            history.push(`/users/${currentUser._id}`);
        } catch (error) {
            setErrors(error);
        }
    };

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const isValid = Object.keys(errors).length === 0;

    return (
        <div className="container mt-5">
            <BackHistoryButton />
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-4">
                    {!isLoading && Object.keys(professions).length > 0 ? (
                        <form onSubmit={handleSubmit}>
                            <TextField
                                label="Имя"
                                name="name"
                                value={data.name}
                                onChange={handleChange}
                                error={errors.name}
                            />
                            <TextField
                                label="Электронная почта"
                                name="email"
                                value={data.email}
                                onChange={handleChange}
                                error={errors.email}
                            />
                            <SelectField
                                label="Выбери свою профессию"
                                defaultOption="Choose..."
                                options={professionsList}
                                name="profession"
                                onChange={handleChange}
                                value={data.profession}
                                error={errors.profession}
                            />
                            <RadioField
                                options={[
                                    { name: "Male", value: "male" },
                                    { name: "Female", value: "female" },
                                    { name: "Other", value: "other" }
                                ]}
                                value={data.sex}
                                name="sex"
                                onChange={handleChange}
                                label="Выберите ваш пол"
                            />
                            <MultiSelectField
                                defaultValue={data.qualities}
                                options={qualitiesList}
                                onChange={handleChange}
                                name="qualities"
                                label="Выберите ваши качества"
                            />
                            <button
                                type="submit"
                                disabled={!isValid}
                                className="btn btn-primary w-100 mx-auto"
                            >
                                Обновить
                            </button>
                        </form>
                    ) : (
                        "Loading..."
                    )}
                </div>
            </div>
        </div>
    );
};

export default EditUserPage;
